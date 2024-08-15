import type {
    APIResponseEntrepreneurship
} from "@/interfaces/entrepreneurship.interfaces";
import type { APIResponseResultsRecords } from "@/interfaces/results.records.interfaces";
import type { Results } from "@/interfaces/selects.form.interfaces";
import { getAllSelects } from "@/services/get-selects-form";
import NodeCache from "node-cache";
import { fetchData } from "./fetch-data";
const cache = new NodeCache({ stdTTL: 600 }); // Cache TTL de 10 minutos

export async function loadData() {
    const cacheKey = "loadData";
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
        return cachedData;
    }

    const { resultado } = await fetchData("fichas.destacadas") as APIResponseResultsRecords;;
    const { fichas } = resultado;
    const { resultado: resEmprendimientos } = await fetchData("resultados.emprendimientos") as APIResponseEntrepreneurship;
    const { emprendimiento: entrepreneurship, img } = resEmprendimientos;
    const selects = await getAllSelects()  as Results;

    const data = {
        fichas: fichas || [],
        img: img || [],
        entrepreneurship: entrepreneurship || [],
        selects: selects || []
    };

    cache.set(cacheKey, data); // Cachea los datos
    return data;
}
