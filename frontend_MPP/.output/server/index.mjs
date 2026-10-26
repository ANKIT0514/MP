globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-24T16:50:08.546Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/detection-D6SJD8fB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"394-l+N2YdGgAdNWLQY4AkQmzT7sN0w\"",
		"mtime": "2026-10-25T07:58:07.853Z",
		"size": 916,
		"path": "../public/assets/detection-D6SJD8fB.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"10be-gqaqY4bUBqsmEyYQRyeD9fYhuac\"",
		"mtime": "2026-10-24T17:11:18.191Z",
		"size": 4286,
		"path": "../public/favicon.ico"
	},
	"/assets/detection-DUDqVCz5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1aa2-oVe1+AQUfGE0W87ce5NBdHWGE0o\"",
		"mtime": "2026-10-25T07:58:07.858Z",
		"size": 6818,
		"path": "../public/assets/detection-DUDqVCz5.js"
	},
	"/assets/inspector-BMW1uuMf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111b-w6dVBDXgdaBb2tnn/3d11/MygPk\"",
		"mtime": "2026-10-25T07:58:07.881Z",
		"size": 4379,
		"path": "../public/assets/inspector-BMW1uuMf.js"
	},
	"/assets/cases-DcLlVzq5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1729b-b2BeVrY8hgqtWuBQ+fOmARB3gvU\"",
		"mtime": "2026-10-25T07:58:06.768Z",
		"size": 94875,
		"path": "../public/assets/cases-DcLlVzq5.js"
	},
	"/assets/loader-circle-C1ahU8Sz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b-GVqBvnn9ikznrzEtJA6oyCc5WLk\"",
		"mtime": "2026-10-25T07:58:07.963Z",
		"size": 139,
		"path": "../public/assets/loader-circle-C1ahU8Sz.js"
	},
	"/assets/preload-helper-CjVWtrQc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161a-ZXlYF10xGsbLEA1mxRTNs413QQI\"",
		"mtime": "2026-10-25T07:58:07.979Z",
		"size": 5658,
		"path": "../public/assets/preload-helper-CjVWtrQc.js"
	},
	"/assets/link-_j_LJZfQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e97-VJBqihvt/E7IHBdZlSzwXtKZgKc\"",
		"mtime": "2026-10-25T07:58:07.895Z",
		"size": 36503,
		"path": "../public/assets/link-_j_LJZfQ.js"
	},
	"/assets/reports-9lLjgG4c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"387-ZwKoUeLrH4pIJgTCjAntQvOECPk\"",
		"mtime": "2026-10-25T07:58:07.987Z",
		"size": 903,
		"path": "../public/assets/reports-9lLjgG4c.js"
	},
	"/assets/model-insights-p4rm7B2j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b69-lmQqxaXR/CCBsj3QhvsGJVco8hw\"",
		"mtime": "2026-10-25T07:58:07.968Z",
		"size": 2921,
		"path": "../public/assets/model-insights-p4rm7B2j.js"
	},
	"/assets/chart-DVX_HMvd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b994-6qHstjRp3+GlYeuQQa2vPefei1Q\"",
		"mtime": "2026-10-25T07:58:06.898Z",
		"size": 375188,
		"path": "../public/assets/chart-DVX_HMvd.js"
	},
	"/assets/routes-DaSn-ivF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7b2-KeKjF1tDB2t7d1o4+1YHpjtvZXk\"",
		"mtime": "2026-10-25T07:58:08.240Z",
		"size": 42930,
		"path": "../public/assets/routes-DaSn-ivF.js"
	},
	"/assets/security-ui-1smG3VOf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba43-gaFYLTIIsj59g0X2q/u6lyyZgPM\"",
		"mtime": "2026-10-25T07:58:08.272Z",
		"size": 47683,
		"path": "../public/assets/security-ui-1smG3VOf.js"
	},
	"/assets/securityApi-BDMsZaC6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"735-K4DRrj2G1F6A5/u39tJ9fvXsirM\"",
		"mtime": "2026-10-25T07:58:08.336Z",
		"size": 1845,
		"path": "../public/assets/securityApi-BDMsZaC6.js"
	},
	"/assets/threat-intelligence-oZ3S0uR8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb2-yrr64w+nqwikWiVAxqdvZYjTe3U\"",
		"mtime": "2026-10-25T07:58:08.341Z",
		"size": 3250,
		"path": "../public/assets/threat-intelligence-oZ3S0uR8.js"
	},
	"/assets/styles-CcUZrU9D.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14fb4-Nner9PViwl+sSd+O1iYvDZHHiEk\"",
		"mtime": "2026-10-25T07:58:08.356Z",
		"size": 85940,
		"path": "../public/assets/styles-CcUZrU9D.css"
	},
	"/assets/useNavigate-bGp64IfQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8-K9Nhjv+Y1FXFAdUOmpURJEZCqaw\"",
		"mtime": "2026-10-25T07:58:08.351Z",
		"size": 184,
		"path": "../public/assets/useNavigate-bGp64IfQ.js"
	},
	"/assets/index-RQZ3Z2nq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5344c-FXVDMFB5E/2ocNJR/mkhMD4BNPM\"",
		"mtime": "2026-10-25T07:58:06.158Z",
		"size": 341068,
		"path": "../public/assets/index-RQZ3Z2nq.js"
	},
	"/assets/reports-CpY-BBfD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69890-DMktxmTnlPlIWcDOKHZcoB6TRBo\"",
		"mtime": "2026-10-25T07:58:07.993Z",
		"size": 432272,
		"path": "../public/assets/reports-CpY-BBfD.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_HlHYni = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_HlHYni
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
