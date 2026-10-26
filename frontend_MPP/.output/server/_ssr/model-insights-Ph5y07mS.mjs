import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as ArrowDown, E as BrainCircuit, r as ShieldCheck, y as Database } from "../_libs/lucide-react.mjs";
import { c as SectionCard, t as AppShell } from "./security-ui-ORrW6vYb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/model-insights-Ph5y07mS.js
var import_jsx_runtime = require_jsx_runtime();
function Insights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Model Insights",
		description: "Architecture and evaluation information for the deployed hybrid detection pipeline.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 rounded-md border border-warning-border bg-warning-muted px-4 py-3 text-xs text-warning-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evaluation data unavailable:" }), " The repository does not contain a verified evaluation report. No precision, recall, F1, or confusion-matrix values are presented."]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 xl:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Hybrid model architecture",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
							label: "Character-level tokenizer · max length 250",
							icon: Database
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "mx-auto text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
								label: "Bidirectional LSTM sequence stream",
								icon: BrainCircuit
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
								label: "42 structural feature stream",
								icon: Database
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "mx-auto text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
							label: "Late fusion · dense classification layers",
							icon: BrainCircuit
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "mx-auto text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
							label: "Four-class softmax output",
							icon: ShieldCheck
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Inference and validation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 text-sm leading-6 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The backend canonicalizes submitted payloads, creates character sequences and structural features, then runs the saved Keras model and tokenizer." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Model probabilities are retained separately from the final verdict. A deterministic validation ring may override a model prediction; both values are returned for inspection." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "rounded-md border bg-muted/40 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: "Output classes:"
							}), " Benign, XSS, SQL Injection, and SSRF."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Kernel SHAP estimates how the 42 engineered structural features contribute to the model's predicted class. The character-sequence input is held fixed, and the approximate explanation uses a bounded sample budget for interactive response times." })
					]
				})
			})]
		})]
	});
}
function Node({ label, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border bg-card p-4 text-center shadow-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto mb-2 size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold",
			children: label
		})]
	});
}
//#endregion
export { Insights as component };
