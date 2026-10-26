var e={Benign:`GET /products?category=laptops&sort=price HTTP/1.1
Host: shop.example.com
User-Agent: Mozilla/5.0`,"SQL Injection":`GET /users?id=1%20OR%201=1;%20-- HTTP/1.1
Host: portal.example.com
Cookie: session=demo`,XSS:`POST /profile HTTP/1.1
Host: app.example.com
Content-Type: application/x-www-form-urlencoded

bio=<script>fetch('/steal?c='+document.cookie)<\/script>`,SSRF:`POST /api/fetch HTTP/1.1
Host: app.example.com
Content-Type: application/json

{"url":"http://169.254.169.254/latest/meta-data/iam/"}`},t=({BASE_URL:`/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1,TSS_DEV_SERVER:`false`,TSS_DEV_SSR_STYLES_BASEPATH:`/`,TSS_DEV_SSR_STYLES_ENABLED:`true`,TSS_DISABLE_CSRF_MIDDLEWARE_WARNING:`false`,TSS_INLINE_CSS_ENABLED:`false`,TSS_ROUTER_BASEPATH:``,TSS_SERVER_FN_BASE:`/_serverFn/`}.VITE_API_BASE_URL??`http://127.0.0.1:8000`).replace(/\/+$/,``);async function n(e,n){let r=await fetch(`${t}${e}`,{...n,headers:{"Content-Type":`application/json`,...n?.headers}});if(!r.ok){let e=`API request failed (${r.status})`;try{let t=await r.json();typeof t.error==`string`&&(e=t.error)}catch{}throw Error(e)}return await r.json()}var r={analyzePayload(e){return n(`/api/v1/analyze`,{method:`POST`,body:JSON.stringify({payload:e})})},getDashboard(){return n(`/api/v1/dashboard`)},async getCases(){return(await n(`/api/v1/cases?limit=1000`)).items},async getCase(e){if(e===`latest`){let e=sessionStorage.getItem(`sentinel-latest-analysis`);return e?JSON.parse(e):void 0}try{return await n(`/api/v1/cases/${encodeURIComponent(e)}`)}catch(e){if(e instanceof Error&&e.message===`Inspection not found.`)return;throw e}},getThreats(){return n(`/api/v1/threats`)},async generateReport(e){return{reportId:`RPT-${e.inspectionId.slice(-8)}`,generatedAt:new Date().toISOString(),status:`Ready`,analysis:e,pages:4,version:`1.0`}}};export{r as n,e as t};