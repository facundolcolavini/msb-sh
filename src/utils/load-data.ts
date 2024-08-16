import { fetchData } from "./fetch-data";
import type {
    APIResponseEntrepreneurship,
    EntrePreneurShip,
    Results as ResultEntrepreureShip,
  } from "@/interfaces/entrepreneurship.interfaces";
  import type {
    APIResponseResultsRecords,
    File,
  } from "@/interfaces/results.records.interfaces";
  import type { Results } from "@/interfaces/selects.form.interfaces";
import { getAllSelects } from "@/services/get-selects-form";

const cache = new Map();

export async function loadData() {
    const cacheKey = "loadData";
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    const [fichasData, emprendimientosData, selectsData] = await Promise.all([
        fetchData("fichas.destacadas") as Promise<APIResponseResultsRecords>,
        fetchData("resultados.emprendimientos") as Promise<APIResponseEntrepreneurship>,
        getAllSelects() as Promise<Results>,
    ]);

    const fichas = fichasData.resultado?.fichas || [];
    const { emprendimiento: entrepreneurship, img } = emprendimientosData.resultado || {};
    const selects = selectsData || [];

    const result = {
        fichas,
        img: img || [],
        entrepreneurship: entrepreneurship || [],
        selects,
    };

    // Cachear el resultado por un tiempo determinado
    cache.set(cacheKey, result);
    setTimeout(() => cache.delete(cacheKey), 10 * 60 * 1000); // Cache por 10 minutos

    return result;
}
