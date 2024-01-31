/* empty css                           */
import { c as createAstro, b as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, g as addAttribute, h as renderSlot, l as defineStyleVars, k as defineScriptVars, n as renderTransition } from '../astro_KrJcPqck.mjs';
import 'kleur/colors';
import clsx from 'clsx';
import { $ as $$Layout, B as Button, H as HeartIcon, f as fetchData } from './_prop__NgkVUyJj.mjs';
import { twMerge } from 'tailwind-merge';
/* empty css                          */
import 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { jsx, jsxs, Fragment } from 'preact/jsx-runtime';
import { useState as useState$1 } from 'preact/compat';
import { map, atom } from 'nanostores';
/* empty css                          */

const $$Astro$b = createAstro();
const $$Index$7 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Index$7;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/index.astro", void 0);

const $$file$7 = "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/index.astro";
const $$url$7 = "/servicios";

const index$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$7,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$a = createAstro();
const $$Index$6 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Index$6;
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/administracion/index.astro", void 0);

const $$file$6 = "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/administracion/index.astro";
const $$url$6 = "/servicios/administracion";

const index$6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$6,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

let navigateOnServerWarned = false;
async function navigate(href, options) {
  {
    if (!navigateOnServerWarned) {
      const warning = new Error(
        "The view transitions client API was called during a server side render. This may be unintentional as the navigate() function is expected to be called in response to user interactions. Please make sure that your usage is correct."
      );
      warning.name = "Warning";
      console.warn(warning);
      navigateOnServerWarned = true;
    }
    return;
  }
}

const $$Astro$9 = createAstro();
const $$ButtonLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$ButtonLink;
  const { href, class: className } = Astro2.props;
  const styles = twMerge(clsx("w-100 h-100", className));
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(styles, "class")}${addAttribute(href, "href")}> ${renderSlot($$result, $$slots["default"])}</a>`;
}, "F:/Mis cosas/Programacion/msb-sh/src/components/ButtonLink.astro", void 0);

const $$Astro$8 = createAstro();
const $$HeroContainer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$HeroContainer;
  const { img } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative bg-no-repeat z-0 bg-cover  h-[100vh] md:h-[70vh]  w-full max-w-[100vw]"> <img class="absolute h-full w-full animate-fadeIn object-cover object-center animate-duration-1000 animate-ease-in-out z-0"${addAttribute(img, "src")} alt="Propiedades cover"> <div class="absolute inset-0 m-auto w-full h-full flex justify-center flex-col items-center bg-black bg-opacity-30"> ${renderSlot($$result, $$slots["default"])} </div> </section>`;
}, "F:/Mis cosas/Programacion/msb-sh/src/components/HeroContainer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$7 = createAstro();
const $$SliderA = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SliderA;
  const {
    colsNr,
    height = 90,
    width = 100,
    classSlide
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{ colsNr }]);
  return renderTemplate(_a || (_a = __template(["", "<div", " data-astro-cid-l7g75nok", '> <div class="wrapper flex justify-center items-center" data-astro-cid-l7g75nok', '>  <button id="left" class="btn btn-left rounded-full bg-gray-100 hover:bg-gray-300 text-black p-2 cursor-pointer" aria-label="Previous slide" data-astro-cid-l7g75nok', ">\n&#10094;\n</button> <ul", " data-astro-cid-l7g75nok", "> ", ' </ul> <button id="right" class="btn btn-right rounded-full bg-gray-100 hover:bg-gray-300 text-black p-2 cursor-pointer" aria-label="Next slide" data-astro-cid-l7g75nok', '>\n&#10095;\n</button> </div> </div>  <script type="module">', '\n  import { initializeSliders } from "/src/scripts/slider.js";\n  initializeSliders(`.${classSlide}`);\n  document.addEventListener("astro:page-load", (event) => {\n    initializeSliders(`.${classSlide}`);\n  });\n<\/script>'], ["", "<div", " data-astro-cid-l7g75nok", '> <div class="wrapper flex justify-center items-center" data-astro-cid-l7g75nok', '>  <button id="left" class="btn btn-left rounded-full bg-gray-100 hover:bg-gray-300 text-black p-2 cursor-pointer" aria-label="Previous slide" data-astro-cid-l7g75nok', ">\n&#10094;\n</button> <ul", " data-astro-cid-l7g75nok", "> ", ' </ul> <button id="right" class="btn btn-right rounded-full bg-gray-100 hover:bg-gray-300 text-black p-2 cursor-pointer" aria-label="Next slide" data-astro-cid-l7g75nok', '>\n&#10095;\n</button> </div> </div>  <script type="module">', '\n  import { initializeSliders } from "/src/scripts/slider.js";\n  initializeSliders(\\`.\\${classSlide}\\`);\n  document.addEventListener("astro:page-load", (event) => {\n    initializeSliders(\\`.\\${classSlide}\\`);\n  });\n<\/script>'])), maybeRenderHead(), addAttribute(`w-full relative  h-[${height}vh] max-w-[${width}vw] flex justify-center items-center ${classSlide}`, "class"), addAttribute($$definedVars, "style"), addAttribute($$definedVars, "style"), addAttribute($$definedVars, "style"), addAttribute("carousel", "class"), addAttribute($$definedVars, "style"), renderSlot($$result, $$slots["default"]), addAttribute($$definedVars, "style"), defineScriptVars({ classSlide }));
}, "F:/Mis cosas/Programacion/msb-sh/src/components/SliderA.astro", void 0);

const $$Astro$6 = createAstro();
const $$TitleSections = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$TitleSections;
  const { class: className } = Astro2.props;
  const styles = twMerge(clsx("text-white text-4xl md:text-5xl lg:text-6xl font-base font-semibold font-cormorant text-pretty lg:drop-shadow-2xl text-center", className));
  return renderTemplate`${maybeRenderHead()}<h1${addAttribute([styles], "class:list")}> ${renderSlot($$result, $$slots["default"])} </h1>`;
}, "F:/Mis cosas/Programacion/msb-sh/src/components/TitleSections.astro", void 0);

const BannerSlider = ({
  slides,
  sliderTime = 5e3,
  children
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, sliderTime);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, nextSlide, sliderTime]);
  const currentSlide = slides[currentIndex];
  return jsx("section", {
    class: "relative bg-no-repeat z-0 bg-cover h-[100vh] md:h-[70vh] w-full max-w-[100vw]   group",
    children: jsxs("div", {
      className: "w-full h-full bg-center bg-cover duration-500 animate-fade absolute top-0 left-0 z-0",
      style: {
        backgroundImage: `url(${currentSlide})`,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        loading: "lazy"
      },
      children: [jsx("div", {
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          // Adjust the opacity here (0.5 is 50%)
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }
      }), children]
    })
  });
};

const HomeLocation = ({ addStyles, w = "16", h = "16" }) => {
  const styles = twMerge(clsx("h-100 w-100", addStyles));
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { id: "home-location", className: styles, alt: "home location icon", src: "/images/home-location.png", width: w, height: h }) });
};

