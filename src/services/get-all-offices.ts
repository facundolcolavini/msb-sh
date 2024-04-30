// entrepreneurships.service.ts

import type { APIResponseOffices, ResultsOffice } from "@/interfaces/offices.interface";
import { fetchData } from "@/utils/fetch-data";


const endpoint = 'datos.paginaweb';

export const getAllOffices = async (): Promise<ResultsOffice> => {
  try {
    const res = await fetchData(endpoint) as APIResponseOffices;
    return res.resultado;
  } catch (error) {
    console.error('Error fetching offices data:', error);
    throw error;
  }
};
