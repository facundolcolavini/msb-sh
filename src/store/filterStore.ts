/* 
Store que manejara el estado de los filtros de la busqueda en el home y resultados de busqueda y emprendimientos
 Se podra acceder a este store desde cualquier componente de la aplicacion
 Se puede reiniciar el estado de los filtros desde cualquier componente de la aplicacion
 Se puede agregar un filtro desde cualquier componente de la aplicacion

*/

import type { OutputOption } from '@/utils/formats';
import { atom, map } from 'nanostores';

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
export const filterItems = map<Filters>();
export const searchParamsStore = atom<string>('');

/* Agrega los valores de los filtros seleccionados */
export const addFilterValue = (filter: Filters) => {
  filterItems.set({ ...filterItems.get(), ...filter });

  const currentSearchParams = new URLSearchParams(searchParamsStore.get());

  Object.entries(filter).forEach(([key, value]) => {
    if (value && value.value !== null && value.value !== undefined && value.value !== '') {
      currentSearchParams.set(key, value.value);
    } else {
      currentSearchParams.delete(key);
    }
  });

  searchParamsStore.set(currentSearchParams.toString().replace(/&?[^=&]+=All/g, ''));
};

/* Reinicia el estado de los filtros */
export const resetFilter = async (filter: Filters) => {
  filterItems.set(filter);

  const defaultSearchParams = new URLSearchParams();
  Object.keys(filter).forEach((key) => {
    const paramValue = filter[key as keyof typeof filter];
    if (paramValue && paramValue.value !== null && paramValue.value !== undefined && paramValue.value !== '') {
      defaultSearchParams.set(key, paramValue.value);
    }
  });

  await searchParamsStore.set(defaultSearchParams.toString().replace(/&?[^=&]+=All/g, ''));
}