const HomeMortgageIcon = ({ addStyles, w = "16", h = "16" }) => {
  twMerge(clsx("h-100 w-100", addStyles));
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { id: "home-mortgage", className: addStyles, alt: "home mortgage icon", src: "/images/home-mortgage.png", width: w, height: h }) });
};

const PaperTipsIcon = ({ addStyles, w = "16", h = "16" }) => {
  const styles = twMerge(clsx("h-100 w-100", addStyles));
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { id: "paper-tips", alt: "paper tips icon", className: styles, src: "/images/paper-tips.png", width: w, height: h }) });
};

const capitalize = (str) => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};
function formatOptions(options) {
  return options.filter((option) => {
    const description = "description" in option ? option.description : option?.descripcion;
    const value = "value" in option ? option.value : "val" in option ? option.val : "";
    return !(description === "INDISTINTO" && value === "All" || description === "INDISTINTO" && "val" in option && option.val === "" || description === "TODAS" && value === "All");
  }).map((option) => {
    let description;
    let value;
    if ("description" in option) {
      description = option.description;
      value = option.value || "";
    } else if ("val" in option) {
      description = option.descripcion;
      value = option.val;
    } else if ("id" in option) {
      description = option.descripcion;
      value = option.id;
    } else {
      description = option.descripcion;
      value = option.value || "";
    }
    return {
      label: capitalize(description.toLowerCase()),
      value
    };
  });
}

const filterItems = map({});
const searchParamsStore = atom("");
const addFilterValue = (filter) => {
  filterItems.set({ ...filterItems.get(), ...filter });
  const currentSearchParams = new URLSearchParams(searchParamsStore.get());
  Object.keys(filter).forEach((key) => {
    const paramValue = filter[key];
    if (paramValue && paramValue.value !== null && paramValue.value !== void 0 && paramValue.value !== "") {
      currentSearchParams.set(key, paramValue.value);
    } else {
      currentSearchParams.delete(key);
    }
  });
  searchParamsStore.set(currentSearchParams.toString().replace(/&?[^=&]+=All/g, ""));
};
const resetFilter = async (filter) => {
  filterItems.set(filter);
  const currentSearchParams = new URLSearchParams(searchParamsStore.get());
  for (const key of currentSearchParams.keys()) {
    if (!(key in filter)) {
      currentSearchParams.delete(key);
    }
  }
  Object.keys(filter).forEach((key) => {
    const paramValue = filter[key];
    if (paramValue && paramValue.value !== null && paramValue.value !== void 0 && paramValue.value !== "") {
      currentSearchParams.set(key, paramValue.value);
    } else {
      currentSearchParams.delete(key);
    }
  });
  await searchParamsStore.set(currentSearchParams.toString().replace(/&?[^=&]+=All/g, ""));
};

const useSearch = (selects, defaultValues) => {
  const [filtersSelected, setFiltersSelected] = useState(defaultValues);
  const [filterParams, setFilterParams] = useState("");
  const fParams = (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      const paramValue = filters[key];
      if (typeof paramValue === "object" && paramValue !== null) {
        params.set(key, paramValue.value);
      } else {
        params.delete(key);
      }
    });
    setFilterParams(params.toString().replace(/&?[^=&]+=All/g, ""));
  };
  useEffect(() => {
    fParams(filtersSelected);
  }, [filtersSelected]);
  useEffect(() => {
    addFilterValue(defaultValues);
  }, []);
  const handleSelect = (e) => {
    const { id, value } = e.target;
    const newFiltersSelected = { ...filtersSelected };
    const newFilter = selects[id].find((item) => item.value === value);
    if (newFilter) {
      newFiltersSelected[id] = newFilter;
    } else {
      delete newFiltersSelected[id];
    }
    setFiltersSelected(newFiltersSelected);
    addFilterValue({ [id]: newFiltersSelected[id] });
  };
  const handleCheckboxChange = (id, value) => {
    setFiltersSelected((prevFilters) => ({
      ...prevFilters,
      [id]: { value, label: id }
    }));
    addFilterValue({ [id]: { value, label: id } });
  };
  const handleOnChange = (e) => {
    if (e.target instanceof HTMLInputElement) {
      const { id, value } = e.target;
      setFiltersSelected((prevFilters) => ({
        ...prevFilters,
        [id]: { value, label: id }
      }));
      addFilterValue({ [id]: { value, label: id } });
    }
  };
  const handleSubmit = (e) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const newParams = { ...filtersSelected };
    Object.keys(newParams).forEach((key) => {
      const paramValue = newParams[key];
      if (typeof paramValue === "string" && paramValue !== "") {
        params.set(key, paramValue);
      } else {
        params.delete(key);
      }
    });
  };
  const resetSelect = (defaultValues2) => {
    resetFilter(defaultValues2);
    setFiltersSelected(defaultValues2);
  };
  return {
    filtersSelected,
    searchParams: filterParams,
    handleSelect,
    handleSubmit,
    handleOnChange,
    fParams,
    resetSelect,
    handleCheckboxChange
  };
};

const SearchIcon = () => {
  return /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", class: "icon icon-tabler icon-tabler-search", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
    /* @__PURE__ */ jsx("path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" }),
    /* @__PURE__ */ jsx("path", { d: "M21 21l-6 -6" })
  ] });
};

const InputField = ({
  id,
  label,
  type = "text",
  placeholder = "",
  errorMessage = "",
  successMessage = "",
  value = "",
  addStyles,
  onChange,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const labelPositionY = "top-1";
  const labelTransitionClasses = "transform -translate-y-5 scale-75";
  const labelClasses = clsx(
    "absolute left-3 transition-all duration-300 pointer-events-none h-full ",
    {
      "text-primary-text-msb text-sm": !isFocused && !hasValue,
      [`text-primary-msb text-xs ${labelTransitionClasses}`]: isFocused || hasValue
    },
    labelPositionY
  );
  const inputContainerClasses = twMerge(
    "relative w-full  h-full rounded-md transition-all duration-200 ",
    errorMessage ? "border-red-500" : "border-gray-300",
    isFocused ? "ring-2 ring-primary-msb" : "ring-0",
    addStyles
  );
  const inputClasses = clsx(
    "w-full h-full rounded-md transition-all duration-200 focus:outline-none focus:ring-0",
    {
      "border-2 ": isFocused || hasValue,
      // Asegura que el borde sea del grosor deseado
      "border-gray-300": !errorMessage && !successMessage && !isFocused,
      "border-red-500": errorMessage,
      "border-green-500": successMessage,
      "ring-0  ": true,
      // Asegura que no haya anillo aplicado que cause separación
      "px-3 py-2": true
      // Ajusta el padding si es necesario
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: inputContainerClasses, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: id, className: labelClasses, children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id,
        type,
        placeholder,
        className: inputClasses,
        value,
        onInput: onChange,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        ...inputProps
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "absolute right-3 bottom-1 text-sm", children: [
      errorMessage && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errorMessage }),
      successMessage && /* @__PURE__ */ jsx("span", { className: "text-green-500", children: successMessage })
    ] })
  ] });
};

