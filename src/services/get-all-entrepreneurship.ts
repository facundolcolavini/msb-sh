// entrepreneurships.service.ts
import { fetchData, type AdditionalParams } from '@/utils/fetch-data';
import type { APIResponseEntrepreneurship, Results as EntrepreneurshipResult } from '@/interfaces/entrepreneurship.interfaces.ts';
const endpoint = 'resultados.emprendimientos';

export const getAllEntrepreneurships = async (): Promise<EntrepreneurshipResult> => {
  try {
    const res = await fetchData(endpoint) as APIResponseEntrepreneurship;
    return res.resultado;
  } catch (error) {
    console.error('Error fetching entrepreneurship data:', error);
    throw error;
  }
};

// Get by ID 
export const getEntrepreneurshipById = async (id :string): Promise<EntrepreneurshipResult> => {
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