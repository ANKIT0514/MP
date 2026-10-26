import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { m as FileText } from "../_libs/lucide-react.mjs";
import { a as DemoBadge, c as SectionCard, r as Button, s as ProbabilityBars, t as AppShell, u as VerdictBanner } from "./security-ui-ORrW6vYb.mjs";
import { n as securityApi } from "./securityApi-3qj0eC0H.mjs";
import { t as Route } from "./detection-BQ6i3wek.mjs";
import { a as XAxis, c as Bar, i as YAxis, r as BarChart, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-OJGblT0J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/detection-B_JQqpSM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnalysisDetails({ analysis }) {
	const features = analysis.shapFeatures.map((item) => ({
		...item,
		value: Math.abs(item.contribution)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerdictBanner, { analysis }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 xl:grid-cols-[1.3fr_0.7fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
					title: "Request inspection",
					action: analysis.demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoBadge, {}) : null,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeField, {
							label: "Original payload",
							value: analysis.originalPayload
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeField, {
							label: "Normalized payload",
							value: analysis.normalizedPayload
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid grid-cols-2 gap-4 border-t pt-5 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Classification",
								value: analysis.classification
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Model confidence",
								value: `${analysis.confidence.toFixed(2)}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Analysis time",
								value: `${analysis.analysisTimeMs} ms`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
								label: "Inspection ID",
								value: analysis.inspectionId,
								mono: true
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Class probabilities",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-semibold uppercase text-muted-foreground",
						children: "Model prediction"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProbabilityBars, { analysis })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
				title: "Circuit-breaker validation",
				action: analysis.demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoBadge, { label: "Validation ring" }) : null,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border bg-muted/35 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-semibold uppercase text-muted-foreground",
									children: "Model prediction"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-lg font-bold",
									children: analysis.circuitBreaker.mlPrediction
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-muted-foreground",
									children: "Statistical classification from the structural model."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden items-center text-muted-foreground md:flex",
							children: "→"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-primary/20 bg-primary-muted p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-semibold uppercase text-primary",
									children: "Final security verdict"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-lg font-bold",
									children: analysis.circuitBreaker.finalVerdict
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-muted-foreground",
									children: analysis.circuitBreaker.reason
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 border-t pt-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Rule-based validation",
						value: analysis.circuitBreaker.ruleBasedValidation
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
						label: "Validation status",
						value: analysis.circuitBreaker.status
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 xl:grid-cols-[1.15fr_0.85fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "SHAP feature importance",
					action: analysis.shapFeatures.length ? analysis.demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoBadge, { label: "Demo values" }) : null : null,
					children: features.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
						config: { value: {
							label: "SHAP importance",
							color: "var(--color-primary)"
						} },
						className: "h-[300px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: features,
							layout: "vertical",
							margin: {
								left: 10,
								right: 32
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { horizontal: false }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									type: "number",
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									dataKey: "name",
									type: "category",
									width: 118,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, { hideLabel: true }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									isAnimationActive: false,
									dataKey: "value",
									fill: "var(--color-primary)",
									radius: [
										0,
										3,
										3,
										0
									]
								})
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "Feature attribution is unavailable for this inspection. Open a saved inspection again to calculate SHAP values."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Threat intelligence",
					action: analysis.demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoBadge, {}) : null,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intel, {
								label: "MITRE ATT&CK technique",
								title: `${analysis.threatIntelligence.mitreTechnique.id} — ${analysis.threatIntelligence.mitreTechnique.name}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intel, {
								label: "CAPEC pattern",
								title: `${analysis.threatIntelligence.capecPattern.id} — ${analysis.threatIntelligence.capecPattern.name}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intel, {
								label: "Detected behavior",
								title: analysis.threatIntelligence.detectedBehavior
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-semibold uppercase text-muted-foreground",
								children: "Mapping rationale"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-6",
								children: analysis.threatIntelligence.rationale
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: analysis.threatIntelligence.indicators.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-sm border bg-muted/50 px-2 py-1 text-xs",
									children: item
								}, item))
							})
						]
					})
				})]
			})
		]
	});
}
function CodeField({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 text-[10px] font-semibold uppercase text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		className: "h-32 overflow-auto whitespace-pre-wrap break-all rounded-md border bg-code p-3 font-mono text-xs leading-5 text-code-foreground",
		children: value
	})] });
}
function Fact({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[10px] font-semibold uppercase text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: `mt-1.5 text-sm font-semibold ${mono ? "font-mono text-xs" : ""}`,
		children: value
	})] });
}
function Intel({ label, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] font-semibold uppercase text-primary",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-semibold",
			children: title
		})]
	});
}
function Detection() {
	const { id } = Route.useSearch();
	const [analysis, setAnalysis] = (0, import_react.useState)();
	const [error, setError] = (0, import_react.useState)();
	(0, import_react.useEffect)(() => {
		setAnalysis(void 0);
		setError(void 0);
		if (!id) return;
		securityApi.getCase(id).then((value) => {
			if (value) setAnalysis(value);
			else setError("Inspection not found. Submit a payload from the inspector or open a saved case.");
		}).catch((cause) => setError(cause instanceof Error ? cause.message : "Unable to load this inspection."));
	}, [id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Detection Details",
		description: "End-to-end evidence for a single inspected request.",
		action: analysis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/reports",
				search: { id: analysis.inspectionId },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}), "Create report"]
			})
		}) : void 0,
		children: analysis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisDetails, { analysis }) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-md border border-danger-border bg-danger-muted p-4 text-sm text-danger",
			role: "alert",
			children: error
		}) : id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-96 animate-pulse rounded-md bg-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-md border p-4 text-sm text-muted-foreground",
			children: "Choose an inspection from Cases or analyze a payload to view its result."
		})
	});
}
//#endregion
export { Detection as component };