const SelectField = ({ opts, id, onChange, defaultOption }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption ? defaultOption.label : "");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    toggleDropdown();
    onChange({ target: { id, value: option.value } });
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (defaultOption && defaultOption.label !== selectedOption) {
      setSelectedOption(defaultOption.label);
    }
  }, [defaultOption, selectedOption]);
  return /* @__PURE__ */ jsxs("div", { ref: dropdownRef, className: "relative w-full h-full transition-all ", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        id: String(id),
        onClick: toggleDropdown,
        className: "w-full px-4 py-2 border h-full bg-white text-gray-700 rounded-md border-primary-text-msb flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-primary-text-msb focus:border-primary-text-msb font-semibold ",
        type: "button",
        children: [
          selectedOption,
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`,
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 20 20",
              children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", fill: "currentColor" })
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "absolute w-full z-10 mt-1 bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-2 overflow-auto font-semibold animate-fade-down animate-duration-300 scrollbar scrollbar-thumb-color scrollbar-track-color", children: opts.map((option, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-fixed ",
        children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleOptionClick(option),
            className: "text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ",
            children: option.label
          },
          index
        )
      }
    )) })
  ] });
};

const SearchDebounce = ({ filterOptsLocations }) => {
  const filters = filterItems.get();
  const params = searchParamsStore.get();
  const [searchTerm, setSearchTerm] = useState(filters.in_iub);
  const [listOpts, setOpts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const listContainerRef = useRef(null);
  const debounce = (func, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = window.setTimeout(() => func.apply(this, args), delay);
    };
  };
  const handleSearchWithDebounce = debounce((value) => {
    const filteredOpts = filterOptsLocations.in_iub.filter(
      (location) => location.label.toLowerCase().includes(value.toLowerCase())
    );
    setOpts(filteredOpts);
    setShowResults(true);
  }, 300);
  useEffect(() => {
    return () => setOpts([]);
  }, []);
  const handleInputChange = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    setSearchTerm({ label: value, value: id });
    handleSearchWithDebounce(value);
  };
  useEffect(() => {
    if (listContainerRef.current) {
      const maxHeight = window.innerHeight - listContainerRef.current.getBoundingClientRect().top - 100;
      listContainerRef.current.style.maxHeight = `${maxHeight}px`;
    }
  }, [listOpts]);
  useEffect(() => {
    if (filters.in_iub?.value === "" && filters.in_iub?.label === "") {
      setSearchTerm({ label: "", value: "" });
    }
    const currentUrl = window.location.pathname;
    const newUrl = `${currentUrl}?${searchParamsStore.get()}`;
    window.history.pushState({}, "", newUrl);
  }, [params]);
  const handleOptionSelect = (option) => {
    addFilterValue({ in_iub: { value: option.value, label: option.label } });
    setSearchTerm(option);
    setShowResults(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: `sticky z-10 top-0  w-full`, children: [
    /* @__PURE__ */ jsx(
      InputField,
      {
        id: "in_iub",
        type: "search",
        value: searchTerm?.label,
        className: "border-2 border-primary-msb focus:border-b-1 rounded-md px-4 flex w-full h-full py-2 focus:outline-none focus:ring-0",
        onChange: handleInputChange,
        autoComplete: "off",
        placeholder: "Buscar por barrio o localidad"
      }
    ),
    showResults && /* @__PURE__ */ jsx(
      "ul",
      {
        ref: listContainerRef,
        className: `absolute z-20 top-12 bg-white w-full border border-gray-300 rounded-md shadow-md overflow-auto scrollbar scrollbar-thumb-color scrollbar-track-color`,
        children: listOpts.length > 0 ? listOpts.map((location) => /* @__PURE__ */ jsx(
          "li",
          {
            className: `py-2 px-4 relative z-10 hover:bg-gray-200 cursor-pointer`,
            onClick: (e) => handleOptionSelect(location),
            children: location.label
          },
          `${location.label}-${location.value}`
        )) : /* @__PURE__ */ jsx("li", { className: "py-2 px-4 text-gray-500", children: "No hay resultados" })
      }
    )
  ] });
};

const SearchHome = ({ selects, locations }) => {
  searchParamsStore.get();
  let tipo_propiedad = [];
  let tipo_operacion = [];
  let in_iub = [];
  tipo_propiedad = formatOptions(selects?.tipo);
  tipo_operacion = formatOptions(selects.operacion);
  in_iub = formatOptions(locations.ubicaciones);
  const { handleSelect, resetSelect, handleOnChange, filtersSelected, searchParams } = useSearch({ tipo_propiedad, tipo_operacion, in_iub }, {
    tipo_propiedad: { value: "All", label: "Tipo de propiedad" },
    tipo_operacion: { value: "V", label: "Venta" },
    in_iub: { value: "", label: "" }
  });
  useEffect(() => {
    resetSelect({
      tipo_propiedad: { value: "All", label: "Tipo de propiedad" },
      tipo_operacion: { value: "V", label: "Venta" },
      in_iub: { value: "", label: "" }
    });
  }, []);
  const send = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate();
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "container z-1 ", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-0 px-3 ", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-start-1 lg:col-end-4 md:grid-col-start-1 md:grid-col-end-2 flex gap-4", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        onClick: handleSelect,
        value: "V",
        addStyles: `sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === "V" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
        id: "tipo_operacion",
        children: "Vender"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-start-4 lg:col-end-7  md:grid-col-start-2 md:grid-col-end-4 flex gap-4", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        onClick: handleSelect,
        value: "A",
        addStyles: ` sm:text-sm md:text-md lg:text-lg w-full ${filtersSelected?.tipo_operacion?.value === "A" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
        id: "tipo_operacion",
        children: "Alquilar"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-start-7 lg:col-end-10  md:grid-col-start-1 md:grid-col-end-2 flex gap-4", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        onClick: handleSelect,
        value: "M",
        addStyles: `sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === "M" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
        id: "tipo_operacion",
        children: "Venta y Alquiler"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-start-10 lg:col-end-13 flex   md:grid-col-start-2 md:grid-col-end-4 gap-4", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        onClick: handleSelect,
        value: "T",
        addStyles: `sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === "T" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
        id: "tipo_operacion",
        children: "Alquiler Temporiario"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-start-1  lg:col-end-4 flex  h-full ", children: /* @__PURE__ */ jsx(SelectField, { id: "tipo_propiedad", onChange: handleSelect, defaultOption: filtersSelected.tipo_propiedad, opts: tipo_propiedad }) }),
    /* @__PURE__ */ jsxs("div", { className: "md:col-1 lg:col-start-4  lg:col-end-11 md:col-start-2 md:col-end-5 flex gap-4  w-full flex-grow ", children: [
      /* @__PURE__ */ jsx(SearchDebounce, { filterOptsLocations: { in_iub } }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex lg:hidden gap-4", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "primary",
          onClick: send,
          className: "lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white",
          addStyles: "sm:text-sm md:text-md lg:text-lg border-2 border-gray-300 rounded-md  flex w-full justify-center items-center",
          children: "BUSCAR"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: " md:hidden lg:flex lg:col-start-11  lg:col-end-13 flex  gap-4", children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "primary",
        onClick: send,
        className: "lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white",
        addStyles: "w-full sm:text-sm md:text-md lg:text-lg flex lg:flex-grow justify-center items-center gap-2",
        children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SearchIcon, {}) }),
          "BUSCAR"
        ]
      }
    ) })
  ] }) }) });
};

const WhatsAppIcon = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { id: "bath", alt: "whatsapp icon", src: "/images/whatsapp.png", width: "24", height: "24" }) });
};

const PaperLocationIcon = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { id: "bath", alt: "location icon", src: "/images/paper-location.png", width: "24", height: "24" }) });
};

const CardBranch = ({ href, suc_name, suc_loc, suc_img, suc_dir, suc_phone, addStyles }) => {
  const styles = twMerge(clsx(" rounded-lg  mx-auto w-full overflow-hidden shadow-lg ", addStyles));
  return /* @__PURE__ */ jsx("a", { href, target: "_blank", className: styles, children: /* @__PURE__ */ jsxs("div", { class: "bg-secondary-msb", children: [
    /* @__PURE__ */ jsx("img", { className: "w-full object-cover", src: suc_img, alt: suc_name }),
    /* @__PURE__ */ jsxs("div", { className: "p-5 border-[#A4A4A4] border-r-2 border-l-2 border-b-2 rounded-b-lg ", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xl font-medium text-nowrap capitalize", children: /* @__PURE__ */ jsx("span", { className: "font-extrabold capitalize", children: suc_name }) }),
      /* @__PURE__ */ jsx("p", { className: "text-bg-2-msb  text-md font-bold", children: suc_loc }),
      /* @__PURE__ */ jsxs("div", { class: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "flex items-center text-sm font-semibold text-gray-700 mr-2 mb-1 ", children: suc_dir }),
          /* @__PURE__ */ jsx("span", { className: "flex items-center text-xs font-semibold text-gray-700 mr-2 mb-2 gap-1", children: suc_phone })
        ] }),
        /* @__PURE__ */ jsxs("div", { class: "flex items-center justify-center gap-1 ", children: [
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(PaperLocationIcon, {}) }),
          /* @__PURE__ */ jsx(WhatsAppIcon, {})
        ] })
      ] })
    ] })
  ] }) });
};

const colorEstLabel = (est) => {
  const estLabel = est.replace("&oacute;", "ó").toUpperCase();
  switch (estLabel) {
    case "EN CONSTRUCCIÓN":
      return "bg-tertiary-bg-hover-msb hover:bg-bg-3-hover-msb";
    case "EN POZO":
      return "bg-secondary-bg-hover-msb hover:bg-bg-1-hover-msb";
    case "TERMINADO":
      return "bg-tertiary-bg-msb  hover:bg-tertiary-hover-msb ";
    default:
      return "bg-secondary-bg-hover-msb";
  }
};
const CardEntrepreneurship = ({ cardData, addStyles, href }) => {
  const [colorEst, setColorEst] = useState$1(colorEstLabel(cardData.ed_est));
  const styles = twMerge(clsx("rounded overflow-hidden shadow-lg h-100", addStyles));
  colorEstLabel(cardData.ed_est);
  return /* @__PURE__ */ jsxs("a", { href, className: styles, children: [
    /* @__PURE__ */ jsx("img", { className: "w-full h-[248px]  text-balance object-cover", width: 408, height: 248, src: cardData.img_princ, alt: "Imagen del interior de la vivienda" }),
    /* @__PURE__ */ jsxs("div", { class: "bg-secondary-msb  min-h-fit   p-6 ", children: [
      /* @__PURE__ */ jsxs("div", { className: "", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xl mb-2 font-medium text-nowrap capitalize", children: /* @__PURE__ */ jsx("span", { className: "font-extrabold capitalize", children: cardData.ed_nom }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-primary-text-msb font-thin flex gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary-text-msb font-bold", children: "Posesión:" }),
          cardData.ed_pos || "No disponible"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between self-end pt-2", children: [
        /* @__PURE__ */ jsx("button", { className: `${colorEst} rounded-full px-3 py-2  hover:bg-bg-1-msb text-white font-bold  text-sm uppercase`, children: cardData?.ed_est.replace("&oacute;", "ó") }),
        /* @__PURE__ */ jsx("button", { className: "hover:bg-primary-msb", children: /* @__PURE__ */ jsx(HeartIcon, {}) })
      ] })
    ] })
  ] });
};

const BathIcon = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { id: "bath", alt: "bath icon", src: "/images/bath.png", width: "16", height: "16" }) });
};

const DoorOpen = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { id: "door-open", alt: "door open icon", src: "/images/door-open.png", width: "16", height: "16" }) });
};

const RuleIcon = () => {
  return /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", class: "icon icon-tabler icon-tabler-ruler-2", width: "16", height: "16", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
    /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
    /* @__PURE__ */ jsx("path", { d: "M17 3l4 4l-14 14l-4 -4z" }),
    /* @__PURE__ */ jsx("path", { d: "M16 7l-1.5 -1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M13 10l-1.5 -1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M10 13l-1.5 -1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M7 16l-1.5 -1.5" })
  ] });
};

const SquareMeterIcon = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("img", { id: "square-meter", alt: "square meter icon", src: "/images/square-meter.png", width: "16", height: "16" }) });
};

const CardProperty = ({ cardData, addStyles, href, key }) => {
  const styles = twMerge(clsx("rounded overflow-hidden shadow-lg h-100 animate-fade", addStyles));
  return /* @__PURE__ */ jsxs("a", { href, className: styles, children: [
    /* @__PURE__ */ jsx("img", { className: "w-full h-[248px]  text-balance object-cover", loading: "eager", width: 408, height: 248, src: cardData.img_princ, alt: "Imagen del interior de la vivienda" }),
    /* @__PURE__ */ jsxs("div", { class: "bg-secondary-msb  min-h-fit p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xl  font-medium text-nowrap", children: [
          /* @__PURE__ */ jsx("span", { className: "font-extrabold ", children: cardData.precio }),
          " | ",
          cardData.in_cal,
          " ",
          cardData.in_nro
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-bg-2-msb font-bold", children: cardData.in_loc })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center m-0 pt-2", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center text-sm font-semibold text-gray-700 mr-2 mb-2 gap-1", children: [
          /* @__PURE__ */ jsx(RuleIcon, {}),
          " 51mt2"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center text-sm font-semibold text-gray-700 mr-2 mb-2 gap-1", children: [
          /* @__PURE__ */ jsx(SquareMeterIcon, {}),
          " 46mt2"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center text-sm font-semibold text-gray-700 mr-2 mb-2 gap-1", children: [
          /* @__PURE__ */ jsx(DoorOpen, {}),
          " ",
          cardData.ti_dor
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center text-sm font-semibold text-gray-700 mr-2 mb-2 gap-1", children: [
          /* @__PURE__ */ jsx(BathIcon, {}),
          `${cardData?.in_ban} baño`,
          " "
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between self-end", children: [
        /* @__PURE__ */ jsx("button", { className: "bg-bg-2-msb rounded-full px-3 py-2  hover:bg-bg-1-msb text-white font-bold   uppercase", children: cardData.operacion }),
        /* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsx(HeartIcon, {}) })
      ] })
    ] })
  ] }, key);
};

const getAllSelects = async () => {
  const endpoint = "datos.select.buscador";
  try {
    const res = await fetchData(endpoint);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching selects data:", error);
    throw error;
  }
};
const getLocations = async () => {
  const endpoint = "fichas.ubicaciones";
  try {
    const res = await fetchData(endpoint);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching selects data:", error);
    throw error;
  }
};

const $$Astro$5 = createAstro();
const $$Index$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$5;
  const { resultado } = await fetchData(
    "fichas.destacadas"
  );
  const { resultado: resEmprendimientos } = await fetchData(
    "resultados.emprendimientos"
  );
  const { emprendimiento: entrepreneurship, img } = resEmprendimientos;
  const { fichas } = resultado;
  const cardData = fichas;
  const titlePage = "Home";
  const description = "Propiedades en alquiler y venta - Mat\xEDas Szpira Bienes Ra\xEDces";
  const selects = await getAllSelects();
  const locations = await getLocations();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": titlePage, ",": true, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroContainer", $$HeroContainer, { "img": "/images/background-hero.webp" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="absolute inset-0 flex flex-col justify-between items-center w-100 mx-auto container"> <div class="bg-[#D9D9D9] bg-opacity-40 py-6 min-w-full mt-8"> <h1${addAttribute({ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50);" }, "style")} class="text-white text-4xl md:text-5xl lg:text-6xl font-base font-semibold font-cormorant text-pretty lg:drop-shadow-2xl text-center">
BUENA <span class="text-primary-text-msb"> GENTE</span>. BUENAS <span class="text-primary-text-msb">RAÍCES</span>. BUENOS <span class="text-primary-text-msb">NEGOCIOS</span> </h1> </div> <!-- Agrega aquí tu buscador --> ${renderComponent($$result3, "SearchHome", SearchHome, { "client:load": true, "selects": selects, "locations": locations, "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/preact/Search/SearchHome", "client:component-export": "default" })} <div></div> </div> ` })} <section class="bg-secondary-bg-msb"> <div class="container mx-auto px-3 md:px-0 lg:px-0"> <div class="grid lg:grid-cols-3 ms:px-3 gap-2 py-20"> ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/sumate" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": "rounded-lg shadow-lg w-full h-full" }, { "default": ($$result4) => renderTemplate` <div class="inline-flex lg:justify-center items-center w-full gap-3 py-5"> <div class="rounded-full p-2 bg-[#D9D9D9]"> ${renderComponent($$result4, "HomeMortgageIcon", HomeMortgageIcon, { "addStyles": "object-contain bg-gradient-primary-msb ", "w": "42", "h": "40" })} </div> <div class="flex flex-col gap-2 items-stretch"> <h1 class="text-base font-semibold text-primary-text-msb text-left">
¿Qué necesito para comprar?
</h1> <p class="text-primary-text-msb text-left font-normal">
Conocé los requisitos para comprar una propiedad
</p> </div> </div> ` })} ` })} ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/sumate" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": "rounded-lg shadow-lg w-full h-full" }, { "default": ($$result4) => renderTemplate` <div class="inline-flex lg:justify-center items-center w-full gap-3 py-5"> <div class="rounded-full p-2 bg-[#D9D9D9]"> ${renderComponent($$result4, "HomeLocation", HomeLocation, { "addStyles": "object-contain bg-gradient-primary-msb ", "w": "42", "h": "40" })} </div> <div class="flex flex-col gap-2 items-stretch"> <h1 class="text-base font-semibold text-primary-text-msb text-left">
Guía de Barrios
</h1> <p class="text-primary-text-msb text-left font-normal">
Conocé los barrios y elegí tu zona ideal
</p> </div> </div> ` })} ` })} ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/sumate" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": "rounded-lg shadow-lg w-full h-full" }, { "default": ($$result4) => renderTemplate` <div class="inline-flex lg:justify-center items-center w-full gap-3 py-5"> <div class="rounded-full p-2 bg-[#D9D9D9]"> ${renderComponent($$result4, "PaperTipsIcon", PaperTipsIcon, { "addStyles": "object-contain bg-gradient-primary-msb ", "w": "42", "h": "40" })} </div> <div class="flex flex-col gap-2 items-stretch"> <h1 class="text-base font-semibold text-primary-text-msb text-left">
Tips de Mudanza
</h1> <p class="text-primary-text-msb text-left font-normal">
Guía para mudarte sin estrés, de forma rápida y eficiente
</p> </div> </div> ` })} ` })} </div> </div> </section> <section class="bg-primary-msb"> <div class="container mx-auto px-3 md:px-0 lg:px-0 py-20"> ${renderComponent($$result2, "TitleSections", $$TitleSections, { "class": "text-white text-6xl md:text-7xl lg:text-8xl font-base font-medium font-cormorant text-pretty text-center" }, { "default": ($$result3) => renderTemplate`
Propiedades Destacadas
` })} <p class="text-white text-center text-md md:text-lg lg:text-2xl font-light py-5">
La mejor selección de inmuebles en las zonas que estás buscando.
</p> ${renderComponent($$result2, "SliderA", $$SliderA, { "colsNr": 3, "height": 10, "width": 10, "classSlide": "slider1" }, { "default": ($$result3) => renderTemplate`${cardData.map((card) => renderTemplate`${renderComponent($$result3, "CardProperty", CardProperty, { "key": "unique-key", "href": "/propiedades", "addStyles": "w-full h-full card", "cardData": card })}`)}` })} </div> </section> <section class="bg-secondary-bg-msb px-3 md:px-0 lg:px-0 py-20"> <div class="container mx-auto grid grid-col lg:grid-cols-2 justify-center place-content-center rounded-md border-primary-border-msb border-2 h-100 py-20"> <div class="flex justify-end gap-10 flex-col self-center lg:px-20 p-6"> ${renderComponent($$result2, "TitleSections", $$TitleSections, { "class": "text-center md:text-centter lg:text-start text-secondary-text-msb text-4xl" }, { "default": ($$result3) => renderTemplate`
Nuestros Emprendimientos
` })} <p class="font-medium text-secondary-text-msb text-center md:text-center lg:text-start text-lg">
Invertí en bienes raíces, nosotros te asesoramos
</p> ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/emprendimientos", "class": "flex justify-center md:justify-center w-100 p-0 lg:w-fit lg:justify-start text-pretty" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "outline", "addStyles": "bg-secondary-bg-msb px-0 md:px-0 lg:px-20 text-lg rounded-lg shadow-lg text-nowrap  w-full h-full" }, { "default": ($$result4) => renderTemplate`
Me interesa
` })} ` })} </div> <div class="grid space-y-4"> <div class="grid grid-cols-1 w-full md:grid-cols-3 lg:grid-cols-3 justify-between gap-4 p-6 lg:px-2 md:px-6"> ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/emprendimientos/pozo" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "primary", "addStyles": "rounded-md  shadow-lg w-full h-full py-3 active:bg-primary-bg-msb text-pretty" }, { "default": ($$result4) => renderTemplate`
En Pozo
` })} ` })} ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/emprendimientos/construcci\xF3n" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "primary", "addStyles": "rounded-md shadow-lg  w-full h-full text-pretty" }, { "default": ($$result4) => renderTemplate`
En Construcción
` })} ` })} ${renderComponent($$result2, "ButtonLink", $$ButtonLink, { "href": "/emprendimientos/terminado" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", Button, { "variant": "primary", "addStyles": "rounded-md shadow-lg w-full h-full  " }, { "default": ($$result4) => renderTemplate`
Terminado
` })} ` })} </div> <!-- Slider de emprendimientos --> ${renderComponent($$result2, "SliderA", $$SliderA, { "colsNr": 2, "height": 10, "width": 10, "classSlide": "slider2" }, { "default": ($$result3) => renderTemplate`${entrepreneurship.map(
    ({ ed_nom, ed_pos, img_princ, ed_est }) => renderTemplate`${renderComponent($$result3, "CardEntrepreneurship", CardEntrepreneurship, { "href": "/emprendimientos", "addStyles": "card", "cardData": {
      ed_nom,
      ed_pos,
      img_princ,
      ed_est
    } })}`
  )}` })} </div> </div> </section> <section class="bg-[#8D8777] py-10"${addAttribute(renderTransition($$result2, "4tazbrww", "fade", ""), "data-astro-transition-scope")}> ${renderComponent($$result2, "HeroBannerSlider", BannerSlider, { "slides": img[3], "sliderTime": 8e3, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@components/preact/BannerSlider", "client:component-export": "default" }, { "default": ($$result3) => renderTemplate` <div class="grid align-end h-full items-center justify-center lg:justify-end self-end place-content-center text-center lg:text-start container mx-auto relative z-1"> ${renderComponent($$result3, "TitleSections", $$TitleSections, { "class": "text-white text-6xl md:text-7xl lg:text-8xl font-base font-medium font-cormorant text-pretty md:text-center lg:text-start" }, { "default": ($$result4) => renderTemplate`
Tasaciones
` })} <p class="text-white text-lg md:text-xl lg:text-2xl font-normal font-open-sans self-start">
Tu descripción o contenido del párrafo aquí.
</p> ${renderComponent($$result3, "ButtonLink", $$ButtonLink, { "href": "/tasaciones", "class": "flex justify-center lg:items-end p-0 mt-4 lg:w-fit lg:self-start" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Button", Button, { "variant": "outline", "addStyles": "bg-secondary-bg-msb px-0 md:px-0 lg:px-20 text-lg rounded-lg shadow-lg text-nowrap  w-full h-full" }, { "default": ($$result5) => renderTemplate`
Tasar
` })} ` })} </div> ` })} </section> <section class="bg-secondary-bg-msb py-20"${addAttribute(renderTransition($$result2, "g4d53fvf", "fade", ""), "data-astro-transition-scope")}> <div> ${renderComponent($$result2, "TitleSections", $$TitleSections, { "class": "text-primary-text-msb text-6xl md:text-7xl lg:text-8xl font-base font-medium font-cormorant text-pretty text-center" }, { "default": ($$result3) => renderTemplate`
Nuestras Sucursales
` })} <p class="text-secondary-text-msb text-center text-md md:text-lg lg:text-2xl font-light py-5">
Elegí tu sucursal más cercana
</p> </div> <div class="grid grid-cols justify-center md:grid-cols-2 gap-5 lg:gap-2 lg:grid-cols-4 container mx-auto"> ${renderComponent($$result2, "CardBranch", CardBranch, { "href": "https://maps.app.goo.gl/tctkkMnT39ZuecvY6", "suc_name": "Belgrano", "suc_loc": "Capital Federal", "suc_img": "/images/sucursal-belgrano.webp", "suc_dir": "Av. Juramento 1475, Piso 3 Of. 4", "suc_phone": "112461-0859", "addStyles": "hover:border-primary-border-msb hover:border-4 h-100 transition duration-500 ease-in-out easy-out transform hover:-translate-y-1" })} ${renderComponent($$result2, "CardBranch", CardBranch, { "href": "https://maps.app.goo.gl/PdCXedJ3XriKhkeD6", "suc_name": "Castelar", "suc_loc": "Casa Central", "suc_img": "/images/sucursal-castelar.webp", "suc_dir": "Avellaneda 976, Castelar", "suc_phone": "4627-8034 / 7548-6846", "addStyles": "hover:border-primary-border-msb hover:border-4 h-100 transition duration-500 ease-in-out easy-out transform hover:-translate-y-1" })} ${renderComponent($$result2, "CardBranch", CardBranch, { "href": "https://maps.app.goo.gl/Fo5cNCeaXJSRbkEz7", "suc_name": "Fco. \xC1lvarez", "suc_loc": "Colectora Sur Acceso Oeste", "suc_img": "/images/sucursal-fco-alvarez.webp", "suc_dir": "K41 Piso 3, Of. 327", "suc_phone": "2130-9600 / 112364-4767", "addStyles": "hover:border-primary-border-msb hover:border-4 h-100 transition duration-500 ease-in-out easy-out transform hover:-translate-y-1" })} ${renderComponent($$result2, "CardBranch", CardBranch, { "href": "https://maps.app.goo.gl/GgiKgSmGr31CvVXw5", "suc_name": "Parque Leloir", "suc_loc": "Complejo Acorus", "suc_img": "/images/sucursal-parque-leloir.webp", "suc_dir": "Mart\xEDn Fierro 2921, Piso 2 Of. 201", "suc_phone": "4627-8034 / 7548-6846", "addStyles": "hover:border-primary-border-msb hover:border-4 h-100 transition duration-500 ease-in-out easy-out transform hover:-translate-y-1" })} </div> </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/index.astro", "self");

const $$file$5 = "F:/Mis cosas/Programacion/msb-sh/src/pages/index.astro";
const $$url$5 = "";

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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/contacto/index.astro", void 0);

const $$file$4 = "F:/Mis cosas/Programacion/msb-sh/src/pages/contacto/index.astro";
const $$url$4 = "/contacto";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$4,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const ArrowSortIcon = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    " ",
    /* @__PURE__ */ jsx("img", { id: "bath", alt: "arrow sort icon", src: "/images/arrow-sort.png", width: "24", height: "24" })
  ] });
};

const CardResultSkeleton = () => {
  return /* @__PURE__ */ jsxs("div", { class: "shadow-lg rounded-lg overflow-hidden relative bottom-0 ", children: [
    /* @__PURE__ */ jsx("div", { class: "w-full h-48 bg-gray-300 animate-pulse", style: "aspect-ratio: 16/9;" }),
    /* @__PURE__ */ jsxs("div", { class: "p-4 bg-gray-500", children: [
      /* @__PURE__ */ jsxs("div", { class: "h-100 flex flex-col space-y-2", children: [
        /* @__PURE__ */ jsx("div", { class: "h-100 bg-gray-400 animate-pulse text-lg font-semibold rounded" }),
        /* @__PURE__ */ jsx("div", { class: "h-100 bg-gray-400 animate-pulse text-sm rounded" }),
        /* @__PURE__ */ jsx("div", { class: "h-100 bg-gray-400 animate-pulse text-sm rounded" }),
        /* @__PURE__ */ jsxs("div", { class: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("span", { class: "h-8 bg-slate-400 animate-pulse rounded" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { class: "h-8 bg-slate-400 animate-pulse rounded" }),
            /* @__PURE__ */ jsx("span", { class: "h-8 bg-slate-400 animate-pulse rounded" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { class: "flex justify-between items-end mt-3", children: [
        /* @__PURE__ */ jsx("div", { class: "flex gap-1", children: /* @__PURE__ */ jsx("span", { class: "h-8 bg-red-400 animate-pulse rounded" }) }),
        /* @__PURE__ */ jsx("span", { class: "h-8 bg-red-400 animate-pulse rounded" })
      ] })
    ] })
  ] });
};

const ResultsPage = ({ selects, locations }) => {
  const filterStore = filterItems.get();
  searchParamsStore.get();
  let tipo_propiedad = [];
  let tipo_operacion = [];
  let Ambientes = [];
  let calles = [];
  let sellocalidades = [];
  let barrios1 = [];
  let moneda = [];
  let valor_minimo = [];
  let valor_maximo = [];
  let in_iub = [];
  tipo_propiedad = formatOptions(selects?.tipo);
  tipo_operacion = formatOptions(selects.operacion);
  Ambientes = formatOptions(selects.ambientes);
  calles = formatOptions(selects.calles);
  sellocalidades = formatOptions(selects.localidades);
  barrios1 = formatOptions(selects.barrio);
  in_iub = formatOptions(locations.ubicaciones);
  moneda = [{
    value: "P",
    label: "Pesos"
  }, {
    value: "D",
    label: "U$D"
  }];
  valor_minimo = formatOptions(selects.valor.desde);
  valor_maximo = formatOptions(selects.valor.hasta);
  const defaultOptions = {
    tipo_operacion: { value: "V", label: "Venta" },
    tipo_propiedad: { value: "All", label: "Tipo de propiedad" },
    Ambientes: { value: "All", label: "Cantidad de Ambientes" },
    calles: { value: "All", label: "Calle" },
    sellocalidades: { value: "All", label: "Localidad" },
    barrios1: { value: "All", label: "Barrio" },
    moneda: { value: "D", label: "U$D" },
    valor_minimo: { value: "All", label: "Desde" },
    valor_maximo: { value: "All", label: "Hasta" },
    rppagina: { value: "15", label: "15" },
    in_iub: { value: "", label: "" }
  };
  useState(true);
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(defaultOptions?.tipo_operacion?.value);
  const [monedaSeleccionada, setMonedaSeleccionada] = useState(defaultOptions?.moneda);
  const { handleSelect, resetSelect, handleCheckboxChange, filtersSelected } = useSearch({
    tipo_operacion,
    tipo_propiedad,
    Ambientes,
    calles,
    sellocalidades,
    barrios1,
    moneda,
    valor_minimo,
    valor_maximo,
    in_iub
  }, {
    ...defaultOptions,
    moneda: monedaSeleccionada,
    ...filterStore
  });
  useEffect(() => {
    fetchResults();
  }, []);
  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/results.json?${searchParamsStore.get()}`);
      const data = await response.json();
      if (data.resultado.fichas?.hasOwnProperty("error")) {
        setResults(null);
        setIsLoading(false);
      } else if (response.ok) {
        setIsLoading(false);
        setResults(data.resultado);
        const currentUrl = window.location.pathname;
        const newUrl = `${currentUrl}?${searchParamsStore.get()}`;
        window.history.pushState({}, "", newUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const orderAscDesc = () => {
    if (Array.isArray(results?.fichas)) {
      results?.fichas.map((result) => {
        const precio = result.precio.replace(/[$.]/g, "");
        return {
          ...result,
          precio: Number(precio)
        };
      }).sort((a, b) => a.precio - b.precio);
      setResults({
        ...results,
        fichas: results?.fichas.reverse()
      });
    }
  };
  const handleCheckbox = (id, value) => {
    const updatedMonedaSeleccionada = {
      value,
      label: id
    };
    setMonedaSeleccionada(updatedMonedaSeleccionada);
    handleCheckboxChange(id, value);
  };
  const resetAndFetch = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    resetSelect(defaultOptions);
    setIsActive("V");
    setMonedaSeleccionada(defaultOptions.moneda);
    resetFilter(defaultOptions);
    fetchResults();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await fetchResults();
  };
  return /* @__PURE__ */ jsxs("article", { className: " py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 md:px-0 px-3 ", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-start-1 lg:col-end-4 flex gap-4", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: handleSelect,
          value: "V",
          addStyles: `sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === "V" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
          id: "tipo_operacion",
          children: "Vender"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-start-4 lg:col-end-7   flex gap-4", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: handleSelect,
          value: "A",
          addStyles: ` sm:text-sm md:text-md lg:text-lg w-full ${filtersSelected?.tipo_operacion?.value === "A" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
          id: "tipo_operacion",
          children: "Alquilar"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-start-7 lg:col-end-10 flex gap-4", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: handleSelect,
          value: "M",
          addStyles: `sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === "M" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
          id: "tipo_operacion",
          children: "Venta y Alquiler"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-start-10 lg:col-end-13 flex  gap-4", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: handleSelect,
          value: "T",
          addStyles: `sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === "T" && "text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out"}`,
          id: "tipo_operacion",
          children: "Alquiler Temporiario"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-start-1 lg:col-end-4", children: /* @__PURE__ */ jsx(SelectField, { id: "tipo_propiedad", onChange: handleSelect, defaultOption: filterStore.tipo_propiedad, opts: tipo_propiedad }) }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-1 lg:col-start-4  lg:col-end-13 md:col-start-1 md:col-end-4 flex gap-4  w-full flex-grow ", children: [
        /* @__PURE__ */ jsx(SearchDebounce, { filterOptsLocations: { in_iub } }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex lg:hidden gap-4", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "primary",
            onClick: onSubmit,
            className: "lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white",
            addStyles: "sm:text-sm md:text-md lg:text-lg border-2 border-gray-300 rounded-md  flex w-full justify-center items-center",
            children: "BUSCAR"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: " md:hidden lg:flex lg:col-start-11  lg:col-end-13 flex lg:justify-between", children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "primary",
            onClick: onSubmit,
            type: "submit",
            className: "lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white",
            addStyles: "w-full sm:text-sm md:text-md lg:text-lg flex lg:flex-grow justify-center items-center gap-x-8",
            children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SearchIcon, {}) }),
              "BUSCAR"
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4 md:px-0 px-3", children: [
      /* @__PURE__ */ jsxs("div", { class: "lg:col-start-4 lg:col-end-13  flex items-end justify-between w-full", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-bold text-primary-text-msb text-sm md:text-md lg:text-lg", children: [
          "Tenemos ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-bg-2-msb text-sm md:text-md lg:text-lg", children: Array.isArray(results?.fichas) ? results?.fichas.length : 0 }),
          " resultados con tu búsqueda"
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: orderAscDesc, addStyles: "bg-transparent hover:bg-transparent p-0 m-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center text-primary-text-msb text-sm md:text-md lg:text-lg font-bold  gap-1", children: [
          " Ordenar ",
          /* @__PURE__ */ jsx(ArrowSortIcon, {})
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("aside", { className: "md:col-12 lg:col-start-1 lg:col-end-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "flex mb-4", children: /* @__PURE__ */ jsx(SelectField, { id: "Ambientes", onChange: handleSelect, defaultOption: filterStore.Ambientes, opts: Ambientes }) }),
        /* @__PURE__ */ jsx("div", { className: "flex mb-4", children: /* @__PURE__ */ jsx(SelectField, { id: "calles", onChange: handleSelect, defaultOption: filterStore.calles, opts: calles }) }),
        /* @__PURE__ */ jsx("div", { className: "flex mb-4", children: /* @__PURE__ */ jsx(SelectField, { id: "sellocalidades", onChange: handleSelect, defaultOption: filterStore.sellocalidades, opts: sellocalidades }) }),
        /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx(SelectField, { id: "barrios1", onChange: handleSelect, defaultOption: filterStore.barrios1, opts: barrios1 }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-primary-text-msb text-sm md:text-md lg:text-lg", children: "Moneda" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "hidden",
                  id: "moneda",
                  value: "P",
                  checked: monedaSeleccionada.value === "P",
                  onChange: () => handleCheckbox("moneda", "P")
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `rounded-full border bg-tertiary-bg-msb w-5 h-5 flex items-center justify-center ${monedaSeleccionada.value === "P" ? "bg-tertiary-bg-msb" : "bg-white border-5 border-separate"}`, children: monedaSeleccionada.value === "P" && /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 rounded-full" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-secondary-text-msb font-base  text-sm md:text-md lg:text-lg", children: "Pesos" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "hidden",
                  id: "moneda",
                  value: "D",
                  checked: monedaSeleccionada.value === "D",
                  onChange: () => handleCheckbox("moneda", "D")
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `rounded-full border bg-tertiary-bg-msb w-5 h-5 flex items-center justify-center ${monedaSeleccionada.value === "D" ? "bg-tertiary-bg-msb" : "bg-white border-5 border-separate"}`, children: monedaSeleccionada.value === "D" && /* @__PURE__ */ jsx("div", { className: "w-4 h-4 border-2 rounded-full" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-secondary-text-msb font-base  text-sm md:text-md lg:text-lg", children: "U$D" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-primary-text-msb text-sm md:text-md lg:text-lg", children: "Valores" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx(SelectField, { id: "valor_minimo", onChange: handleSelect, defaultOption: filterStore.valor_minimo, opts: valor_minimo }),
            /* @__PURE__ */ jsx(SelectField, { id: "valor_maximo", onChange: handleSelect, defaultOption: filterStore.valor_maximo, opts: valor_maximo })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "primary",
            onClick: resetAndFetch,
            addStyles: "w-full text-md border-2 border-gray-300 rounded-md flex justify-center items-center",
            children: "Limpiar Filtros"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-start-4 lg:col-end-13", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-1 gap-4 animate-fade", children: isLoading ? /* @__PURE__ */ jsx(Fragment, { children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]?.map((result) => {
        return /* @__PURE__ */ jsx("div", { className: "animate-ease-linear animate-pulse", children: /* @__PURE__ */ jsx(CardResultSkeleton, {}) });
      }) }) : /* @__PURE__ */ jsx(Fragment, { children: Array.isArray(results?.fichas) && results.fichas.map((result) => /* @__PURE__ */ jsx(
        CardProperty,
        {
          cardData: result,
          href: `/propiedades/${result.direccion_completa}`
        },
        `${result.id}${result.in_suc}-${result.in_num}-${result.direccion_completa}`
      )) }) }) })
    ] }) })
  ] });
};

const $$Astro$3 = createAstro();
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$3;
  const title = "Resultados de la b\xFAsqueda";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": "resultados de la busqueda" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ResultsPage", ResultsPage, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "@components/preact/Results/ResultsPage", "client:component-export": "default" })} ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/resultados/index.astro", void 0);

const $$file$3 = "F:/Mis cosas/Programacion/msb-sh/src/pages/resultados/index.astro";
const $$url$3 = "/resultados";

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
  const selects = await getAllSelects();
  const locations = await getLocations();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Resultados de Busqueda", "description": "Buscar propiedades" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="bg-secondary-bg-msb h-full"> <div class="container mx-auto "> ${renderComponent($$result2, "ResultsPage", null, { "selects": selects, "locations": locations, "client:only": true, "client:component-hydration": "only", "client:component-path": "@components/preact/Results/ResultsPage", "client:component-export": "default" })} </div> </article> ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/resultados-de-busqueda/index.astro", void 0);

const $$file$2 = "F:/Mis cosas/Programacion/msb-sh/src/pages/resultados-de-busqueda/index.astro";
const $$url$2 = "/resultados-de-busqueda";

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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/tasaciones/index.astro", void 0);

const $$file$1 = "F:/Mis cosas/Programacion/msb-sh/src/pages/servicios/tasaciones/index.astro";
const $$url$1 = "/servicios/tasaciones";

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
  const title = "Nuestros servicios";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/sumate/index.astro", void 0);

const $$file = "F:/Mis cosas/Programacion/msb-sh/src/pages/sumate/index.astro";
const $$url = "/sumate";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index$6 as a, index$5 as b, index$4 as c, index$3 as d, index$2 as e, index$1 as f, index as g, index$7 as i };
