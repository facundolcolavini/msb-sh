// entrepreneurships.service.ts

import type { APIResponseEntrepreneurship, Results } from "@/interfaces/entrepreneurship.interfaces";
import { fetchData } from "@/utils/fetch-data";


const endpoint = 'resultados.emprendimientos';

export const getAllEntrepreneurships = async (): Promise<Results> => {
  try {
    const res = await fetchData(endpoint) as APIResponseEntrepreneurship;
    return res.resultado;
  } catch (error) {
    console.error('Error fetching entrepreneurship data:', error);
    throw error;
  }
};

// Get by ID 
export const getEntrepreneurshipById = async (id :string): Promise<Results> => {
  const queryParams = {
    ed_idl: id.toString(),
  };
  try {
    const res = await fetchData(endpoint, queryParams) as APIResponseEntrepreneurship;
    return res.resultado;
  } catch (error) {
    console.error('Error fetching entrepreneurship data:', error);
    throw error;
  }
}