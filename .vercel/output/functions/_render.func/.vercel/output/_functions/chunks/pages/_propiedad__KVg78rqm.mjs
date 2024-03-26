import { l as lookup, i as isRemoteImage, a as isESMImportedImage, b as isLocalService, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_CE-8I0f5.mjs';
import { A as AstroError, d as InvalidImageService, e as ExpectedImageOptions, E as ExpectedImage, F as FailedToFetchRemoteImageDimensions, c as createAstro, b as createComponent, f as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, g as addAttribute, s as spreadAttributes, u as unescapeHTML, h as renderSlot, i as renderComponent, j as renderHead, k as createTransitionScope } from '../astro_CRwCSytW.mjs';
/* empty css                          */
import 'kleur/colors';
/* empty css                                */
import { f as formatearString, c as capitalize, a as fetchData } from './_id__DBX5VZxJ.mjs';
import he from 'he';
import { getIconData, iconToSVG } from '@iconify/utils';
import { clsx } from 'clsx';
/* empty css                          */
import { jsx, jsxs } from 'preact/jsx-runtime';
import { twMerge } from 'tailwind-merge';
import { useState } from 'preact/hooks';

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done)
      break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_CE-8I0f5.mjs'
    ).then(n => n.h).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$b = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "F:/Mis cosas/Programacion/msb-sh/node_modules/astro/components/Image.astro", void 0);

const $$Astro$a = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "F:/Mis cosas/Programacion/msb-sh/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/squoosh","config":{}},"domains":[],"remotePatterns":[]};
					const outDir = new URL("file:///F:/Mis%20cosas/Programacion/msb-sh/.vercel/output/static/");
					new URL("_astro", outDir);
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$9 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "F:/Mis cosas/Programacion/msb-sh/node_modules/astro/components/ViewTransitions.astro", void 0);

const ourServicesNavItems = [
  {
    label: "Nuestros Servicios",
    href: "/servicios",
    icon: "note-check",
    dropdown: [
      { label: "Nuestros Servicios", category: "our-services", isTitle: true },
      { label: "Tasaciones", category: "our-services", href: "/servicios/tasaciones" },
      { label: "Administración", category: "our-services", href: "/servicios/administracion" }
    ]
  }
];
const contactUsNavItems = [
  {
    label: "Contacto",
    href: "/contacto",
    icon: "mail"
  }
];
const joinUsNavItems = [
  {
    label: "Sumate a nuestro equipo",
    href: "/sumate",
    icon: "paper-user"
  }
];
const navItems = [
  ...contactUsNavItems,
  ...joinUsNavItems,
  ...ourServicesNavItems
  /*  ...gatedCommunities, */
];

