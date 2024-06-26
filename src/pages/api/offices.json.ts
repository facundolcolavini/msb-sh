import type { APIResponseOffices } from "@/interfaces/offices.interface";
import { fetchData } from "@/utils/fetch-data";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
    // Extrae los parámetros de consulta de la URL
    const queryParams: Record<string, string | number> = {};

    url.searchParams.forEach((value, key) => {
        queryParams[key] = value;
    });

    try {
        const data = await fetchData<APIResponseOffices>('datos.paginaweb', queryParams);
        return new Response(JSON.stringify(data)
            , {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                    
                }
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
