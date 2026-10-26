# Local model API

The frontend calls `api_server.py`, which loads the saved Keras model and tokenizer once, exposes inference and inspection-history endpoints, and persists analysis results in `inspection_history.sqlite3`.

From PowerShell, install the Python dependencies and start the API:

```powershell
python -m pip install -r requirements.txt
python api_server.py
```

The default API address is `http://127.0.0.1:8000`. The model and tokenizer are resolved relative to this directory. The default database path is also here; set `WAF_DATABASE_PATH` to use a different location.

In a second terminal, configure and start the frontend:

```powershell
Copy-Item .env.example .env.local
npm run dev
```

`POST /api/v1/analyze` accepts `{"payload":"..."}` and returns the original model probabilities and prediction separately from the final circuit-breaker verdict. The API also provides:

- `GET /api/v1/health`
- `GET /api/v1/dashboard`
- `GET /api/v1/cases`
- `GET /api/v1/cases/{inspectionId}`
- `GET /api/v1/threats`

Payloads are limited to 10 KB. The development CORS allowlist includes Vite's default port (5173) and this project's configured port (8080). Set `WAF_ALLOWED_ORIGINS` to a comma-separated list of trusted frontend origins when deploying.

Each API inspection includes approximate Kernel SHAP contributions for the five highest-impact structural features. SHAP holds the character-sequence input fixed and explains the model's 42 engineered structural features for its predicted class; the explanation uses a zero-feature baseline and a bounded 128-sample budget. The detection chart displays absolute contribution magnitude in descending order, while the API retains signed contributions. Opening an older saved inspection refreshes its explanation if it has fewer than five features. Install the dependencies in `requirements.txt` to enable it. STIX bundle generation is not part of the API response. The API records submitted payloads in SQLite for the history screens; protect that database as sensitive security data.
