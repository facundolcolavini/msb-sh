import type { APIResponseResultsRecords, Result } from "@/interfaces/results.records.interfaces";
import { fetchData } from "@/utils/fetch-data";

const endpoint = 'resultados.fichas';

export const getResultsRecords = async (queryParams?:Record<string, string>):Promise<Result> => {
    try {
        const res = await fetchData(endpoint, queryParams) as APIResponseResultsRecords;
        return res.resultado;

    } catch (error) {
        console.error('Error fetching Records data:', error);
        throw error;
    }
}