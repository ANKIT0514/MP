import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { O as Ban, b as CodeXml, c as Network, i as ShieldAlert, j as Activity, x as CircleCheck } from "../_libs/lucide-react.mjs";
import { c as SectionCard, i as ClassificationBadge, l as SeverityBadge, o as MetricCard, r as Button, t as AppShell } from "./security-ui-ORrW6vYb.mjs";
import { n as securityApi } from "./securityApi-3qj0eC0H.mjs";
import { a as XAxis, i as YAxis, l as Pie, n as PieChart, o as Area, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { n as ChartTooltip, r as ChartTooltipContent, t as ChartContainer } from "./chart-OJGblT0J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B5yh7H8F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const [data, setData] = (0, import_react.useState)();
	const [error, setError] = (0, import_react.useState)();
	(0, import_react.useEffect)(() => {
		securityApi.getDashboard().then(setData).catch((cause) => {
			setError(cause instanceof Error ? cause.message : "Unable to load dashboard data.");
		});
	}, []);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Security Dashboard",
		description: "Live posture across inspected application traffic.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-md border border-danger-border bg-danger-muted p-4 text-sm text-danger",
			role: "alert",
			children: error
		})
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Security Dashboard",
		description: "Live posture across inspected application traffic.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-96 animate-pulse rounded-md bg-muted" })
	});
	const t = data.totals;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Security Dashboard",
		description: "Persisted totals from model-backed payload inspections.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/inspector",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {}), "Inspect payload"]
			})
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-center gap-2 rounded-md border bg-card px-4 py-3 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-success" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: "Live model data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Counts and recent cases reflect inspections stored by the backend." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Total Requests",
						value: t.requests.toLocaleString(),
						icon: Activity
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Threats Detected",
						value: t.threats.toLocaleString(),
						icon: ShieldAlert
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Benign Requests",
						value: t.benign.toLocaleString(),
						icon: CircleCheck
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "SQL Injection",
						value: t.sqli.toLocaleString(),
						icon: CodeXml
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "XSS",
						value: t.xss.toLocaleString(),
						icon: Ban
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "SSRF",
						value: t.ssrf.toLocaleString(),
						icon: Network
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Detection statistics",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "Last 7 days"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
						config: {
							requests: {
								label: "Requests",
								color: "var(--color-primary)"
							},
							threats: {
								label: "Threats",
								color: "var(--color-danger)"
							}
						},
						className: "h-[280px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: data.weekly,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { vertical: false }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "day",
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									isAnimationActive: false,
									dataKey: "requests",
									type: "monotone",
									fill: "var(--color-primary-muted)",
									stroke: "var(--color-primary)",
									strokeWidth: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									isAnimationActive: false,
									dataKey: "threats",
									type: "monotone",
									fill: "transparent",
									stroke: "var(--color-danger)",
									strokeWidth: 2
								})
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
					title: "Request distribution",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
						config: {
							Benign: { color: "var(--color-success)" },
							"SQL Injection": { color: "var(--color-danger)" },
							XSS: { color: "var(--color-warning)" },
							SSRF: { color: "var(--color-info)" }
						},
						className: "h-[220px] w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
							isAnimationActive: false,
							data: data.distribution,
							dataKey: "value",
							nameKey: "name",
							innerRadius: 58,
							outerRadius: 84,
							paddingAngle: 2,
							children: [
								"var(--color-success)",
								"var(--color-danger)",
								"var(--color-warning)",
								"var(--color-info)"
							].map((color, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: color }, data.distribution[index]?.name ?? color))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {}) })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: data.distribution.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.value.toLocaleString() })]
						}, item.name))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-5 xl:grid-cols-[1fr_310px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "Recent inspection activity",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cases",
							children: "View all"
						})
					}),
					children: data.recentCases.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: data.recentCases.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/detection",
							search: { id: item.inspectionId },
							className: "grid grid-cols-[1fr_auto] gap-3 py-3 transition-colors hover:bg-muted/30 sm:grid-cols-[160px_1fr_auto_auto] sm:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassificationBadge, { value: item.classification }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate font-mono text-xs text-muted-foreground",
									children: item.normalizedPayload
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { value: item.severity }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold tabular-nums",
									children: [item.confidence.toFixed(2), "%"]
								})
							]
						}, item.inspectionId))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "No inspections yet. Analyze a payload to populate this dashboard."
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					title: "System status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, {
								label: "Inspection engine",
								value: "Connected"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, {
								label: "Validation ring",
								value: "Active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, {
								label: "SHAP explanations",
								value: data.shapEnabled ? "Enabled" : "Unavailable",
								warning: !data.shapEnabled
							})
						]
					})
				})]
			})
		]
	});
}
function Status({ label, value, warning }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2 font-medium",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2 rounded-full ${warning ? "bg-warning" : "bg-success"}` }), value]
		})]
	});
}
//#endregion
export { Dashboard as component };
