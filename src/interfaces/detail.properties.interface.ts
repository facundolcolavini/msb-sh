import type { UnitAvailable } from "./entrepreneurship.interfaces";

export interface APIResponsePropertyDetail  {
    resultado: ResultPropertyDetails;
}

export interface ApiError {
    error: string;
}

export interface ResultPropertyDetails {
    datos:                                    Datos;
    emprendimiento:                         UnitAvailable, // This is a dictionary
    videos:                                   Video[];
    provincia:                                string;
    ficha:                                    { [key: string]: string }[];
    caracteristicas:                          Caracteristicas;
    plano:                                    string;
    img:                                      string[];
    valores_temporarios:                      Caracteristicas;
    caracteristicas_generales:                string[];
    caracteristicas_personalizadas:           string[];
    caracteristicas_generales_personalizadas: string[];
    estadia:                                  Estadia;
    dormitorios:                              null;
    normas:                                   null;
    guardias:                                 any[];
    superficie:                               Superficie;
    medidas:                                  Caracteristicas;
    sucursales:                               Sucursale[];
}

export interface Caracteristicas {
    cantidad: number;
}

export interface Datos {
    codemp:       string;
    codigo_ficha: string;
}

export interface Estadia {
    id:                   string;
    inmueble_id:          string;
    estadia_minima:       string;
    tipo_habitacion:      string;
    reserva_instantanea:  string;
    arribo_en_dia:        string;
    arribo_sabado:        string;
    cant_dias_arribo:     string;
    checkin:              string;
    checkin_hasta:        string;
    checkout:             string;
    checkout_hasta:       string;
    valor_diario:         string;
    gasto_administrativo: string;
    valor_limpieza:       string;
    valor_deposito:       string;
    descuento_semanal:    string;
    descuento_quincenal:  string;
    descuento_mensual:    string;
    temporada_alta_ini:   Date;
    temporada_alta_fin:   Date;
    reglamento:           string;
    politica_cancelacion: string;
    codsuc:               string;
    codemp:               string;
}

export interface Sucursale {
    muestraFotoOperador:        string;
    apiKeyGMaps:                string;
    redondeaDireccionPropiedad: string;
}

export interface Superficie {
    title:    string[];
    dato:     string[];
    cantidad: number;
}

export interface Video {
    id:          string;
    inmueble_id: string;
    video_url:   string;
    orden:       string;
    created:     Date;
    modified:    Date;
    codsuc:      string;
    codemp:      string;
}