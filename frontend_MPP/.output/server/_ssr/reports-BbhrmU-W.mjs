import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-BbhrmU-W.js
var $$splitComponentImporter = () => import("./reports-i5bZFyDj.mjs");
var Route = createFileRoute("/reports")({
	validateSearch: (search) => ({ id: typeof search["id"] === "string" ? search["id"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Forensic Reports — SENTINEL AI" },
		{
			name: "description",
			content: "Generate and download forensic reports from saved model inspections."
		},
		{
			property: "og:title",
			content: "Forensic Reports — SENTINEL AI"
		},
		{
			property: "og:description",
			content: "Forensic reports for persisted WAF inspection results."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
