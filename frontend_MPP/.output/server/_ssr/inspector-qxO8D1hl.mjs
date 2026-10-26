import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as ScanSearch, u as LoaderCircle, x as CircleCheck } from "../_libs/lucide-react.mjs";
import { c as SectionCard, d as cn, n as Badge, r as Button, t as AppShell } from "./security-ui-ORrW6vYb.mjs";
import { n as securityApi, t as SAMPLE_PAYLOADS } from "./securityApi-3qj0eC0H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inspector-qxO8D1hl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function Inspector() {
	const [payload, setPayload] = (0, import_react.useState)(SAMPLE_PAYLOADS["SQL Injection"]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)();
	const navigate = useNavigate();
	async function analyze() {
		if (!payload.trim()) return;
		setLoading(true);
		setError(void 0);
		try {
			const result = await securityApi.analyzePayload(payload);
			sessionStorage.setItem("sentinel-latest-analysis", JSON.stringify(result));
			await navigate({
				to: "/detection",
				search: { id: "latest" }
			});
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "The model API request failed.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Payload Inspector",
		description: "Analyze HTTP traffic through structural classification, canonicalization, and deterministic security validation.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "outline",
			className: "border-success-border bg-success-muted text-success",
			children: "Live model API"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 xl:grid-cols-[1fr_340px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: "HTTP request or payload",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Plain text · max 10 KB"
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: payload,
						onChange: (event) => setPayload(event.target.value),
						maxLength: 10240,
						className: "min-h-[360px] resize-y bg-code font-mono text-sm leading-6 text-code-foreground",
						"aria-label": "Payload input"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [payload.length.toLocaleString(), " characters"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							disabled: loading || !payload.trim(),
							onClick: () => void analyze(),
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Analyzing request…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanSearch, {}), "Analyze Payload"] })
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-danger",
						role: "alert",
						children: error
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Sample payloads",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: Object.keys(SAMPLE_PAYLOADS).map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: payload === SAMPLE_PAYLOADS[name] ? "secondary" : "outline",
							className: "h-auto w-full justify-start py-3 text-left",
							onClick: () => setPayload(SAMPLE_PAYLOADS[name]),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-6 shrink-0 place-items-center rounded-sm bg-primary-muted text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" })
							}), name]
						}, name))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Inspection pipeline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-4",
						children: [
							"Recursive canonicalization",
							"42 structural features",
							"Four-class model inference",
							"Circuit-breaker validation",
							"Persist prediction to history"
						].map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-6 shrink-0 place-items-center rounded-full border text-[10px] font-bold text-primary",
								children: index + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pt-0.5",
								children: step
							})]
						}, step))
					})
				})]
			})]
		}), loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 grid place-items-center bg-foreground/20 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-[min(90vw,420px)] rounded-md border bg-card p-7 shadow-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-7 animate-spin text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-lg font-bold",
						children: "Inspecting payload"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Canonicalizing input and validating the model verdict."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 h-1.5 overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-3/4 animate-pulse bg-primary" })
					})
				]
			})
		})]
	});
}
//#endregion
export { Inspector as component };
