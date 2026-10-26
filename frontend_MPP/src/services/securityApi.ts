import type {
  Classification,
  DashboardData,
  ForensicReport,
  PayloadAnalysis,
  SecurityCase,
} from "@/types/security";

export const SAMPLE_PAYLOADS: Record<Classification, string> = {
  Benign: "GET /products?category=laptops&sort=price HTTP/1.1\nHost: shop.example.com\nUser-Agent: Mozilla/5.0",
  "SQL Injection": "GET /users?id=1%20OR%201=1;%20-- HTTP/1.1\nHost: portal.example.com\nCookie: session=demo",
  XSS: "POST /profile HTTP/1.1\nHost: app.example.com\nContent-Type: application/x-www-form-urlencoded\n\nbio=<script>fetch('/steal?c='+document.cookie)</script>",
  SSRF: "POST /api/fetch HTTP/1.1\nHost: app.example.com\nContent-Type: application/json\n\n{\"url\":\"http://169.254.169.254/latest/meta-data/iam/\"}",
};

const API_BASE_URL = (import.meta.env["VITE_API_BASE_URL"] ?? "http://127.0.0.1:8000").replace(/\/+$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) {
    let message = `API request failed (${response.status})`;
    try {
      const body = (await response.json()) as { error?: unknown };
      if (typeof body.error === "string") message = body.error;
    } catch {
      // Keep the HTTP status message when the server response is not JSON.
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

export const securityApi = {
  analyzePayload(payload: string) {
    return request<PayloadAnalysis>("/api/v1/analyze", {
      method: "POST",
      body: JSON.stringify({ payload }),
    });
  },
  getDashboard() {
    return request<DashboardData>("/api/v1/dashboard");
  },
  async getCases() {
    const result = await request<{ items: SecurityCase[]; total: number }>("/api/v1/cases?limit=1000");
    return result.items;
  },
  async getCase(id: string) {
    if (id === "latest") {
      const stored = sessionStorage.getItem("sentinel-latest-analysis");
      return stored ? (JSON.parse(stored) as PayloadAnalysis) : undefined;
    }
    try {
      return await request<PayloadAnalysis>(`/api/v1/cases/${encodeURIComponent(id)}`);
    } catch (error) {
      if (error instanceof Error && error.message === "Inspection not found.") return undefined;
      throw error;
    }
  },
  getThreats() {
    return request<SecurityCase[]>("/api/v1/threats");
  },
  async generateReport(analysis: PayloadAnalysis): Promise<ForensicReport> {
    return {
      reportId: `RPT-${analysis.inspectionId.slice(-8)}`,
      generatedAt: new Date().toISOString(),
      status: "Ready",
      analysis,
      pages: 4,
      version: "1.0",
    };
  },
};
