import { e as createAstro, f as createComponent, r as renderTemplate, i as renderHead } from '../astro_BtgUKnRf.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><!-- Send User to landing site  --><title>Bookface</title>${renderHead()}</head> <body style="background: #212529;"></body></html>`;
}, "/home/jon/Career/Software Development/bookface/src/pages/index.astro", void 0);

const $$file = "/home/jon/Career/Software Development/bookface/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
