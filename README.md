# SENTINEL AI — Explainable Hybrid WAF

SENTINEL AI is an educational web application firewall (WAF) project for inspecting web request payloads. It combines a machine-learning model with a deterministic validation layer and provides a web interface for viewing inspection results, saved cases, and security statistics.

The project includes a React/TypeScript frontend and a Flask API that loads a trained model and tokenizer from local files.

> **Status:** Academic/demo project. Detection results are not guaranteed. Do not rely on this project as the sole security control for a production application.

## Features

- Inspect HTTP requests or payloads through a browser interface.
- Classify payloads as **Benign**, **SQL Injection**, **XSS**, or **SSRF**.
- Display the model prediction separately from the final validation-layer verdict.
- View confidence, severity, normalized payload, and analysis details.
- Explain selected model results with SHAP feature contributions when the required dependencies are available.
- View a dashboard, saved inspection cases, threat records, model insights, and reports.
- Store inspection history locally in SQLite.

## Architecture

```text
Browser
  |
  | React / TypeScript frontend
  | VITE_API_BASE_URL
  v
Flask API (default: http://127.0.0.1:8000)
  |
  +-- Loads the saved Keras model and tokenizer
  +-- Analyzes payloads
  +-- Applies the validation layer
  +-- Stores inspection history in SQLite
```

The API loads the model and tokenizer from the backend directory. Inspection history is stored in `inspection_history.sqlite3` by default.

## Technology stack

### Frontend

- React and TypeScript
- TanStack Start and TanStack Router
- Vite
- Tailwind CSS
- Recharts
- PDF generation utilities

### Backend

- Python
- Flask
- TensorFlow/Keras
- NumPy, pandas, and scikit-learn
- SHAP
- SQLite

## Project structure

```text
.
├── Backend_mlmodel/
│   ├── api_server.py
│   ├── API.md
│   ├── README.md
│   ├── requirements.txt
│   ├── structural_hybrid_waf_model.keras
│   ├── tokenizer_structural_v3.pkl
│   └── ...model and pipeline assets
└── frontend_MPP/
    ├── src/
    │   ├── routes/
    │   ├── services/securityApi.ts
    │   └── types/security.ts
    ├── public/
    ├── package.json
    └── .env.example
```

## Prerequisites

- Python 3.10 or 3.11 recommended; use a version compatible with the TensorFlow release installed.
- Node.js and npm.
- Git, if cloning the project.

## Run locally on Windows

Start the backend first.

### 1. Start the backend API

Open PowerShell in the project root:

```powershell
Set-Location .\Backend_mlmodel

python -m venv .venv
.\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
python -m pip install -r requirements.txt

python api_server.py
```

The API is available at:

```text
http://127.0.0.1:8000
```

Keep this terminal running.

### 2. Configure and start the frontend

Open a second PowerShell terminal in the project root:

```powershell
Set-Location .\frontend_MPP

Copy-Item .env.example .env.local
npm ci
npm run dev
```

Open the local URL printed by Vite in the terminal. The frontend reads the API address from `VITE_API_BASE_URL`; the example configuration points to `http://127.0.0.1:8000`.

## API endpoints

The backend exposes the following routes:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Check API health |
| `POST` | `/api/v1/analyze` | Analyze a payload |
| `GET` | `/api/v1/dashboard` | Get dashboard statistics |
| `GET` | `/api/v1/cases` | List saved inspection cases |
| `GET` | `/api/v1/cases/{inspectionId}` | Get one saved inspection |
| `GET` | `/api/v1/threats` | List threat inspections |

Example analysis request:

```json
{
  "payload": "GET /products?category=laptops HTTP/1.1"
}
```

Example request using PowerShell:

```powershell
Invoke-RestMethod `
  -Uri "http://127.0.0.1:8000/api/v1/analyze" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"payload":"GET /products?category=laptops HTTP/1.1"}'
```

Payloads are limited to 10 KB. See [`Backend_mlmodel/API.md`](Backend_mlmodel/API.md) for additional API behavior and configuration details.

## Configuration

### Frontend API URL

The frontend uses `VITE_API_BASE_URL`. Set it in `frontend_MPP/.env.local`:

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Backend database location

By default, the backend creates or uses `inspection_history.sqlite3` in `Backend_mlmodel`. To use another database path, set `WAF_DATABASE_PATH` before starting the API.

Example in PowerShell:

```powershell
$env:WAF_DATABASE_PATH = "C:\path\to\inspection_history.sqlite3"
python api_server.py
```

### CORS origins

For local development, the API allows the project's local frontend origins. When running the frontend on a different address, configure `WAF_ALLOWED_ORIGINS` with a comma-separated list of trusted origins.

Example:

```powershell
$env:WAF_ALLOWED_ORIGINS = "http://localhost:5173,http://localhost:8080"
python api_server.py
```

Only allow origins you trust.

## Development commands

From `frontend_MPP`:

```powershell
npm run dev
npm run build
npm run lint
```

## Data and privacy

The API records submitted payloads and analysis results in its SQLite database so they can appear in the history and dashboard screens. Treat this database, logs, and any payloads submitted to the application as potentially sensitive.

Before sharing or deploying the project:

- Do not commit real user requests, credentials, tokens, or private data.
- Review `inspection_history.sqlite3` and `waf_triage_audit.log`.
- Keep local environment files and virtual environments out of version control.
- Review model and tokenizer files before publishing; they may be large.
- Configure CORS for trusted origins only.

## Limitations

- This is a project/demo implementation, not a production-hardened WAF.
- Model predictions and rule-based validation can produce false positives or false negatives.
- SHAP explanations depend on the configured Python dependencies and should be treated as diagnostic information, not proof of why a prediction was made.
- The API documentation notes that STIX bundle generation is not part of the current API response.
- Do not send real sensitive payloads to a publicly accessible instance.

## License

No license file was present when this README was prepared. Add a license and update this section before distributing the project.
