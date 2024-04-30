export interface AdditionalParams {
  [key: string]: string | number;
}

interface CachedData {
  [key: string]: any;
}

const API_BASE_URL = 'https://xintel.com.ar/api';
const cache: CachedData = {};

export async function fetchData<T>(
  endpoint: string,
  queryParams?: AdditionalParams
): Promise<T> {

  const { INM, APIK } = import.meta.env;

  if (!INM || !APIK) {
    throw new Error('Se requieren las claves INM y APIK en el archivo .env');
  }

  const cacheKey = `${endpoint}-${JSON.stringify(queryParams || {})}`;
  if (cache[cacheKey]) {
    return cache[cacheKey] as T;
  }

  // Set url with INM and APIK   e.set("apikey", c + ".maps." + q);
  const url = new URL(`${API_BASE_URL}?json=${endpoint}`);
  const authParams = { inm: INM, apiK: APIK };

  Object.keys(authParams).forEach(key =>
    url.searchParams.set(key, String(authParams[key as keyof typeof authParams]))
  );

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );
  }

  try {
    const controller = new AbortController();
    const signal = controller.signal; 
    const response = await fetch(url.toString() , { signal });
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    const res = (await response.json()) as T;
    cache[cacheKey] = res;
    return res;
  } catch (error) {
    console.error('Error de red:', error);
    throw error;
  }
}
