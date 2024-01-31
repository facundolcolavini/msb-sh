import type { Location, Neighborhood, Option, Value } from "../interfaces/selects.form.interfaces";

// Función para capitalizar la primera letra de cada palabra
export const capitalize = (str: string): string => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };


// Función para formatear los datos  devulevos por la API a label y value y omitir ALL INIDISTINTO Y TODAS.
// Input: {description: string, value | val: string}[]
// Output: {label: string, value: string }[]

export type InputOption = Option | Neighborhood | Value | Location;
export type OutputOption = { label: string, value: string };

export function formatOptions(options: InputOption[]): OutputOption[] {
  return options
    .filter(option => {
      const description = 'description' in option ? option.description : option?.descripcion;
      const value = 'value' in option ? option.value : ('val' in option ? option.val : '');
      return !(description === "INDISTINTO" && value === "All" || description === "INDISTINTO" && ('val' in option) && option.val === "" || description === "TODAS" && value === "All") ;
    })
    .map((option) => {
      let description: string;
      let value: string;
      if ('description' in option) {
        description = option.description;
        value = option.value || '';
      } else if ('val' in option) {
        description = option.descripcion;
        value = option.val;
      } else if ('id' in option) {
        description = option.descripcion;
        value = option.id;
      }
      else {
        description = option.descripcion;
        value = option.value || '';
      }
      return {
        label: capitalize(description.toLowerCase()),
        value: value,
      };
    });
}

