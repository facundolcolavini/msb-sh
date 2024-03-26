import { f as fetchData } from './_propiedad__BEPChswL.mjs';

const GET = async ({ url }) => {
  const queryParams = {};
  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  try {
    const data = await fetchData("datos.select.buscador", queryParams);
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

export { GET };
