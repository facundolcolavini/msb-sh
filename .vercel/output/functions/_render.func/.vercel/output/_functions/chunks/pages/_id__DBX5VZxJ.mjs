import { d as db, U as UserTAuth, F as Favorite } from './_id__BW89SIC6.mjs';
import he from 'he';
import { eq, and } from '@astrojs/db/dist/runtime/config.js';

const API_BASE_URL = "https://xintel.com.ar/api";
const cache = {};
async function fetchData(endpoint, queryParams) {
  const { INM, APIK } = Object.assign({"PUBLIC_GOOGLE_MAPS_API_KEY": "AIzaSyC-ogGcelbNV0lstR2iFzBgdhXvRmzxvBI", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, { INM: "MSB", APIK: "DUDJETZ4CLD10ZQ0PIR3Y3R23" });
  if (!INM || !APIK) {
    throw new Error("Se requieren las claves INM y APIK en el archivo .env");
  }
  const cacheKey = `${endpoint}-${JSON.stringify(queryParams || {})}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }
  const url = new URL(`${API_BASE_URL}?json=${endpoint}`);
  const authParams = { inm: INM, apiK: APIK };
  Object.keys(authParams).forEach(
    (key) => url.searchParams.set(key, String(authParams[key]))
  );
  if (queryParams) {
    Object.entries(queryParams).forEach(
      ([key, value]) => url.searchParams.append(key, String(value))
    );
  }
  try {
    const controller = new AbortController();
    const signal = controller.signal;
    const response = await fetch(url.toString(), { signal });
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const res = await response.json();
    cache[cacheKey] = res;
    return res;
  } catch (error) {
    console.error("Error de red:", error);
    throw error;
  }
}

const capitalize = (str) => {
  return str.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};
function formatOptions(options) {
  return options?.filter((option) => {
    const description = "description" in option ? option.description : option?.descripcion;
    "value" in option ? option.value : "val" in option ? option.val : "";
    return !(description === "INDISTINTO" || description === "INDISTINTO" && "val" in option && option.val === "" || description === "TODAS");
  }).map((option) => {
    let description;
    let value;
    if ("description" in option) {
      description = he.decode(option.description);
      value = option.value || "";
    } else if ("val" in option) {
      description = option.descripcion;
      value = option.val;
    } else if ("id" in option) {
      description = he.decode(option.descripcion);
      value = option.id;
    } else {
      description = he.decode(option.descripcion);
      value = option.value || "";
    }
    return {
      label: capitalize(he.decode(description)),
      value
    };
  });
}
function formatearString(inputStr) {
  const decodedStr = decodeURIComponent(inputStr);
  const formattedStr = decodedStr.replace(/-/g, " ");
  return formattedStr;
}

const DELETE = async ({ params, request }) => {
  const data = await request.json();
  const { userId } = data;
  const { id } = params;
  if (!id) {
    return new Response(
      JSON.stringify({
        message: "La propiedad que intenta agregar a su lista de favoritos no existe.",
        success: false
      }),
      {
        status: 404
      }
    );
  }
  const user = (await db.select().from(UserTAuth).where(eq(UserTAuth.id, userId))).at(0);
  if (!userId || !user) {
    return new Response(
      JSON.stringify({
        message: "Por favor registrese para poder eliminar la propiedad de favoritos.",
        success: false
      }),
      {
        status: 404
      }
    );
  }
  try {
    const res = await db.delete(Favorite).where(and(eq(Favorite.publicationId, id), eq(Favorite.userId, userId)));
    console.log(res);
    if (res) {
      return new Response(
        JSON.stringify({
          message: "Eliminado de favoritos.",
          success: true
        })
      );
    } else {
      throw new Error("Ocurrio un problema al eliminar la propiedad de favoritos.");
    }
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: e,
        success: false
      }),
      {
        status: 404
      }
    );
  }
};
const GET = async ({ params }) => {
  const { id: userId } = params;
  const favoritesUser = [];
  const favorites = await db.select().from(Favorite).where(
    eq(Favorite.userId, userId)
  );
  console.log(favorites);
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].isEntrepreneurshipPublic) {
      const data = await fetchData(
        "resultados.emprendimientos",
        {
          ed_idl: favorites[i].publicationId
        }
      );
      favoritesUser.push(
        {
          id: data.resultado.emprendimiento[0].ed_idl,
          titulo: capitalize(data.resultado.emprendimiento[0].titulo),
          image: data.resultado.emprendimiento[0].img_princ
        }
      );
    } else {
      const data = await fetchData("fichas.propiedades", {
        id: favorites[i].publicationId,
        suc: favorites[i].publicationSuc
      });
      favoritesUser.push({
        id: data.resultado.ficha[0].in_fic,
        titulo: capitalize(he.decode(`${data.resultado.ficha[0].in_cal} ${data.resultado.ficha[0].in_nro} - ${data.resultado.ficha[0].in_tip} en ${data.resultado.ficha[0].in_loc} ${data.resultado.ficha[0].in_bar}`)),
        image: data.resultado?.ficha[0].img_princ
      });
    }
  }
  return new Response(
    JSON.stringify({
      message: "Favoritos",
      success: true,
      data: favoritesUser
    })
  );
};

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

export { _id_ as _, fetchData as a, formatOptions as b, capitalize as c, formatearString as f };
