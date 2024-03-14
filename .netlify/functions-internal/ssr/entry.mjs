import { renderers } from './renderers.mjs';
import { manifest } from './manifest_B1Ke_zX9.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_BLiQceDK.mjs');
const _page1 = () => import('./chunks/landing_DGELvekV.mjs');
const _page2 = () => import('./chunks/posts_0jPFhkmV.mjs');
const _page3 = () => import('./chunks/profile_BMx0c3rq.mjs');
const _page4 = () => import('./chunks/registration_DpbK-KJt.mjs');
const _page5 = () => import('./chunks/terms_CkD9k63Q.mjs');
const _page6 = () => import('./chunks/index_BebPDNIH.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/landing.astro", _page1],
    ["src/pages/posts.astro", _page2],
    ["src/pages/profile.astro", _page3],
    ["src/pages/registration.astro", _page4],
    ["src/pages/terms.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "eb67a07e-ffdb-40fc-bdb6-36c4c529811f"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
