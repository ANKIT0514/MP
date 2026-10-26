import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/detection-BQ6i3wek.js
var $$splitComponentImporter = () => import("./detection-B_JQqpSM.mjs");
var Route = createFileRoute("/detection")({
	validateSearch: (search) => ({ id: typeof search["id"] === "string" ? search["id"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Detection Details — SENTINEL AI" },
		{
			name: "description",
			content: "Detailed security verdict, model analysis, explainability, and threat mapping."
		},
		{
			property: "og:title",
			content: "Detection Details — SENTINEL AI"
		},
		{
			property: "og:description",
			content: "Review a hybrid WAF inspection and its forensic evidence."
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
