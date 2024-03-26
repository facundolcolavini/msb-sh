
import type { APIResponseLocations, APIResponseSelects, ResultLocation, Results } from "@/interfaces/selects.form.interfaces";
import { fetchData } from "@/utils/fetch-data";



export const getAllSelects = async (queryParams?:Record<string, string>): Promise<Results> => {
    const endpoint = 'datos.select.buscador';
    try{
        const res = await fetchData(endpoint,queryParams) as APIResponseSelects;
        return res.resultado;
    } catch (error) {
        console.error('Error fetching selects data:', error);
        throw error;
    }
}

export const getLocations = async (queryParams?:Record<string, string>): Promise<ResultLocation> => {
    const endpoint = 'fichas.ubicaciones';
    try{
        const res = await fetchData(endpoint,queryParams) as APIResponseLocations;
        return res.resultado;
    } catch (error) {
        console.error('Error fetching selects data:', error);
        throw error;
    }
}

export const getAllSelectsEntrepreneurship = async (queryParams?:Record<string, string>): Promise<any> => {
    const endpoint = 'datos.select.buscador.emprendimientos';
    try{
        const res = await fetchData(endpoint,queryParams) as any;
        return res.resultado;
    } catch (error) {
        console.error('Error fetching selects data:', error);
        throw error;
    }
}
