import { fetchData } from "@utils/fetch-data";
import type { APIResponseResultsRecords, Result } from "@interfaces/results.records.interfaces";

const endpoint = 'fichas.propiedades';

export const getDetailsProperties = async (queryParams?:Record<string, string>):Promise<Result> => {
    try {
        const res = await fetchData(endpoint, queryParams) as APIResponseResultsRecords;
        return res.resultado;

    } catch (error) {
        console.error('Error fetching Records data:', error);
        throw error;
    }
}