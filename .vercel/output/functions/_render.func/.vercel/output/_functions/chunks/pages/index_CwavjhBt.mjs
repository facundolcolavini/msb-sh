/* empty css                          */
import { c as createAstro, b as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, k as createTransitionScope } from '../astro_CRwCSytW.mjs';
import 'kleur/colors';
import { $ as $$Layout, f as fetchData } from './_propiedad__BEPChswL.mjs';
/* empty css                                */

const $$Astro$8 = createAstro();
const $$Index$8 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Index$8;
  const title = "Contacto - Mat\xEDas Szpira Bienes Ra\xEDces";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/contacto/index.astro", void 0);

const $$file$8 = "F:/Mis cosas/Programacion/msb-sh/src/pages/contacto/index.astro";
const $$url$8 = "/contacto";

const index$8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$8,
    file: $$file$8,
    url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const getAllSelects = async (queryParams) => {
  const endpoint = "datos.select.buscador";
  try {
    const res = await fetchData(endpoint, queryParams);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching selects data:", error);
    throw error;
  }
};
const getLocations = async (queryParams) => {
  const endpoint = "fichas.ubicaciones";
  try {
    const res = await fetchData(endpoint, queryParams);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching selects data:", error);
    throw error;
  }
};
const getAllSelectsEntrepreneurship = async (queryParams) => {
  const endpoint = "datos.select.buscador.emprendimientos";
  try {
    const res = await fetchData(endpoint, queryParams);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching selects data:", error);
    throw error;
  }
};

const $$Astro$7 = createAstro();
const $$Index$7 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Index$7;
  const title = "Favoritos - Mat\xEDas Szpira Bienes Ra\xEDces ";
  const description = "Tus propiedades favoritas en un solo lugar. Mat\xEDas Szpira Bienes Ra\xEDces te ofrece la posibilidad de guardar tus propiedades favoritas para que puedas verlas cuando quieras. No te pierdas esta oportunidad de invertir en USA con Mat\xEDas Szpira Bienes Ra\xEDces";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article> <h1> Favoritos</h1> </article> ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/favoritos/index.astro", void 0);

const $$file$7 = "F:/Mis cosas/Programacion/msb-sh/src/pages/favoritos/index.astro";
const $$url$7 = "/favoritos";

const index$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$7,
    file: $$file$7,
    url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$6 = createAstro();
const $$Index$6 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index$6;
  const title = "Invertir en USA  |  Inversiones en Estados Unidos";
  const description = "Invertir en USA es una excelente opci\xF3n para diversificar tu portafolio de inversiones. Conoce las mejores opciones para invertir en Estados Unidos.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article> <h1> Invertir en USA</h1> </article> ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/invierta-en-usa/index.astro", void 0);

const $$file$6 = "F:/Mis cosas/Programacion/msb-sh/src/pages/invierta-en-usa/index.astro";
const $$url$6 = "/invierta-en-usa";

const index$6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$6,
    file: $$file$6,
    url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro();
const $$Index$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$5;
  const selects = await getAllSelects();
  const locations = await getLocations();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Resultados de Busqueda", "description": "Busca tu propiedad" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="bg-secondary-bg-msb h-full"> <div class="container mx-auto font-gotham"> ${renderComponent($$result2, "ResultsPage", null, { "selects": selects, "locations": locations, "client:only": true, "client:component-hydration": "only", "client:component-path": "@components/preact/Results/ResultsPage", "client:component-export": "default", "data-astro-transition-persist": createTransitionScope($$result2, "whyxepak") })} </div> </article> ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/resultados-de-busqueda/index.astro", "self");

const $$file$5 = "F:/Mis cosas/Programacion/msb-sh/src/pages/resultados-de-busqueda/index.astro";
const $$url$5 = "/resultados-de-busqueda";

const index$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$5,
    file: $$file$5,
    url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro();
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$4;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/administracion/index.astro", void 0);

const $$file$4 = "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/administracion/index.astro";
const $$url$4 = "/servicios/administracion";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$4,
    file: $$file$4,
    url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro();
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$3;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/tasaciones/index.astro", void 0);

const $$file$3 = "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/tasaciones/index.astro";
const $$url$3 = "/servicios/tasaciones";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$3,
    file: $$file$3,
    url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/index.astro", void 0);

const $$file$2 = "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/index.astro";
const $$url$2 = "/servicios";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "" })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/sumate/index.astro", void 0);

const $$file$1 = "F:/Mis cosas/Programacion/msb-sh/src/pages/sumate/index.astro";
const $$url$1 = "/sumate";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const title = "Tasaciones - Mat\xEDas Szpira Bienes Ra\xEDces ";
  const description = "Tasaciones de propiedades en Buenos Aires, Argentina. Mat\xEDas Szpira Bienes Ra\xEDces. ";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article> <h1> Invertir en USA</h1> </article> ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/tasaciones/index.astro", void 0);

const $$file = "F:/Mis cosas/Programacion/msb-sh/src/pages/tasaciones/index.astro";
const $$url = "/tasaciones";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { getAllSelectsEntrepreneurship as a, getLocations as b, index$7 as c, index$6 as d, index$5 as e, index$4 as f, getAllSelects as g, index$3 as h, index$8 as i, index$2 as j, index$1 as k, index as l };
