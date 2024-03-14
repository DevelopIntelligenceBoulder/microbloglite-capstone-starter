import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_BtgUKnRf.mjs';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BxSy-hZW.js"}],"styles":[{"type":"inline","content":".input-group-horizontal .input-group:first-child>*{margin-bottom:-1px}.input-group-horizontal .input-group:first-child *{border-bottom-left-radius:0!important;border-bottom-right-radius:0!important}.input-group-horizontal .input-group:last-child *{border-top-left-radius:0!important;border-top-right-radius:0!important}.form-group .form-floating:focus-within{z-index:2}h1{text-indent:-3px;text-align:center}h4{text-align:center}\n*{box-sizing:border-box}body{line-height:160%;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}.content-visable-hidden{content-visibility:hidden}.svh-100{height:100svh}:root{font-size:1rem}.btn-primary{background:#8a8432;border-color:#c5b90a;transition-duration:.1s}.btn-primary:hover{background:#b3aa36;border-color:#fe0}.btn-primary:focus{background:#978f20!important;border-color:#a59a05!important}.btn-primary:active{background:#928b25!important;border-color:#a59a05!important}.btn-primary:disabled{background:#77733f!important;border-color:#b9af3c!important;color:#d3d3d3}.bg-primary{background:#ffd31152!important}.w-fit-content{max-width:min-content}.dropdown-menu>*:active{background:#8a8432}.border-primary{border-color:#e0d209!important}.nav-underline>*:hover{border-color:#e0d209!important}.card{border-radius:0}.card>*{border-radius:0}.text-primary{color:#e0d209!important}\n"}],"routeData":{"route":"/landing","isIndex":false,"type":"page","pattern":"^\\/landing\\/?$","segments":[[{"content":"landing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing.astro","pathname":"/landing","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B6qGq_pT.js"}],"styles":[{"type":"inline","content":"*{box-sizing:border-box}body{line-height:160%;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}.content-visable-hidden{content-visibility:hidden}.svh-100{height:100svh}:root{font-size:1rem}.btn-primary{background:#8a8432;border-color:#c5b90a;transition-duration:.1s}.btn-primary:hover{background:#b3aa36;border-color:#fe0}.btn-primary:focus{background:#978f20!important;border-color:#a59a05!important}.btn-primary:active{background:#928b25!important;border-color:#a59a05!important}.btn-primary:disabled{background:#77733f!important;border-color:#b9af3c!important;color:#d3d3d3}.bg-primary{background:#ffd31152!important}.w-fit-content{max-width:min-content}.dropdown-menu>*:active{background:#8a8432}.border-primary{border-color:#e0d209!important}.nav-underline>*:hover{border-color:#e0d209!important}.card{border-radius:0}.card>*{border-radius:0}.text-primary{color:#e0d209!important}\n"}],"routeData":{"route":"/posts","isIndex":false,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts.astro","pathname":"/posts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.JNqeSOLa.js"}],"styles":[{"type":"inline","content":"*{box-sizing:border-box}body{line-height:160%;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}.content-visable-hidden{content-visibility:hidden}.svh-100{height:100svh}:root{font-size:1rem}.btn-primary{background:#8a8432;border-color:#c5b90a;transition-duration:.1s}.btn-primary:hover{background:#b3aa36;border-color:#fe0}.btn-primary:focus{background:#978f20!important;border-color:#a59a05!important}.btn-primary:active{background:#928b25!important;border-color:#a59a05!important}.btn-primary:disabled{background:#77733f!important;border-color:#b9af3c!important;color:#d3d3d3}.bg-primary{background:#ffd31152!important}.w-fit-content{max-width:min-content}.dropdown-menu>*:active{background:#8a8432}.border-primary{border-color:#e0d209!important}.nav-underline>*:hover{border-color:#e0d209!important}.card{border-radius:0}.card>*{border-radius:0}.text-primary{color:#e0d209!important}\n"}],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile.astro","pathname":"/profile","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BxOjuvjd.js"}],"styles":[{"type":"inline","content":".wrapper{border-top:3px solid #dacc16!important}.wrapper a{text-decoration:none;color:#c5bc40ee!important}\n*{box-sizing:border-box}body{line-height:160%;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}.content-visable-hidden{content-visibility:hidden}.svh-100{height:100svh}:root{font-size:1rem}.btn-primary{background:#8a8432;border-color:#c5b90a;transition-duration:.1s}.btn-primary:hover{background:#b3aa36;border-color:#fe0}.btn-primary:focus{background:#978f20!important;border-color:#a59a05!important}.btn-primary:active{background:#928b25!important;border-color:#a59a05!important}.btn-primary:disabled{background:#77733f!important;border-color:#b9af3c!important;color:#d3d3d3}.bg-primary{background:#ffd31152!important}.w-fit-content{max-width:min-content}.dropdown-menu>*:active{background:#8a8432}.border-primary{border-color:#e0d209!important}.nav-underline>*:hover{border-color:#e0d209!important}.card{border-radius:0}.card>*{border-radius:0}.text-primary{color:#e0d209!important}\n"}],"routeData":{"route":"/registration","isIndex":false,"type":"page","pattern":"^\\/registration\\/?$","segments":[[{"content":"registration","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/registration.astro","pathname":"/registration","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".h3{color:#93a63f}h6{color:#ffffffe1}.switch{color:#93a63f;text-decoration:none}.p{font-size:larger}\n*{box-sizing:border-box}body{line-height:160%;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}.content-visable-hidden{content-visibility:hidden}.svh-100{height:100svh}:root{font-size:1rem}.btn-primary{background:#8a8432;border-color:#c5b90a;transition-duration:.1s}.btn-primary:hover{background:#b3aa36;border-color:#fe0}.btn-primary:focus{background:#978f20!important;border-color:#a59a05!important}.btn-primary:active{background:#928b25!important;border-color:#a59a05!important}.btn-primary:disabled{background:#77733f!important;border-color:#b9af3c!important;color:#d3d3d3}.bg-primary{background:#ffd31152!important}.w-fit-content{max-width:min-content}.dropdown-menu>*:active{background:#8a8432}.border-primary{border-color:#e0d209!important}.nav-underline>*:hover{border-color:#e0d209!important}.card{border-radius:0}.card>*{border-radius:0}.text-primary{color:#e0d209!important}\n"}],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms\\/?$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"location.href=\"landing/\";\n"}],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/jon/Career/Software Development/bookface/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/jon/Career/Software Development/bookface/src/pages/landing.astro",{"propagation":"none","containsHead":true}],["/home/jon/Career/Software Development/bookface/src/pages/posts.astro",{"propagation":"none","containsHead":true}],["/home/jon/Career/Software Development/bookface/src/pages/profile.astro",{"propagation":"none","containsHead":true}],["/home/jon/Career/Software Development/bookface/src/pages/registration.astro",{"propagation":"none","containsHead":true}],["/home/jon/Career/Software Development/bookface/src/pages/terms.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_czxrcasl.mjs","/src/pages/index.astro":"chunks/pages/index_DWuSuBvO.mjs","/src/pages/posts.astro":"chunks/pages/posts_Cikx30uu.mjs","/src/pages/profile.astro":"chunks/pages/profile_BPsI1Www.mjs","/src/pages/registration.astro":"chunks/pages/registration_Cc5e-Y9W.mjs","/src/pages/terms.astro":"chunks/pages/terms_DZdRNGLk.mjs","\u0000@astrojs-manifest":"manifest_B1Ke_zX9.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_BLiQceDK.mjs","\u0000@astro-page:src/pages/landing@_@astro":"chunks/landing_DGELvekV.mjs","\u0000@astro-page:src/pages/posts@_@astro":"chunks/posts_0jPFhkmV.mjs","\u0000@astro-page:src/pages/profile@_@astro":"chunks/profile_BMx0c3rq.mjs","\u0000@astro-page:src/pages/registration@_@astro":"chunks/registration_DpbK-KJt.mjs","\u0000@astro-page:src/pages/terms@_@astro":"chunks/terms_CkD9k63Q.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_BebPDNIH.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BxSy-hZW.js","/astro/hoisted.js?q=1":"_astro/hoisted.B6qGq_pT.js","/astro/hoisted.js?q=4":"_astro/hoisted.DLhR_VIS.js","/astro/hoisted.js?q=3":"_astro/hoisted.BxOjuvjd.js","/astro/hoisted.js?q=2":"_astro/hoisted.JNqeSOLa.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg","/_astro/auth.BIQU_Jyj.js","/_astro/hoisted.B6qGq_pT.js","/_astro/hoisted.BxOjuvjd.js","/_astro/hoisted.BxSy-hZW.js","/_astro/hoisted.JNqeSOLa.js"],"buildFormat":"directory"});

export { manifest };
