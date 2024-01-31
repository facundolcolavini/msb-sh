/* empty css                           */
import { c as createAstro, b as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_KrJcPqck.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${maybeRenderHead()}<div> <h1>404</h1> <p>Page not found</p> <p><a href="{{ site.baseurl }}">Go back to the home page</a></p> </div>`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/404.astro", void 0);

const $$file = "F:/Mis cosas/Programacion/msb-sh/src/pages/404.astro";
const $$url = "/404";

export { $$404 as default, $$file as file, $$url as url };
