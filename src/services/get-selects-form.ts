

import type { APIResponseLocations, APIResponseSelects, ResultLocation, Results } from "src/interfaces/selects.form.interfaces";
import { fetchData } from "../utils/fetch-data";



export const getAllSelects = async (): Promise<Results> => {
    const endpoint = 'datos.select.buscador';
    try {
        const res = await fetchData(endpoint) as APIResponseSelects;
        return res.resultado;
    } catch (error) {
        console.error('Error fetching selects data:', error);
        throw error;
    }
}

export const getLocations = async (): Promise<ResultLocation> => {
    const endpoint = 'fichas.ubicaciones';
    try {
        const res = await fetchData(endpoint) as APIResponseLocations;
        return res.resultado;
    } catch (error) {
        console.error('Error fetching selects data:', error);
        throw error;
    }
}