const icons = {"local":{"prefix":"local","lastModified":1711109839,"icons":{"brand-linkedin":{"body":"<path fill=\"currentColor\" d=\"M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z\"/>"},"brand-wechat":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M16.5 10c3.038 0 5.5 2.015 5.5 4.5 0 1.397-.778 2.645-2 3.47V20l-1.964-1.178A6.649 6.649 0 0 1 16.5 19c-3.038 0-5.5-2.015-5.5-4.5s2.462-4.5 5.5-4.5z\"/><path d=\"M11.197 15.698c-.69.196-1.43.302-2.197.302a8.008 8.008 0 0 1-2.612-.432L4 17v-2.801C2.763 13.117 2 11.635 2 10c0-3.314 3.134-6 7-6 3.782 0 6.863 2.57 7 5.785v.233M10 8h.01M7 8h.01M15 14h.01M18 14h.01\"/></g>"},"chevron-down":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"m6 9 6 6 6-6\"/></g>"},"cross":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M18 6 6 18M6 6l12 12\"/></g>"},"heart-default":{"body":"<path fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"2\" d=\"m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z\"/>"},"heart-solid":{"body":"<path fill=\"#494949\" stroke=\"#494949\" stroke-width=\"2\" d=\"m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z\"/>"},"home-1":{"body":"<g fill=\"currentColor\"><path d=\"M12.254 5.069a.5.5 0 0 0-.508 0l-8.93 5.254.506.861L12 6.08l8.677 5.105.508-.862L18 8.45V6a.5.5 0 0 0-.5-.5H16a.5.5 0 0 0-.5.5v.979l-3.246-1.91ZM7 12.5h5.5v3H7v-3Z\"/><path fill-rule=\"evenodd\" d=\"m12 7-7 4v7H2.5a.5.5 0 0 0 0 1h18a.5.5 0 0 0 0-1H19v-7l-7-4Zm0 1.152L6 11.58V18h8v-5.5h3V18h1v-6.42l-6-3.428Z\" clip-rule=\"evenodd\"/></g>"},"home-2":{"body":"<path fill=\"currentColor\" d=\"M12 2.1 1 12h3v9h7v-6h2v6h7v-9h3L12 2.1zm0 2.691 6 5.4V19h-3v-6H9v6H6v-8.809l6-5.4z\"/>"},"logout":{"body":"<path fill=\"#494949\" d=\"M5 21c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 3 19V5c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 5 3h7v2H5v14h7v2H5Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5-5 5Z\"/>"},"mail":{"body":"<path fill=\"currentColor\" d=\"M19.2 4.8c.821 0 1.609.316 2.19.879.58.562.907 1.325.907 2.121v9.6a2.95 2.95 0 0 1-.907 2.121 3.148 3.148 0 0 1-2.19.879H5.574a3.148 3.148 0 0 1-2.19-.879 2.953 2.953 0 0 1-.907-2.121V7.8c0-.796.327-1.559.907-2.121a3.148 3.148 0 0 1 2.19-.879H19.2Zm1.858 4.753-8.356 4.764a.633.633 0 0 1-.528.046l-.101-.046-8.357-4.761V17.4c0 .477.196.935.544 1.273.349.337.821.527 1.314.527H19.2c.493 0 .965-.19 1.314-.527.348-.338.544-.796.544-1.273V9.553ZM19.2 6H5.574c-.493 0-.965.19-1.314.527A1.772 1.772 0 0 0 3.716 7.8v.362l8.671 4.942 8.671-4.944V7.8c0-.477-.196-.935-.544-1.273A1.889 1.889 0 0 0 19.2 6Z\"/>"},"mail-green":{"body":"<path fill=\"#4E5A2B\" d=\"M18.6 5.3a3 3 0 0 1 3 3v9.6a3 3 0 0 1-3 3H5.4a3 3 0 0 1-3-3V8.3a3 3 0 0 1 3-3h13.2Zm1.8 4.753-8.095 4.764a.6.6 0 0 1-.511.046l-.099-.046L3.6 10.056V17.9a1.8 1.8 0 0 0 1.8 1.8h13.2a1.8 1.8 0 0 0 1.8-1.8v-7.847ZM18.6 6.5H5.4a1.8 1.8 0 0 0-1.8 1.8v.362l8.4 4.942 8.4-4.944V8.3a1.8 1.8 0 0 0-1.8-1.8Z\"/>","height":25},"map-pin":{"body":"<path fill=\"#f41922\" stroke=\"#5a0000\" stroke-width=\"5.7\" d=\"M-995.72 1225.8c-.273-.78-1.645-6.027-3.049-11.662-4.441-17.823-12.122-36.988-22.546-56.255-5.984-11.061-7.067-12.824-24.551-40-28.252-43.911-33.217-56.241-32.173-79.89.957-21.672 8.272-37.909 24.149-53.61 13.179-13.032 27.807-20.549 45.601-23.432 44.097-7.145 86.878 21.883 95.546 64.828 2.02 10.012 1.572 27.243-.953 36.604-2.77 10.269-13.883 31.045-29.589 55.315-28.348 43.807-39.082 65.687-47.119 96.05-3.111 11.755-4.398 14.673-5.316 12.052z\" transform=\"matrix(.18403 0 0 .17534 214.35 -157.87)\"/><path fill=\"#0e232e\" d=\"M37.699 26.917c0 3.183-2.837 5.763-6.336 5.763-3.5 0-6.337-2.58-6.337-5.763 0-3.182 2.837-5.762 6.337-5.762s6.336 2.58 6.336 5.762z\"/>","width":64,"height":64},"menu":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M4 6h16M4 12h16M4 18h16\"/></g>"},"note-check":{"body":"<path fill=\"currentColor\" d=\"m13.535 22.5 1.5 1.5H3V3h6c0-.414.078-.8.234-1.16.157-.36.371-.68.645-.961a2.81 2.81 0 0 1 .95-.645A3.195 3.195 0 0 1 12 0c.414 0 .8.078 1.16.234.36.157.68.371.961.645.281.273.496.59.645.95.148.359.226.75.234 1.171h6v12.035l-1.5 1.5V4.5H18v3H6v-3H4.5v18h9.035ZM7.5 4.5V6h9V4.5h-3V3c0-.21-.04-.406-.117-.586a1.503 1.503 0 0 0-.317-.469 1.634 1.634 0 0 0-.48-.328A1.27 1.27 0 0 0 12 1.5a1.477 1.477 0 0 0-1.055.434 1.634 1.634 0 0 0-.328.48A1.27 1.27 0 0 0 10.5 3v1.5h-3Zm16.277 12.527-6.527 6.54-3.152-3.165 1.054-1.054 2.098 2.086 5.473-5.461 1.054 1.054Z\"/>"},"paper-user":{"body":"<g fill=\"none\"><path fill=\"currentColor\" d=\"M7.8 15a.6.6 0 1 1 0-1.2h8.4a.6.6 0 0 1 0 1.2H7.8Zm0 3a.6.6 0 1 1 0-1.2h8.4a.6.6 0 0 1 0 1.2H7.8Z\"/><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M13.422 1.2H5.4A1.8 1.8 0 0 0 3.6 3v18a1.8 1.8 0 0 0 1.8 1.8h13.2a1.8 1.8 0 0 0 1.8-1.8V8.642a1.8 1.8 0 0 0-.474-1.216l-5.177-5.643a1.8 1.8 0 0 0-1.327-.583ZM4.8 3a.6.6 0 0 1 .6-.6h8.022a.6.6 0 0 1 .443.194l5.177 5.643a.6.6 0 0 1 .158.405V21a.6.6 0 0 1-.6.6H5.4a.6.6 0 0 1-.6-.6V3Z\" clip-rule=\"evenodd\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.8 2.52v5.64h5.64\"/><path fill=\"currentColor\" d=\"M9.76 7.36a1.28 1.28 0 1 0 .08-2.56 1.28 1.28 0 0 0-.078 2.56Z\"/><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M12.32 10.133c0-1.36-1.147-2.346-2.56-2.346-1.414 0-2.56.984-2.56 2.346v.64a.427.427 0 0 0 .427.427h4.266a.427.427 0 0 0 .426-.426v-.641Z\" clip-rule=\"evenodd\"/></g>"},"social-facebook":{"body":"<path fill=\"#4E5A2B\" d=\"M13.397 20.997V12.8h2.765l.411-3.21h-3.176V7.549c0-.926.258-1.56 1.587-1.56h1.684V3.127c-.82-.088-1.643-.13-2.467-.127-2.444 0-4.122 1.492-4.122 4.23v2.356H7.332v3.209h2.753v8.202h3.312Z\"/>"},"social-instagram":{"body":"<path fill=\"#4E5A2B\" d=\"M11.997 5.843A6.148 6.148 0 0 0 5.84 12a6.148 6.148 0 0 0 6.157 6.157A6.148 6.148 0 0 0 18.154 12a6.148 6.148 0 0 0-6.157-6.157Zm0 10.159A4.01 4.01 0 0 1 7.995 12a4.01 4.01 0 0 1 4.002-4.002A4.01 4.01 0 0 1 15.998 12a4.01 4.01 0 0 1-4.001 4.002Zm6.409-11.846c-.796 0-1.438.642-1.438 1.438 0 .795.642 1.438 1.438 1.438a1.434 1.434 0 0 0 1.329-1.989 1.436 1.436 0 0 0-1.329-.887ZM23.999 12c0-1.657.015-3.3-.078-4.953-.093-1.922-.532-3.627-1.937-5.032C20.576.607 18.874.172 16.953.08 15.296-.014 13.653 0 12 0c-1.657 0-3.3-.015-4.953.078C5.125.172 3.42.61 2.015 2.015.607 3.423.172 5.125.08 7.047-.014 8.704 0 10.346 0 12c0 1.654-.015 3.3.078 4.953.093 1.922.531 3.627 1.936 5.032 1.408 1.408 3.11 1.843 5.032 1.936 1.658.093 3.3.079 4.954.079 1.657 0 3.299.015 4.953-.078 1.921-.093 3.626-.531 5.031-1.936 1.408-1.408 1.843-3.11 1.937-5.032.096-1.654.078-3.296.078-4.953Zm-2.642 7.079c-.22.546-.483.954-.907 1.375a3.839 3.839 0 0 1-1.375.906c-1.579.628-5.328.487-7.078.487s-5.503.14-7.082-.484a3.814 3.814 0 0 1-1.375-.906 3.84 3.84 0 0 1-.906-1.375C2.009 17.5 2.15 13.75 2.15 12s-.14-5.503.484-7.082c.219-.546.483-.954.906-1.375a3.88 3.88 0 0 1 1.375-.906c1.58-.625 5.332-.484 7.082-.484s5.502-.14 7.081.484c.547.219.955.483 1.375.906.424.424.688.829.907 1.375.624 1.58.483 5.332.483 7.082s.141 5.5-.486 7.079Z\"/>"},"social-whatsapp":{"body":"<path fill=\"#4E5A2B\" d=\"M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.22-.16-.47-.28Z\"/>"},"social-youtube":{"body":"<path fill=\"#4E5A2B\" d=\"m10 15 5.19-3L10 9v6Zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z\"/>"},"userDefault":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0\"/><path d=\"M9 10a3 3 0 1 0 6 0 3 3 0 1 0-6 0m-2.832 8.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855\"/></g>"}},"width":24,"height":24}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$8 = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Icon;
  const req = Astro2.request;
  const { name = "", title, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new Error(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new Error('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new Error(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new Error(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new Error(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`} <use ${addAttribute(`#${id}`, "xlink:href")}></use> </svg>`;
}, "F:/Mis cosas/Programacion/msb-sh/node_modules/astro-icon/components/Icon.astro", void 0);

const HeartIcon = ({ addStyles }) => {
  twMerge(clsx("h-100 w-100 object-contain", addStyles));
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: addStyles,
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z",
          stroke: addStyles ?? "currentColor",
          strokeWidth: "2"
        }
      )
    }
  );
};

