import type { OutputOption } from "@/utils/formats";


export interface APIResponseSelects {
    resultado: Results;
}

export interface Results {
    barrio:       Neighborhood[];
    operacion:    Option[];
    tipo:         Option[];
    paises:       Option[];
    ambientes:    Option[];
    edificios:    Option[];
    localidades:  Option[];
    partidos:     Option[];
    rio:          Option[];
    regiones:     Option[];
    ocupacion:    Option[];
    select_calle: string;
    calles:       Option[];
    provincia:    Option[];
    valor:        ValueRange;
    codsuc:       Option[];
    ambientes2:   Option[];
    ambientes3:   Option[];
    ambientes4:   Option[];
    ambientes5:   Option[];
    [key: string]: string | Option[] | ValueRange | Neighborhood[];
}



export interface Option { description: string, value?: string, val?: string };

export interface Neighborhood {
    value:       string;
    descripcion: string;
    data?:       string;
}

export interface ValueRange {
    desde: Value[];
    hasta: Value[];
}

export interface Value {
    val:         string;
    descripcion: string;
}


/* Ubicaciones */

export interface APIResponseLocations {
    resultado: ResultLocation;
}

export interface ResultLocation {
    ubicaciones: Location[];
}

export interface Location {
    id:          string;
    idU:         string;
    descripcion: string;
}
/* Para la logica de los filtros */
export type Default = Record<string, OutputOption[]>;
export interface FilterSelects {
    selects: Results;
    locations:  ResultLocation;
    default: Default;
  }

  export type FilterDefault = {
    label: string;
    isLocation?: boolean;
    isDefault?: boolean;
  };

  export type OutPutValuesFilter = {
    [key: string]: OutputOption[];
  };