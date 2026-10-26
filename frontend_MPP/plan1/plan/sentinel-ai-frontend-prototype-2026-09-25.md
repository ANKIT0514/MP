# SENTINEL AI frontend prototype

## Goal
Build a responsive, frontend-only enterprise WAF console with a premium light visual system, realistic demo workflows, and one typed service boundary ready to swap for FastAPI later. Existing backend/research code remains untouched.

## Product structure
- Add a shared SENTINEL AI application shell with desktop navigation, a compact mobile drawer, prototype-status header, and consistent page titles.
- Create separate pages for Dashboard, Cases, Payload Inspector, Detection Details, Threat Intelligence, Model Insights, and Reports.
- Keep `/` as the Dashboard and use dedicated URLs for every other product area.

## Functional workflow
- Provide editable HTTP request input and Benign, SQLi, XSS, and SSRF samples.
- Run asynchronous mock analysis with a visible staged loading state, then navigate to a detailed inspection.
- Present security verdict, payload normalization, class probabilities, model prediction versus circuit-breaker final verdict, SHAP contributions, MITRE/CAPEC mappings, indicators, and STIX evidence.
- Make cases searchable, filterable, date-filtered, paginated, and linked to detection details.
- Generate a report preview from the active inspection and produce a branded four-page PDF download in the browser.

## Data and integration design
- Define `PayloadAnalysis`, `ModelPrediction`, `CircuitBreakerResult`, `ShapFeature`, `ThreatIntelligence`, and `ForensicReport` in a shared contract module.
- Implement `src/services/mockApi.ts` as the only demo data source, exposed through an API-shaped interface that can later be replaced by `src/services/api.ts`.
- Align mock names, metrics, feature fields, validation concepts, and intelligence mappings with documented repository behavior where available; mark uncertain or illustrative material as demo/evaluation data.
- Persist only the latest inspection in browser session state so detail and report pages work across navigation; no fake endpoints or backend changes.

## Visual direction
- Use a white/light-gray canvas, navy text, restrained professional blue, thin borders, compact radii, subtle elevation, and dense enterprise tables.
- Use Recharts for distribution and explainability visuals, with semantic design tokens and accessible contrast.
- Clearly label prototype, demo, and model-evaluation states without making them visually dominant.

## Verification
- Check every route’s metadata and navigation.
- Exercise the complete payload-to-report workflow in the live preview on desktop and mobile widths.
- Validate search, filters, pagination, loading states, charts, inspection navigation, report preview, and PDF download.
- Open and visually inspect all four generated PDF pages, then correct clipping, overlap, spacing, and typography issues.
