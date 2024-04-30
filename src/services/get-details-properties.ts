import { fetchData } from "@/utils/fetch-data";

import type { APIResponsePropertyDetail, ResultPropertyDetails } from "@/interfaces/detail.properties.interface";

const endpoint = 'fichas.propiedades';

export const getDetailsProperties = async (queryParams?:Record<string, string>):Promise<ResultPropertyDetails> => {
    try {
        const res = await fetchData(endpoint, queryParams) as APIResponsePropertyDetail;
        console.log(res,'data')
        return res.resultado;

    } catch (error) {
        console.error('Error fetching Records data:', error);
        throw error;
    }
}