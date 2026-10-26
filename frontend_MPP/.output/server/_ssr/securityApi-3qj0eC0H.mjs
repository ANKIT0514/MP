//#region node_modules/.nitro/vite/services/ssr/assets/securityApi-3qj0eC0H.js
var SAMPLE_PAYLOADS = {
	Benign: "GET /products?category=laptops&sort=price HTTP/1.1\nHost: shop.example.com\nUser-Agent: Mozilla/5.0",
	"SQL Injection": "GET /users?id=1%20OR%201=1;%20-- HTTP/1.1\nHost: portal.example.com\nCookie: session=demo",
	XSS: "POST /profile HTTP/1.1\nHost: app.example.com\nContent-Type: application/x-www-form-urlencoded\n\nbio=<script>fetch('/steal?c='+document.cookie)<\/script>",
	SSRF: "POST /api/fetch HTTP/1.1\nHost: app.example.com\nContent-Type: application/json\n\n{\"url\":\"http://169.254.169.254/latest/meta-data/iam/\"}"
};
var API_BASE_URL = ({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
}["VITE_API_BASE_URL"] ?? "http://127.0.0.1:8000").replace(/\/+$/, "");
async function request(path, init) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...init?.headers
		}
	});
	if (!response.ok) {
		let message = `API request failed (${response.status})`;
		try {
			const body = await response.json();
			if (typeof body.error === "string") message = body.error;
		} catch {}
		throw new Error(message);
	}
	return await response.json();
}
var securityApi = {
	analyzePayload(payload) {
		return request("/api/v1/analyze", {
			method: "POST",
			body: JSON.stringify({ payload })
		});
	},
	getDashboard() {
		return request("/api/v1/dashboard");
	},
	async getCases() {
		return (await request("/api/v1/cases?limit=1000")).items;
	},
	async getCase(id) {
		if (id === "latest") {
			const stored = sessionStorage.getItem("sentinel-latest-analysis");
			return stored ? JSON.parse(stored) : void 0;
		}
		try {
			return await request(`/api/v1/cases/${encodeURIComponent(id)}`);
		} catch (error) {
			if (error instanceof Error && error.message === "Inspection not found.") return void 0;
			throw error;
		}
	},
	getThreats() {
		return request("/api/v1/threats");
	},
	async generateReport(analysis) {
		return {
			reportId: `RPT-${analysis.inspectionId.slice(-8)}`,
			generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "Ready",
			analysis,
			pages: 4,
			version: "1.0"
		};
	}
};
//#endregion
export { securityApi as n, SAMPLE_PAYLOADS as t };
