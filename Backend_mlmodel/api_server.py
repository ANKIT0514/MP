import importlib.util
import importlib.machinery
import json
import os
import sqlite3
import threading
import time
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path

from flask import Flask, jsonify, request


BACKEND_DIR = Path(__file__).resolve().parent
DATABASE_PATH = Path(os.environ.get("WAF_DATABASE_PATH", BACKEND_DIR / "inspection_history.sqlite3"))
MAX_PAYLOAD_BYTES = 10 * 1024
CLASSIFICATIONS = ("Benign", "SQLi", "XSS", "SSRF")
DISPLAY_NAMES = {"Benign": "Benign", "SQLi": "SQL Injection", "XSS": "XSS", "SSRF": "SSRF"}
SEVERITIES = {"Benign": "Informational", "SQLi": "High", "XSS": "High", "SSRF": "Critical"}


def load_pipeline():
    pipeline_path = BACKEND_DIR / "New Pipeline"
    loader = importlib.machinery.SourceFileLoader("waf_pipeline", str(pipeline_path))
    spec = importlib.util.spec_from_loader("waf_pipeline", loader)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load model pipeline from {pipeline_path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


pipeline = load_pipeline()
gateway = pipeline.ProductionWAFGateway(
    use_finetuned=True,
    enable_shap=True,
    enable_stix=False,
    verbose=False,
)
inference_lock = threading.Lock()
app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = MAX_PAYLOAD_BYTES * 6 + 1024


def connect_database():
    connection = sqlite3.connect(DATABASE_PATH, timeout=10)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with connect_database() as connection:
        connection.execute(
            """CREATE TABLE IF NOT EXISTS inspections (
                inspection_id TEXT PRIMARY KEY,
                timestamp TEXT NOT NULL,
                classification TEXT NOT NULL,
                original_payload TEXT NOT NULL,
                analysis_json TEXT NOT NULL
            )"""
        )
        connection.execute(
            "CREATE INDEX IF NOT EXISTS inspections_timestamp_idx ON inspections(timestamp)"
        )


def map_analysis(inference, elapsed_ms):
    ml_label = inference["ml_prediction"]
    verdict_label = inference["final_verdict"]
    probabilities = {
        DISPLAY_NAMES[label]: round(inference["probabilities"][label], 6)
        for label in CLASSIFICATIONS
    }
    confidence = round(inference["ml_confidence"], 6)
    class_name = DISPLAY_NAMES[verdict_label]
    status = "Overridden" if inference["overridden"] else (
        "Passed" if verdict_label == "Benign" else "Confirmed"
    )

    intel_context = gateway.orchestrator._get_detailed_mitre_context(
        inference["normalized_payload"], verdict_label
    )
    threat_intelligence = None
    if intel_context:
        threat_intelligence = {
            "mitreTechnique": {
                "id": intel_context["technique_id"],
                "name": intel_context["name"],
            },
            "capecPattern": {
                "id": intel_context["sub_id"],
                "name": intel_context["name"],
            },
            "rationale": intel_context["desc"],
            "detectedBehavior": intel_context["name"],
            "indicators": [],
        }
    else:
        threat_intelligence = {
            "mitreTechnique": {"id": "—", "name": "No adversarial technique"},
            "capecPattern": {"id": "—", "name": "No attack pattern"},
            "rationale": "No threat technique was mapped for this benign verdict.",
            "detectedBehavior": "Benign request",
            "indicators": [],
        }

    shap_features = [
        {
            "name": name,
            "contribution": contribution,
            "direction": (
                "risk"
                if (contribution >= 0) != (ml_label == "Benign")
                else "benign"
            ),
        }
        for name, contribution in inference["shap_explanations"].items()
    ]

    return {
        "inspectionId": f"INS-{uuid.uuid4().hex[:12].upper()}",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "originalPayload": inference["original_payload"],
        "normalizedPayload": inference["normalized_payload"],
        "classification": class_name,
        "confidence": confidence,
        "severity": SEVERITIES[verdict_label],
        "analysisTimeMs": round(elapsed_ms, 2),
        "source": "Manual Inspector",
        "model": {
            "classification": DISPLAY_NAMES[ml_label],
            "confidence": confidence,
            "probabilities": probabilities,
        },
        "circuitBreaker": {
            "mlPrediction": DISPLAY_NAMES[ml_label],
            "ruleBasedValidation": inference["validation_reason"],
            "status": status,
            "finalVerdict": class_name,
            "reason": inference["validation_reason"],
        },
        "shapExplainedClass": DISPLAY_NAMES[ml_label],
        "shapFeatures": shap_features,
        "threatIntelligence": threat_intelligence,
        "demo": False,
    }


def to_case(row):
    analysis = json.loads(row["analysis_json"])
    analysis["caseNumber"] = row["case_number"]
    analysis["result"] = "Allowed" if analysis["classification"] == "Benign" else "Blocked"
    return analysis


@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    allowed_origins = {
        value.strip()
        for value in os.environ.get(
            "WAF_ALLOWED_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173,http://localhost:8080,http://127.0.0.1:8080,http://localhost:4173,http://127.0.0.1:4173",
        ).split(",")
        if value.strip()
    }
    if origin in allowed_origins:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


@app.errorhandler(413)
def payload_too_large(_error):
    return jsonify({"error": "Payload exceeds the 10 KB limit."}), 413


@app.get("/api/v1/health")
def health():
    return jsonify(
        {
            "status": "ok",
            "modelLoaded": hasattr(gateway, "model"),
            "classes": [DISPLAY_NAMES[label] for label in CLASSIFICATIONS],
            "maxPayloadBytes": MAX_PAYLOAD_BYTES,
            "shapEnabled": gateway.enable_shap and pipeline.shap is not None,
        }
    )


@app.post("/api/v1/analyze")
def analyze():
    body = request.get_json(silent=True)
    if not isinstance(body, dict) or not isinstance(body.get("payload"), str):
        return jsonify({"error": "Request body must be JSON with a string 'payload' field."}), 400
    payload = body["payload"]
    if not payload.strip():
        return jsonify({"error": "Payload must not be empty."}), 400
    if len(payload.encode("utf-8")) > MAX_PAYLOAD_BYTES:
        return jsonify({"error": "Payload exceeds the 10 KB limit."}), 413

    started = time.perf_counter()
    try:
        with inference_lock:
            inference = gateway.inspect_traffic(payload)
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except RuntimeError as error:
        return jsonify({"error": str(error)}), 503
    elapsed_ms = (time.perf_counter() - started) * 1000
    analysis = map_analysis(inference, elapsed_ms)

    with connect_database() as connection:
        connection.execute(
            """INSERT INTO inspections
                (inspection_id, timestamp, classification, original_payload, analysis_json)
                VALUES (?, ?, ?, ?, ?)""",
            (
                analysis["inspectionId"],
                analysis["timestamp"],
                analysis["classification"],
                payload,
                json.dumps(analysis),
            ),
        )
    return jsonify(analysis), 201


@app.get("/api/v1/cases")
def cases():
    limit = min(max(request.args.get("limit", default=500, type=int), 1), 1000)
    offset = max(request.args.get("offset", default=0, type=int), 0)
    classification = request.args.get("classification")
    query = request.args.get("q", "").strip()
    filters = []
    parameters = []
    if classification:
        if classification not in ("Benign", "SQL Injection", "XSS", "SSRF"):
            return jsonify({"error": "Unknown classification."}), 400
        filters.append("classification = ?")
        parameters.append(classification)
    if query:
        filters.append("(original_payload LIKE ? OR inspection_id LIKE ?)")
        parameters.extend((f"%{query}%", f"%{query}%"))
    where = f"WHERE {' AND '.join(filters)}" if filters else ""

    with connect_database() as connection:
        total = connection.execute(
            f"SELECT COUNT(*) FROM inspections {where}", parameters
        ).fetchone()[0]
        rows = connection.execute(
            f"""SELECT rowid AS case_number, analysis_json FROM inspections {where}
                ORDER BY timestamp DESC LIMIT ? OFFSET ?""",
            [*parameters, limit, offset],
        ).fetchall()
    return jsonify({"items": [to_case(row) for row in rows], "total": total})


@app.get("/api/v1/cases/<inspection_id>")
def case_detail(inspection_id):
    with connect_database() as connection:
        row = connection.execute(
            "SELECT rowid AS case_number, analysis_json FROM inspections WHERE inspection_id = ?",
            (inspection_id,),
        ).fetchone()
    if row is None:
        return jsonify({"error": "Inspection not found."}), 404
    analysis = to_case(row)
    if (
        len(analysis["shapFeatures"]) < pipeline.SHAP_TOP_FEATURE_COUNT
        and gateway.enable_shap
    ):
        started = time.perf_counter()
        try:
            with inference_lock:
                inference = gateway.inspect_traffic(analysis["originalPayload"])
        except ValueError as error:
            return jsonify({"error": str(error)}), 400
        except RuntimeError as error:
            return jsonify({"error": str(error)}), 503
        refreshed = map_analysis(inference, (time.perf_counter() - started) * 1000)
        analysis["shapExplainedClass"] = refreshed["shapExplainedClass"]
        analysis["shapFeatures"] = refreshed["shapFeatures"]
        stored_analysis = {
            key: value
            for key, value in analysis.items()
            if key not in ("caseNumber", "result")
        }
        with connect_database() as connection:
            connection.execute(
                "UPDATE inspections SET analysis_json = ? WHERE inspection_id = ?",
                (json.dumps(stored_analysis), inspection_id),
            )
    return jsonify(analysis)


@app.get("/api/v1/threats")
def threats():
    with connect_database() as connection:
        rows = connection.execute(
            """SELECT rowid AS case_number, analysis_json FROM inspections
                WHERE classification != 'Benign' ORDER BY timestamp DESC LIMIT 500"""
        ).fetchall()
    return jsonify([to_case(row) for row in rows])


@app.get("/api/v1/dashboard")
def dashboard():
    today = datetime.now(timezone.utc).date()
    week_start = today - timedelta(days=6)
    with connect_database() as connection:
        rows = connection.execute(
            """SELECT classification, COUNT(*) AS count FROM inspections
                GROUP BY classification"""
        ).fetchall()
        daily_rows = connection.execute(
            """SELECT date(timestamp) AS day, COUNT(*) AS requests,
                    SUM(CASE WHEN classification != 'Benign' THEN 1 ELSE 0 END) AS threats
                FROM inspections WHERE date(timestamp) >= ? GROUP BY date(timestamp)""",
            (week_start.isoformat(),),
        ).fetchall()
        recent_rows = connection.execute(
            """SELECT rowid AS case_number, analysis_json FROM inspections
                ORDER BY timestamp DESC LIMIT 5"""
        ).fetchall()

    counts = {name: 0 for name in ("Benign", "SQL Injection", "XSS", "SSRF")}
    for row in rows:
        counts[row["classification"]] = row["count"]
    daily = {row["day"]: row for row in daily_rows}
    weekly = []
    for offset in range(7):
        day = week_start + timedelta(days=offset)
        row = daily.get(day.isoformat())
        weekly.append(
            {
                "day": day.strftime("%a"),
                "requests": row["requests"] if row else 0,
                "threats": row["threats"] if row else 0,
            }
        )
    return jsonify(
        {
            "totals": {
                "requests": sum(counts.values()),
                "threats": sum(value for key, value in counts.items() if key != "Benign"),
                "benign": counts["Benign"],
                "sqli": counts["SQL Injection"],
                "xss": counts["XSS"],
                "ssrf": counts["SSRF"],
            },
            "shapEnabled": gateway.enable_shap and pipeline.shap is not None,
            "distribution": [
                {"name": name, "value": count} for name, count in counts.items()
            ],
            "recentCases": [to_case(row) for row in recent_rows],
            "weekly": weekly,
        }
    )


initialize_database()


if __name__ == "__main__":
    app.run(
        host=os.environ.get("WAF_HOST", "127.0.0.1"),
        port=int(os.environ.get("WAF_PORT", "8000")),
        threaded=True,
    )
