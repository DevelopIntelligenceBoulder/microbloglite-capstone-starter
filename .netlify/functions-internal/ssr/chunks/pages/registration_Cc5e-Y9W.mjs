import { e as createAstro, f as createComponent, r as renderTemplate, k as renderComponent, m as maybeRenderHead } from '../astro_BtgUKnRf.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                 */
import { a as $$Footer, $ as $$Page } from './landing_BdE0d8RJ.mjs';

const $$Astro = createAstro();
const $$Registration = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Registration;
  const title = "Register | Bookface";
  return renderTemplate`${renderComponent($$result, "Page", $$Page, { "title": title }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="flex-grow-1 d-flex flex-wrap p-sm-4 m-sm-4 p-md-5 m-md-5 m-2 p-2 gap-5 align-content-end mb-5 justify-content-evenly"> <div class="flex-lg-grow-1 align-self-center p-5 wrapper border border-dark-subtle shadow-lg bg-dark-subtle" style="max-width: 30rem"> <div class="row"> <h2 class="text-center py-3 col-12">Signup Now!</h2> <!--Form start--> <form id="register" class="col-12 flexgrz" action="../landing/"> <div class="input-group mb-4"> <span class="input-group-text"><i class="bi bi-person-fill"></i></span> <input id="name" type="text" class="form-control" placeholder="Name" required> </div> <div class="input-group mb-4"> <span class="input-group-text"><i class="bi bi-person-badge-fill"></i></span> <input id="userName" type="text" class="form-control" placeholder="Username" required> </div> <div class="input-group mb-4"> <span class="input-group-text"><i class="bi bi-at"></i></span> <input id="email" type="email" class="form-control" placeholder="Email" required> </div> <div class="input-group mb-4"> <span class="input-group-text"><i class="bi bi-lock-fill"></i></span> <input id="password" type="password" class="form-control" placeholder="Password" required> </div> <div class="input-group mb-4"> <span class="input-group-text"><i class="bi bi-lock-fill"></i></span> <input id="password-conformation" type="password" class="form-control" placeholder="Confirm Password" required> </div> <div class="d-grid"> <button id="register-btn" class="btn btn-primary w-100 py-2 mb-4" type="submit"> <span id="loginText">Register Account</span> <span id="loadingSpinner" class="spinner-border spinner-border-sm visually-hidden" aria-hidden="true"></span> </button> <p class="text-center text-muted mt-2">
When you click the Register Account button, You agree to our
<a href="../terms/">Terms and Conditions</a>
and <a href="../terms/">Privacy Policy</a> </p> <p class="text-center">
Already Have an account?
<a href="../landing/"> Login Here</a> </p> </div> </form> <!--Form End--> </div> </div> </div> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/jon/Career/Software Development/bookface/src/pages/registration.astro", void 0);

const $$file = "/home/jon/Career/Software Development/bookface/src/pages/registration.astro";
const $$url = "/registration";

export { $$Registration as default, $$file as file, $$url as url };
