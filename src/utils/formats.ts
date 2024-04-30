import type { Location, Neighborhood, Option, Value } from "@/interfaces/selects.form.interfaces";
import he from "he";

// Función para capitalizar los strings de los selects Lujan y San Pedro
export const capitalize = (str: string): string => {
  return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};


// Función para formatear los datos  devulevos por la API a label y value y omitir ALL INIDISTINTO Y TODAS.
// Input: {description: string, value | val: string}[]
// Output: {label: string, value: string }[]

export type InputOption = Option | Neighborhood | Value | Location;
export type OutputOption = { label: string, value: string };

export function formatOptions(options: InputOption[]): OutputOption[] {
  return options
    ?.filter(option => {
      const description = 'description' in option ? option.description : option?.descripcion;
      const value = 'value' in option ? option.value : ('val' in option ? option.val : '');
      return !(description === "INDISTINTO" /* && value === "All" */ || description === "INDISTINTO" && ('val' in option) && option.val === "" || description === "TODAS" /* && value === "All" */);
    })
    .map((option) => {
      let description: string;
      let value: string;
      if ('description' in option) {
        description = he.decode(option.description);
        value = option.value || '';
      } else if ('val' in option) {
        description = option.descripcion;
        value = option.val;
      } else if ('id' in option) {
        description = he.decode(option.descripcion);
        value = option.id;
      }
      else {
        description = he.decode(option.descripcion);
        value = option.value || '';
      }
      return {
        label: capitalize(he.decode(description)),
        value: value,
      };
    });
}

/* 
Input: Av.%20Presidente%20Peron%20al%2010200
Output Av. Presidente Peron al 10200
*/

export function formatearString(inputStr: string): string {
  // Decodificar los caracteres especiales
  const decodedStr = decodeURIComponent(inputStr);

  // Reemplazar los guiones con espacios
  const formattedStr = decodedStr.replace(/-/g, ' ');

  return formattedStr;
}