const LogOutIcon = ({ addStyles }) => {
  const styles = twMerge(clsx("h-100 w-100 icon icon-tabler icon-tabler-calendar-month", addStyles));
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: styles, className: styles, children: /* @__PURE__ */ jsx("path", { fill: styles, stroke: styles, d: "M5 21c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 3 19V5c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 5 3h7v2H5v14h7v2H5Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5-5 5Z" }) });
};

const NavDropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return jsxs("div", {
    class: "relative z-10 transition-all",
    children: [jsx("button", {
      onClick: toggleDropdown,
      class: "flex flex-row items-center",
      children: jsx("span", {
        children: props.label
      })
    }), isOpen && jsx("div", {
      className: " animate-fade-down animate-duration-300",
      children: props.childrenDrop
    })]
  });
};

const $$Astro$7 = createAstro();
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Link;
  const { class: className, checkActive = true, ...anchorProps } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const isActive = checkActive && currentPath === anchorProps.href;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([
    className,
    "flex items-center justify-start  border border-transparent rounded-medium text-sm font-medium  ",
    isActive ? " text-primary-msb rounded-none border-b-4 border-b-primary-msb" : "border-none text-gray-600 "
  ], "class:list")}${spreadAttributes(anchorProps)}> ${renderSlot($$result, $$slots["before"])} ${renderSlot($$result, $$slots["default"])} ${renderSlot($$result, $$slots["after"])} </a>`;
}, "F:/Mis cosas/Programacion/msb-sh/src/components/ui/Link.astro", void 0);

const $$Astro$6 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { pathname } = Astro2.url;
  return renderTemplate`<!-- Menú de navegación para pantallas grandes --><!-- Navbar para pantallas grandes -->${maybeRenderHead()}<nav class="relative hidden lg:block bg-secondary-msb shadow-lg border-t-8 border-primary-msb lg:px-10"> <div class="container mx-auto flex justify-between items-center py-4"> <!-- Logo y enlace principal --> ${renderComponent($$result, "Link", $$Link, { "href": "/", "checkActive": false, "class": "flex items-center space-x-3" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Image", $$Image, { "width": 180, "height": 70, "src": "/images/logo.png", "alt": "Logo" })} ` })} <!-- Menú de navegación para pantallas grandes --> <div class="flex gap-4"> <ul class="flex flex-col font-semibold p-4 lg:p-0 rtl:space-x-reverse lg:flex-row-reverse lg:mt-0 md:border-0 gap-4"> <!-- Elementos del menú aquí --> ${navItems.map((item) => {
    return renderTemplate`<li class="flex items-center "> ${renderComponent($$result, "Link", $$Link, { "class": "flex justify-between mt-1 items-start gap-5 font-gotham " }, { "default": ($$result2) => renderTemplate`${item.dropdown ? renderTemplate`${renderComponent($$result2, "Link", $$Link, { "class": "rounded-none hover:border-b-4 text-xs font-gotham hover:border-b-primary-msb items-center hover:border-primary-msb hover:transition-all font-primary-font-msb " }, { "after": ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "slot": "after", "class": " ml-2 w-4 h-4", "name": "chevron-down" })}`, "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "NavDropDown", NavDropDown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Mis cosas/Programacion/msb-sh/src/components/preact/NavDropDown", "client:component-export": "default" }, { "childrenDrop": ($$result4) => renderTemplate`<div> <div${addAttribute(`absolute right-0  mt-2 px-1 lg:top-4 left-0 py-2 w-max rounded-md bg-secondary-msb shadow-lg z-20 animate-fadeIn `, "class")}> ${item.dropdown && item.dropdown?.map(
      (item2) => item2.href ? renderTemplate`${renderComponent($$result4, "Link", $$Link, { "href": item2.href ?? "", "class": "block px-3 py-2  font-primary-font-msb text-sm border border-none " }, { "default": ($$result5) => renderTemplate` <span class="font-primary-font-msb text-gray-600 font-semibold text-xs  hover:text-primary-msb hover:border-b-primary-msb uppercase "> ${item2.label} </span> ` })}` : renderTemplate`<span class="block px-3 py-2  font-semibold font-primary-font-msb   text-xs  text-primary-msb   "> ${item2.label} </span>`
    )} </div> </div>`, "label": ($$result4) => renderTemplate`<span${addAttribute(`${item?.dropdown?.some((h) => h.href === pathname) ? "rounded-none hover:border-b-4 hover:border-b-primary-msb items-center hover:border-primary-msb hover:transition-all font-primary-font-msb border-b-4 border-b-primary-msb border-primary-msb transition-all font-primary-font-msb uppercase font-gotham hover:text-primary-msb text-primary-msb " : "rounded-none hover:border-b-4 hover:border-b-primary-msb items-center hover:border-primary-msb hover:transition-all font-primary-font-msb uppercase font-gotham hover:text-primary-msb  "}`, "class")}> ${item.label} </span>` })}  ` })}` : item.label === "Contacto" ? renderTemplate`${renderComponent($$result2, "Link", $$Link, { "checkActive": false, "href": item.dropdown ? "" : item.href, "class": "flex flex-row items-center rounded-none hover:border-b-4 px-0" }, { "default": ($$result3) => renderTemplate` <span class=" flex items-center justify-end h-10 font-gotham text-xs border border-tertiary-msb px-2 bg-white text-gray-600 uppercase font-bold hover:bg-tertiary-bg-msb hover:text-white cursor-pointer rounded-md hover:border-tertiary-msb transition hover:transition-all tracking-wide"> ${item.label} </span> ` })}` : renderTemplate`${renderComponent($$result2, "Link", $$Link, { "checkActive": item.href === pathname, "href": item.dropdown ? "" : item.href, "class": "rounded-none hover:border-b-4 font-gotham uppercase font-semibold text-xs hover:border-b-primary-msb items-center hover:border-primary-msb hover:transition-all font-primary-font-msb transition-all" }, { "default": ($$result3) => renderTemplate` <span${addAttribute(`${item.href !== pathname && "rounded-none font-gotham  hover:text-primary-msb uppercase hover:border-b-primary-msb hover:border-primary-msb hover:border-b-4 hover:transition-all"}`, "class")}> ${item.label} </span> ` })}`}` })} </li>`;
  })} </ul> <!-- Botón de iniciar sesión --> ${renderTemplate`<div class="flex flex-row gap-1 items-center"> ${renderComponent($$result, "Link", $$Link, { "id": "ButtonFav", "href": "/favoritos", "checkActive": false, "class": "flex items-center justify-center h-10 px-4 border rounded bg-tertiary-msb hover:bg-[#696863] cursor-pointer font-medium font-primary-font-msb border-text-primary-msb transition" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeartIcon", HeartIcon, { "addStyles": "stroke-white hover:fill-white animate-duration-500 animate-fill-forwards transition-all" })} ` })} ${renderComponent($$result, "NavDropDown", NavDropDown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Mis cosas/Programacion/msb-sh/src/components/preact/NavDropDown", "client:component-export": "default" }, { "childrenDrop": ($$result2) => renderTemplate`<div class="flex w-full"> <div${addAttribute(`absolute h-fit w-full top-0 left-0 bg-white shadow-lg z-20 animate-fadeIn rounded-b-md rounded-br-md rounded-bl-md`, "class")}> ${renderComponent($$result2, "Link", $$Link, { "class": "p-3 text-base gap-2 hover:bg-gray-200 cursor-pointer transition-all transition-duration-400", "href": "/" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "size": 20, "class": "fill fill-black", "name": "userDefault" })}
Mi cuenta
` })} <hr class="divide divide-x-2"> ${renderComponent($$result2, "Link", $$Link, { "checkActive": false, "class": "p-3 text-base gap-2 hover:bg-gray-200 cursor-pointer transition-all transition-duration-400", "href": "/" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "size": 20, "class": "fill fill-black", "name": "logout" })}
Cerrar sesión
` })} </div> </div>`, "label": ($$result2) => renderTemplate`<div class="flex items-center py-2 justify-end h-10 gap-1 border-bg-2-msb px-2 bg-white text-bg-2-msb font-bold cursor-pointer rounded-md transition tracking-wide border "> ${renderComponent($$result2, "Icon", $$Icon, { "size": 20, "class": "fill  fill-black", "name": "userDefault" })}
José Armando
${renderComponent($$result2, "Icon", $$Icon, { "size": 20, "class": "fill fill-black", "name": "chevron-down" })} </div>` })} </div>` } </div> </div> </nav> <!-- Navbar para pantallas móviles --> <nav class="relative lg:hidden bg-secondary-msb shadow-md"> <div class="py-5 px-8 flex justify-between items-center"> <!-- Logo y enlace principal --> <div> ${renderComponent($$result, "Link", $$Link, { "href": "/", "checkActive": false, "class": "flex justify-center" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Image", $$Image, { "width": 150, "height": 20, "src": "/images/logo.png", "alt": "Logo", "class": "h-8 text-center items-center" })} ` })} </div> <!-- Botón de menú para pantallas pequeñas --> <button type="button" data-collapse-toggle="mobile-menu" class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm rounded-lg hover:bg-primary-bg-hover-msb focus:outline-none focus:ring" aria-controls="mobile-menu" aria-expanded="false"> ${renderComponent($$result, "Icon", $$Icon, { "name": "menu" })} </button> </div> <!-- Menú de navegación móvil para pantallas pequeñas --> <div class="hidden w-full absolute top-13 bg-secondary-msb z-10 shadow-sm animate-dropDown" id="mobile-menu"> <div class="shadow-md rounded-b-lg w-full"> ${renderTemplate`${renderComponent($$result, "NavDropDown", NavDropDown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Mis cosas/Programacion/msb-sh/src/components/preact/NavDropDown", "client:component-export": "default" }, { "childrenDrop": ($$result2) => renderTemplate`<div> <div${addAttribute(`absolute  h-fit w-full top-0 left-0  rounded-md bg-white shadow-lg z-9 animate-fadeIn`, "class")}> ${renderComponent($$result2, "Link", $$Link, { "class": "py-3  px-6  text-base gap-2 hover:bg-gray-200 hover:rouded-lg cursor-pointer transition-all transition-duration-400 ", "href": "/favoritos" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "size": 28, "class": "fill fill-black", "name": "heart-default" })}
Favoritos
` })} ${renderComponent($$result2, "Link", $$Link, { "class": "py-3  px-6  text-base gap-2 hover:bg-gray-200 hover:rouded-lg cursor-pointer transition-all transition-duration-400 ", "href": "#" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "size": 28, "class": "fill fill-black", "name": "userDefault" })}
Mi cuenta
` })} <hr class="divide divide-x-2"> ${renderComponent($$result2, "Link", $$Link, { "class": "py-3  px-6 text-base gap-2 hover:bg-gray-200  cursor-pointer transition-all transition-duration-400 ", "href": "/" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "LogOutIcon", LogOutIcon, { "addStyles": "fill-[#494949] stroke-[#494949]" })}
Cerrar sesión
` })} <hr class="divide divide-x-2 border-b-2 shadow-current"> </div> </div>`, "label": ($$result2) => renderTemplate`<div class="flex justify-start gap-5 items-end px-6 py-3 border-b w-screen"> ${renderComponent($$result2, "Icon", $$Icon, { "size": 40, "scale": 20, "name": "userDefault" })} <div> <h2 class="text-lg">Usuario</h2> <p class="text-gray-600">usuario@gmail.com</p> </div> ${renderComponent($$result2, "Icon", $$Icon, { "size": 20, "class": "fill fill-black", "name": "chevron-down" })} </div>` })}` } <ul class="text-gray-700"> ${navItems.map((item) => renderTemplate`<li class="flex  items-center justify-between w-100 flex-row  px-6 py-3 border-b "> ${item.dropdown ? renderTemplate`<div class="relative flex justify-between place-items-start gap-2  z-0  hover:border-primary-msb"> ${item.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "size": 28, "scale": 1, "name": item?.icon })}`} ${renderComponent($$result, "Link", $$Link, { "class": "flex  justify-start" }, { "after": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "slot": "after", "class": " ml-2 w-4 h-4 flex self-start items-end", "name": "chevron-down" })}`, "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NavDropDown", NavDropDown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Mis cosas/Programacion/msb-sh/src/components/preact/NavDropDown", "client:component-export": "default" }, { "childrenDrop": ($$result3) => renderTemplate`<div> <div${addAttribute(`relative w-100 right-0  mt-2 px-1 lg:top-8 left-0 py-2 w-max rounded-md bg-secondary-msb  animate-fadeIn`, "class")}> ${item.dropdown && item.dropdown?.map(
    (item2) => item2.href ? renderTemplate`${renderComponent($$result3, "Link", $$Link, { "href": item2.href ?? "", "class": "block px-3 py-2  font-primary-font-msb text-sm border border-none " }, { "default": ($$result4) => renderTemplate` <span class="font-primary-font-msb  font-semibold text-xs  hover:text-primary-msb hover:border-b-primary-msb uppercase text-gray-600 "> ${item2.label} </span> ` })}` : renderTemplate`<span class="block px-3 py-2  font-semibold   font-primary-font-msb text-xs text-primary-msb uppercase "> ${item2.label} </span>`
  )} </div> </div>`, "label": ($$result3) => renderTemplate`<span${addAttribute(`${item?.dropdown?.some((h) => h.href === pathname) ? "text-primary-msb font-primary-font-msb font-semibold text-xs border-b-4 border-b-primary-msb hover:text-primary-msb uppercase" : "font-primary-font-msb font-semibold text-xs  hover:text-primary-msb uppercase text-gray-600"}`, "class")}> ${item.label} </span>` })}  ` })} </div>` : renderTemplate`<div class="flex justify-between items-center gap-2 "> ${item.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "size": 28, "scale": 1, "name": item?.icon })}`} ${renderComponent($$result, "Link", $$Link, { "href": item.dropdown ? "" : item.href, "class": "text-lg flex flex-row items-center hover:transition-all font-primary-font-msb px-0 " }, { "default": ($$result2) => renderTemplate` <span class=" font-primary-font-msb font-semibold text-xs hover:text-primary-msb uppercase "> ${item.label} </span> ` })} </div>`} </li>`)} </ul> </div> </div> </nav> `;
}, "F:/Mis cosas/Programacion/msb-sh/src/components/Navbar.astro", void 0);

