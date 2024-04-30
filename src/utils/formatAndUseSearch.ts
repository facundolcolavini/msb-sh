import type { FilterDefault, FilterSelects, OutPutValuesFilter } from "@/interfaces/selects.form.interfaces";
import { formatOptions, type InputOption } from "./formats";

const formatAndUseSearch = (filters: FilterSelects, filterToFill: FilterDefault[], labelMapping: Record<string, string>): OutPutValuesFilter => {
  let filterValues: OutPutValuesFilter = {};

  filterToFill?.map((filter): void => {
    let label = labelMapping[filter?.label as keyof typeof labelMapping] || filter.label;

    if (filter.isLocation) {
      // Encuentra la ubicación correspondiente en el array de ubicaciones
      filterValues[label] = formatOptions(filters.locations.ubicaciones);
    } else if (filter.isDefault) {
      filterValues[filter.label] = filters.default[filter.label];
    } else {
      // Manejo especial para valor en selects
      if (filter.label === 'valor') {
        // si en mapping esta valor_minimo o maximo cambiarlo reenombrarlo con el value del mapping 
        if (labelMapping['valor_minimo'] && labelMapping['valor_maximo']) {
          filterValues[labelMapping['valor_minimo']] = formatOptions(filters.selects[filter.label]?.desde as InputOption[]);
          filterValues[labelMapping['valor_maximo']] = formatOptions(filters.selects[filter.label]?.hasta as InputOption[]);
        } else {

          filterValues['valor_minimo'] = formatOptions(filters.selects[filter.label]?.desde as InputOption[]);
          filterValues['valor_maximo'] = formatOptions(filters.selects[filter.label]?.hasta as InputOption[]);
        }
      } else {
        filterValues[label] = formatOptions(filters.selects[filter.label] as InputOption[]);
      }
    }
  });

  // Cambiar el nombre de la propiedad 'ubicaciones' a 'in_iub' o 'ed_iub' si están presentes en filterToFill
  if (filterToFill.some(f => f.label === 'in_iub') && filterValues.hasOwnProperty('ubicaciones')) {
    filterValues['in_iub'] = filterValues['ubicaciones'];
    delete filterValues['ubicaciones'];
  } else if (filterToFill.some(f => f.label === 'ed_iub') && filterValues.hasOwnProperty('ubicaciones')) {
    filterValues['ed_iub'] = filterValues['ubicaciones'];
    delete filterValues['ubicaciones'];
  }

  return filterValues;
};

export { formatAndUseSearch };
