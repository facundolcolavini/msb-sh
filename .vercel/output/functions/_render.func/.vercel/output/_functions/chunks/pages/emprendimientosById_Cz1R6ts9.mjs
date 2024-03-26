import { a as fetchData } from './_id__DBX5VZxJ.mjs';

const GET = async ({ url }) => {
  const queryParams = {};
  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  try {
    const data = await fetchData("ficha.emprendimientos", queryParams);
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