const $$Astro$5 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="bg-secondary-msb text-black shadow-inner flex justify-between items-center"> <div class="mx-auto py-20 container grid grid-col lg:grid-col-2 gap-5 lg:gap-0 md:gap-5"> <div class="flex flex-col lg:col-starts-1 lg:col-ends-2"> <h2 class="text-3xl font-bold mb-4 flex justify-center md:justify-center lg:justify-start"> ${renderComponent($$result, "Link", $$Link, { "href": "/", "checkActive": false, "class": "flex flex-shrink items-center justify-center" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Image", $$Image, { "width": 300, "height": 82, "class": "object-contain px-1 aspect-auto flex flex-shrink items-center justify-center", "src": "/images/logo.png", "alt": "Logo" })} ` })} </h2> <div class="flex justify-center col-start-2 col-end-12 md:justify-center lg:justify-start align-middle mb-4"> <a href="https://www.facebook.com/matiasszpirabienesraices/" target="_blank" class="mr-2">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "social-facebook" })}</a> <a href="https://www.instagram.com/matiasszpira/" target="_blank" class="mr-2">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "social-instagram" })}</a> <a href="https://www.youtube.com/channel/UCZVVcBSiVjsJGdzUw_tAfEw" target="_blank" class="mr-2">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "social-youtube" })}</a> <a${addAttribute(`https://api.whatsapp.com/send/?phone=5491144161700&text=Hola%2C+me+contactaba+desde+https://msb-sh.vercel.app+para+consultarles&type=phone_number&app_absent=0`, "href")} target="_blank" class="mr-2">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "social-whatsapp" })}</a> <a href="https://www.linkedin.com/company/mat%C3%ADas-szpira-bienes-ra%C3%ADces/about/" target="_blank" class="mr-2 text-bg-2-msb">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "brand-linkedin" })}</a> </div> <div class="mb-4 flex align-center justify-center md:justify-center lg:justify-start gap-2"> ${renderComponent($$result, "Icon", $$Icon, { "size": 24, "class": "self-center", "name": "mail-green" })} <a href="mailto:info@matiasszpira.com.ar" class="self-center text-sm text-center font-semibold">info@matiasszpira.com.ar</a> </div> </div> <div class="lg:col-start-3 lg:col-end-4 mb-6 sm:mb-0"> <h3 class="text-sm text-center md:text-center lg:text-start font-semibold mb-4 text-[#4E5A2B]">
QUÉ QUIERO
</h3> <ul class="w-100 text-center md:text-center lg:text-start"> <li class="mb-1"> <button value="V" id="btnOp" class="text-sm">Venta</button> </li> <li class="mb-1"> <button${addAttribute("A", "value")} id="btnOp" class="text-sm">Alquiler</button> </li> <li class="mb-1"> <button${addAttribute("T", "value")} id="btnOp" class="text-sm">Alquiler Temporario</button> </li> </ul> </div> <div class="lg:col-start-5 lg:col-end-6 mb-6 sm:mb-0"> <h3 class="text-sm text-center md:text-center lg:text-start font-semibold mb-4 text-[#4E5A2B]">
EMPRENDIMIENTOS
</h3> <ul class="w-100 text-center md:text-center lg:text-start"> <li class="mb-1"> <a${addAttribute("/emprendimientos?&ed_est=En+Pozo", "href")} class="text-sm">En Pozo</a> </li> <li class="mb-1"> <a href="/emprendimientos?&ed_est=En+Construccion" class="text-sm">En Construcción</a> </li> <li class="mb-1"> <a href="/emprendimientos?&ed_est=Terminado" class="text-sm">Terminado</a> </li> </ul> </div> <div class="lg:col-start-6 lg:col-end-7 mb-6 sm:mb-0"> <h3 class="text-sm text-center md:text-center lg:text-start font-semibold mb-4 text-nowrap text-[#4E5A2B]">
NUESTROS SERVICIOS
</h3> <ul class="w-100 text-center md:text-center lg:text-start grid "> <li class="mb-1"><a href="#" class="text-sm">Tasaciones</a></li> <li class="mb-1"><a href="#" class="text-sm">Administración</a></li> </ul> </div> <div class="lg:col-start-7 lg:col-end-8 mb-6 sm:mb-0"> <h3 class="text-sm text-center md:text-center lg:text-start font-semibold mb-4 text-nowrap text-[#4E5A2B]">
SUCURSALES
</h3> <ul class="w-100 text-center md:text-center lg:text-start"> <li class="mb-1"> <a href="#" class="text-sm font-semibold mb-2 text-[#4E5A2B]">NOSOTROS</a> </li> <li class="mb-1"> <a href="#" class="text-sm font-semibold mb-2 text-[#4E5A2B]">CONTACTO</a> </li> </ul> </div> </div> </footer> `;
}, "F:/Mis cosas/Programacion/msb-sh/src/layouts/Footer.astro", void 0);

const $$Astro$4 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Layout;
  const user = {
    name: "Jos\xE9",
    lastname: "Perez",
    email: "jose@example.com",
    avatar: null
  };
  const { title, description, img } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><!-- Img --><meta property="og:image"${addAttribute(img ?? "/images/logo.png", "content")}><meta property="og:image:url"${addAttribute(img ?? "/images/logo.png", "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="view-transition" content="same-origin"><link rel="image_src"${addAttribute(img ?? "/images/logo.png", "href")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body> <div id="app" class="relative h-screen"> <header class="[grid-area:header]"> ${renderComponent($$result, "Navbar", $$Navbar, { "user": user })} </header> <main class="[grid-area:main] font-gotham "> <!-- <ContainerLayout> --> ${renderSlot($$result, $$slots["default"])} <!--   </ContainerLayout> --> </main> <footer class="[grid-area:footer]"> ${renderComponent($$result, "Footer", $$Footer, {})} </footer> </div>  </body> </html>`;
}, "F:/Mis cosas/Programacion/msb-sh/src/layouts/Layout.astro", void 0);

const $$Astro$3 = createAstro();
const $$BreadCrumb = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BreadCrumb;
  const urlsObjtAstro = Astro2.url;
  const currentURL = urlsObjtAstro;
  const { pathname, origin, searchParams } = currentURL;
  const pathParts = pathname.split("/").filter((part) => part !== "");
  const breadcrumbItems = pathParts.map((part, index) => {
    const breadcrumbURL = `${origin}/${pathParts.slice(0, index + 1).join("/")}`;
    return {
      name: part,
      // Nombre del elemento del breadcrumb
      url: breadcrumbURL
      // URL del elemento del breadcrumb
    };
  });
  const breadcrumbWithHome = [
    {
      name: "Home",
      // Nombre del enlace "Home"
      url: `${origin}`
      // URL de la página principal
    },
    /* /pathname/id */
    ...breadcrumbItems?.map((item, index) => {
      const name = item.name.includes("?") ? formatearString(he.decode(item.name)) : formatearString(he.decode(item.name));
      return {
        ...item,
        name: he.decode(name)
      };
    })
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="flex p-5 px-0 lg:px-0 md:px-0" aria-label="Breadcrumb"> <ol class="flex flex-wrap items-center"> ${breadcrumbWithHome?.map((item, index) => {
    item.name.split("?")[item.name.split("?").length - 1];
    return renderTemplate`<li class="inline-flex items-center"> <div class="flex items-center"> ${index === 0 || item.name === "resultados de busqueda" || item.name === "emprendimientos" ? renderTemplate`${renderComponent($$result, "Link", $$Link, { "href": item.url, "class": ` ${item.url === `${origin}${pathname}` ? "text-primary-msb font-semibold tracking-wide " : "ms-1 text-sm font-semibold text-primary-text-msb capitalize hover:text-tertiary-bg-msb tracking-wide underline"}` }, { "default": ($$result2) => renderTemplate`${item.name === "Home" ? renderTemplate`<p class="pr-1"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "home-2", "size": 20 })} </p>` : renderTemplate`<p class="px-1 capitalize">${he.decode(item.name)}</p>`}` })}` : (
      /* IF THE LAST ITEM OF BREADCRUMB CHANGE TE TEXT COLOR TO GREEN */
      renderTemplate`${renderComponent($$result, "Link", $$Link, { "href": "", "class": ` ${item.url === `${origin}${pathname}` ? "text-primary-msb font-semibold tracking-wide pointer-events-none" : "ms-1 text-sm font-semibold text-primary-text-msb capitalize hover:text-tertiary-bg-msb tracking-wide  pointer-events-none"}` }, { "default": ($$result2) => renderTemplate`${item.name === "Home" ? renderTemplate`<p class="pr-1"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "home-2", "size": 20 })} </p>` : renderTemplate`<p class="px-1 capitalize">${capitalize(he.decode(item.name))}</p>`}` })}`
    )} ${index !== breadcrumbWithHome.length - 1 && renderTemplate`<span class="text-primary-text-msb font-light">/</span>`} </div> </li>`;
  })} </ol> </nav>`;
}, "F:/Mis cosas/Programacion/msb-sh/src/components/BreadCrumb.astro", void 0);

const $$Astro$2 = createAstro();
const $$propiedad$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$propiedad$2;
  const { propiedad } = Astro2.params;
  const url = Astro2.url;
  let prop = url.toString().split("/").pop();
  let suc = prop?.split("-")[0] ?? "";
  let id = prop?.split("-")[1] ?? "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Detalle de Propieda", "description": "Detalle de Propiedad" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-[#FFFBF4] h-full py-2"> ${renderComponent($$result2, "PropertyPage", null, { "client:only": true, "propertyCode": id, "branchCode": suc, "breadCrumbChild": "", "client:component-hydration": "only", "client:component-path": "@components/preact/Property/PropertyPage", "client:component-export": "default" }, { "breadCrumbChild": ($$result3) => renderTemplate`${renderComponent($$result3, "BreadCrumb", $$BreadCrumb, { "slot": "breadCrumbChild", "url": propiedad, "data-astro-transition-persist": createTransitionScope($$result3, "dhz26qxv") })}` })} </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/emprendimientos/[...emprendimiento]/unidad-disponible/[...operacion]/[propiedad].astro", "self");

const $$file$2 = "F:/Mis cosas/Programacion/msb-sh/src/pages/emprendimientos/[...emprendimiento]/unidad-disponible/[...operacion]/[propiedad].astro";
const $$url$2 = "/emprendimientos/[...emprendimiento]/unidad-disponible/[...operacion]/[propiedad]";

const _propiedad_$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$propiedad$2,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const endpoint = "resultados.emprendimientos";
const getEntrepreneurshipById = async (id) => {
  const queryParams = {
    ed_idl: id.toString()
  };
  try {
    const res = await fetchData(endpoint, queryParams);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching entrepreneurship data:", error);
    throw error;
  }
};

const $$Astro$1 = createAstro();
const $$propiedad$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$propiedad$1;
  const { propiedad } = Astro2.params;
  const url = Astro2.url;
  let prop = url.toString().split("/").pop();
  let suc = prop?.split("-")[0] ?? "";
  let id = prop?.split("-")[1] ?? "";
  const data = await getEntrepreneurshipById(id);
  const amig = capitalize(data.emprendimiento[0].amigable.replaceAll("-", " "));
  const image = data.emprendimiento[0].img_princ;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": data?.emprendimiento[0]?.titulo, "description": amig, "img": image }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-[#FFFBF4] h-full py-2"> ${renderComponent($$result2, "EntrepreneurshipDetail", null, { "client:only": true, "propertyCode": id, "branchCode": suc, "breadCrumbChild": "", "client:component-hydration": "only", "client:component-path": "@components/preact/Entrepreneurship/EntrepreneurshipDetail", "client:component-export": "default" }, { "breadCrumbChild": ($$result3) => renderTemplate`${renderComponent($$result3, "BreadCrumb", $$BreadCrumb, { "slot": "breadCrumbChild", "url": propiedad, "data-astro-transition-persist": createTransitionScope($$result3, "5qztnjne") })}` })} </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/emprendimientos/[...emprendimiento]/[propiedad].astro", "self");

const $$file$1 = "F:/Mis cosas/Programacion/msb-sh/src/pages/emprendimientos/[...emprendimiento]/[propiedad].astro";
const $$url$1 = "/emprendimientos/[...emprendimiento]/[propiedad]";

const _propiedad_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$propiedad$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$propiedad = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$propiedad;
  const { propiedad } = Astro2.params;
  const url = Astro2.url;
  let prop = url.toString().split("/").pop();
  let suc = prop?.split("-")[0] ?? "";
  let id = prop?.split("-")[1] ?? "";
  const response = await fetch(`${Astro2.url.origin}/api/property.json?suc=${suc}&id=${id}`);
  const data = await response.json();
  const { titulo, img_princ, in_tip, direccion, in_loc } = data.resultado.ficha[0];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${capitalize(in_tip)} - ${capitalize(direccion)} en ${capitalize(in_loc)}`, "description": titulo, "img": img_princ }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-[#FFFBF4] h-full py-2"> ${renderComponent($$result2, "PropertyPage", null, { "client:only": true, "propertyCode": id, "branchCode": suc, "breadCrumbChild": "", "client:component-hydration": "only", "client:component-path": "@components/preact/Property/PropertyPage", "client:component-export": "default" }, { "breadCrumbChild": ($$result3) => renderTemplate`${renderComponent($$result3, "BreadCrumb", $$BreadCrumb, { "slot": "breadCrumbChild", "url": propiedad, "data-astro-transition-persist": createTransitionScope($$result3, "nt5vcjzm") })}` })} </section> ` })}`;
}, "F:/Mis cosas/Programacion/msb-sh/src/pages/resultados-de-busqueda/[...operacion]/[propiedad].astro", "self");

const $$file = "F:/Mis cosas/Programacion/msb-sh/src/pages/resultados-de-busqueda/[...operacion]/[propiedad].astro";
const $$url = "/resultados-de-busqueda/[...operacion]/[propiedad]";

const _propiedad_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$propiedad,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, HeartIcon as H, _propiedad_$2 as _, $$Icon as a, $$Link as b, _propiedad_$1 as c, _propiedad_ as d, getConfiguredImageService as g, imageConfig as i };
