/* 
Store que manejara el estado de los filtros de la busqueda en el home y resultados de busqueda y emprendimientos
 Se podra acceder a este store desde cualquier componente de la aplicacion
 Se puede reiniciar el estado de los filtros desde cualquier componente de la aplicacion
 Se puede agregar un filtro desde cualquier componente de la aplicacion

*/


import { atom, map } from 'nanostores';
import type { OutputOption } from 'src/utils/formats';

export type Filters = {
  [key: string]: OutputOption
}


/* 
{
    tipo : {label: 'tipo', value: 'tipo'},
    categoria: {label: 'categoria', value: 'categoria'},
}
*/
/* Store de filtros */
export const filterItems = map<Filters>({});
export const searchParamsStore = atom<string>('');

/* Agrega los valores de los filtros seleccionados */
export const addFilterValue = (filter: Filters) => {
  filterItems.set({ ...filterItems.get(), ...filter });
  /* Guarda tambien el search Params de los values de cada filtro key=value&key=value */
  const currentSearchParams = new URLSearchParams(searchParamsStore.get());

  Object.keys(filter).forEach((key) => {
    const paramValue = filter[key as keyof typeof filter];
    if (paramValue && paramValue.value !== null && paramValue.value !== undefined && paramValue.value !== '') {
      currentSearchParams.set(key, paramValue.value);
    } else {
      currentSearchParams.delete(key);
    }
  });
  searchParamsStore.set(currentSearchParams.toString().replace(/&?[^=&]+=All/g, ''));

}

/* Reinicia el estado de los filtros */
export const resetFilter = async (filter: Filters) => {
  filterItems.set(filter);
  // Resetea el searchParams mirando los valores distintos que tenemos en el store y en los filtros que se pasan por  parametro que son los que tienen que quedar


  const currentSearchParams = new URLSearchParams(searchParamsStore.get());

  // Eliminar los parámetros que no están presentes en los filtros
  for (const key of currentSearchParams.keys()) {
    if (!(key in filter)) {
      currentSearchParams.delete(key);
    }
  }

  // Agregar o actualizar los parámetros según los filtros
  Object.keys(filter).forEach((key) => {
    const paramValue = filter[key as keyof typeof filter];
    if (paramValue && paramValue.value !== null && paramValue.value !== undefined && paramValue.value !== '') {
      currentSearchParams.set(key, paramValue.value);
    } else {
      currentSearchParams.delete(key);
    }
  });

  // Actualizar el estado de searchParamsStore
  await searchParamsStore.set(currentSearchParams.toString().replace(/&?[^=&]+=All/g, ''));



}

