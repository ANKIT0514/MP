# Clear Signal Sentinel

I am building a 7th-semester major project called:

SENTINEL AI — Next-Gen Explainable Hybrid WAF

GitHub repository:
https://github.com/SatyamSinhaic060/Next-Gen-Explainable-Hybrid-WAF

I currently have the backend/research implementation but I want to build a significantly improved premium frontend first.

IMPORTANT:

DO NOT modify, rewrite, or break the existing backend.

For this phase, build a FRONTEND-FIRST working prototype.

You may inspect the GitHub repository to understand:
- the project's architecture
- ML detection workflow
- SQLi/XSS/SSRF/Benign classifications
- circuit-breaker validation
- SHAP explainability
- MITRE ATT&CK/CAPEC mapping
- STIX reporting
- PDF forensic reporting
- existing payload analysis behavior

However, DO NOT depend on the backend being connected yet.

Create a clean mock service/API layer whose response structure mirrors what the real backend will eventually return.

The mock layer must be easy to replace with real FastAPI API calls later.

==================================================
DESIGN
==================================================

I want a PREMIUM enterprise cybersecurity SaaS interface.

Use the attached Sophos-inspired light-theme screenshot as the primary visual inspiration.

DO NOT make it look like a generic AI dashboard.

Design characteristics:

- Premium light theme
- White and very light gray background
- Navy/dark text
- Professional blue primary accent
- Subtle shadows
- Thin borders
- Excellent spacing
- Rounded but not overly rounded cards
- Enterprise cybersecurity aesthetic
- Sophisticated tables
- Professional status badges
- Clean typography
- Responsive design
- Subtle micro-interactions
- No excessive gradients
- No hacker/cyberpunk aesthetic
- No unnecessary neon colors

Brand:

SENTINEL AI

Subtitle:

Web Application Firewall

==================================================
MAIN PRODUCT WORKFLOW
==================================================

The most important page is:

PAYLOAD INSPECTOR

The user should be able to:

1. Paste an HTTP request or malicious payload.
2. Select sample payloads.
3. Click "Analyze Payload".
4. Show a short professional loading/analysis state.
5. Display a detailed inspection result.

Create sample payload buttons for:

- Benign Request
- SQL Injection
- Cross-Site Scripting (XSS)
- Server-Side Request Forgery (SSRF)

==================================================
ANALYSIS RESULT
==================================================

Create a premium detailed result page.

Top section:

SECURITY VERDICT

Example:

THREAT DETECTED

SQL INJECTION

Confidence: 99.56%

Severity: HIGH

Clearly label these as DEMO results while backend integration is disabled.

Show:

Original Payload

Normalized Payload

Classification Type

Model Confidence

Analysis Time

Inspection ID

==================================================
MODEL ANALYSIS
==================================================

Create a professional ML analysis section.

Display:

Final Classification

Class Probabilities

Benign
SQL Injection
XSS
SSRF

Use attractive horizontal probability bars.

Create a separate:

CIRCUIT-BREAKER VALIDATION

card showing:

ML Prediction
Rule-Based Validation
Validation Status
Final Verdict
Validation Reason

Make the distinction between:

MODEL PREDICTION

and

FINAL SECURITY VERDICT

very clear.

==================================================
EXPLAINABLE AI
==================================================

Create a SHAP Feature Importance section.

Use a professional horizontal bar chart.

Example demo features:

String_Length
Shannon_Entropy
Uppercase_Ratio
Flag_SQLTautology
Flag_CharFunc

Display feature contribution values.

Clearly mark these as demo values until connected to the real backend.

==================================================
THREAT INTELLIGENCE
==================================================

Create a premium Threat Intelligence section.

Show:

MITRE ATT&CK Technique

CAPEC Pattern

Mapping Rationale

Detected Behavior

Threat Indicators

Use professional information cards.

==================================================
FORENSIC REPORT
==================================================

Create a Reports section.

Allow the user to click:

"Generate Forensic Report"

and then:

"Download PDF"

For the prototype, generate a professional demo PDF/report preview using the frontend/mock data.

The PDF should look like a real enterprise cybersecurity forensic report.

Structure:

PAGE 1

SENTINEL AI
Forensic Threat Intelligence Report

Report ID
Timestamp
Security Status

Executive Summary

Threat Classification
Severity
Confidence

PAGE 2

Request Details

Original Payload
Normalized Payload

ML Analysis

Class probabilities

Circuit-Breaker Validation

PAGE 3

Explainable AI

SHAP feature importance chart

Threat Intelligence

MITRE ATT&CK
CAPEC
Mapping rationale

PAGE 4

Forensic Evidence

STIX information
Inspection metadata
Report generation metadata

Use professional headers, footers, page numbers and Sentinel AI branding.

Avoid large empty spaces.

==================================================
PAGES
==================================================

Create these pages:

1. Dashboard
2. Cases
3. Payload Inspector
4. Detection Details
5. Threat Intelligence
6. Model Insights
7. Reports

==================================================
DASHBOARD
==================================================

Create an enterprise security overview.

Cards:

Total Requests
Threats Detected
Benign Requests
SQL Injection
XSS
SSRF

Create:

Request Distribution chart

Recent Detection Activity

Detection Statistics

System Status

API Status should currently say:

Prototype Mode

because the real backend is not connected yet.

==================================================
CASES
==================================================

Create a professional enterprise table.

Columns:

#
Type
Payload / Request
Severity
Result
Confidence
Source
Date & Time
Actions

Add:

Search
Filter
Date range
Classification filters
Pagination

Use realistic DEMO records.

Clearly indicate that these are demo records.

==================================================
MODEL INSIGHTS
==================================================

Create:

Model Performance

Accuracy
Macro F1
Precision
Recall

Confusion Matrix

Per-Class Metrics

Architecture visualization:

SQLi BiLSTM
XSS BiLSTM
SSRF BiLSTM
        ↓
XGBoost Stacking
        ↓
Security Validation
        ↓
Final Verdict

Use the metrics documented in the project paper where appropriate, but clearly label them as MODEL EVALUATION RESULTS rather than live statistics.

==================================================
TECHNOLOGY
==================================================

Use:

React
TypeScript
Vite
Tailwind CSS
shadcn/ui
Lucide React
Recharts

Use reusable components.

Create a centralized mock API/service layer:

src/services/mockApi.ts

The interface should be designed so that later we can replace it with:

src/services/api.ts

without rewriting the UI.

Create TypeScript interfaces for:

PayloadAnalysis
ModelPrediction
CircuitBreakerResult
ShapFeature
ThreatIntelligence
ForensicReport

==================================================
IMPORTANT
==================================================

Do NOT create fake backend endpoints.

Do NOT modify the existing backend.

Do NOT hardcode demo values throughout individual components.

Keep demo data inside the mock service/data layer.

Make the UI fully functional using the mock service.

The user should be able to:

Paste payload
→ Analyze
→ See loading state
→ See result
→ Inspect SHAP
→ Inspect threat intelligence
→ Generate report
→ Download/view report

Make this feel like a real enterprise security product.

Before implementation, inspect the repository and explain briefly what you found.

Then build the frontend.

Do not stop at a static design.

I need a working interactive frontend prototype that we can connect to the real FastAPI backend later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/058f8047-343c-4453-a100-7b3d7eb72f7c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
