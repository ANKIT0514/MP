import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { k as ArrowUpRight, s as Radar } from "../_libs/lucide-react.mjs";
import { c as SectionCard, i as ClassificationBadge, r as Button, t as AppShell } from "./security-ui-ORrW6vYb.mjs";
import { n as securityApi } from "./securityApi-3qj0eC0H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/threat-intelligence-XVRObhto.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Threats() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)();
	(0, import_react.useEffect)(() => {
		securityApi.getThreats().then(setItems).catch((cause) => {
			setError(cause instanceof Error ? cause.message : "Unable to load threat mappings.");
		});
	}, []);
	const techniqueCount = (0, import_react.useMemo)(() => new Set(items.map((item) => item.threatIntelligence.mitreTechnique.id)).size, [items]);
	const patternCount = (0, import_react.useMemo)(() => new Set(items.map((item) => item.threatIntelligence.capecPattern.id)).size, [items]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Threat Intelligence",
		description: "Review MITRE ATT&CK and CAPEC context returned for persisted threat detections.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
				title: "Mapped detections",
				className: "lg:col-span-2",
				children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					role: "alert",
					children: error
				}) : items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/detection",
						search: { id: item.inspectionId },
						className: "block rounded-md border p-4 transition-all hover:border-primary/30 hover:shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassificationBadge, { value: item.classification }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "mt-3 font-semibold",
									children: [
										item.threatIntelligence.mitreTechnique.id,
										" — ",
										item.threatIntelligence.mitreTechnique.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										item.threatIntelligence.capecPattern.id,
										" · ",
										item.threatIntelligence.capecPattern.name
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-muted-foreground" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-6 text-muted-foreground",
							children: item.threatIntelligence.rationale
						})]
					}, item.inspectionId))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-center text-sm text-muted-foreground",
					children: "No threat detections have been recorded."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Recorded coverage",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Threat detections",
								value: items.length.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "MITRE techniques",
								value: techniqueCount.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "CAPEC patterns",
								value: patternCount.toLocaleString()
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
					title: "STIX export",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-10 place-items-center rounded-md bg-primary-muted text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-6 text-muted-foreground",
							children: "The live inspection API returns MITRE and CAPEC mappings. STIX bundle generation is not enabled by this API."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "mt-4 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cases",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {}), "View inspection history"]
							})
						})
					]
				})]
			})]
		})
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between border-b pb-3 last:border-0 last:pb-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "text-lg",
			children: value
		})]
	});
}
//#endregion
export { Threats as component };
