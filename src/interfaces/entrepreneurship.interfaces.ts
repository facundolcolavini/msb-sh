export interface APIResponseEntrepreneurship {
    resultado: Results;
}

export interface EntrePreneurShip {
    ed_nom: string;
    ed_idl: string;
    ed_pre: string;
    ed_com: string;
    ed_cue: string;
    ed_est: string;
    ed_asp: string;
    ed_pos: string;
    ed_po1: string;
    fechaac: string;
    ed_loc: string;
    ed_bar: string;
    ed_pro: string;
    ed_des: string;
    ed_tip: string;
    ed_vid: string;
    ed_cal: string;
    ed_nro: string;
    ed_bco: string;
    ed_url: string;
    ed_dir: string;
    ed_dir_mai: string;
    ed_adm: string;
    ed_int: string;
    ed_act: string;
    ed_efm: string;
    ed_ord: string;
    ed_cat: string;
    ed_arq: string;
    ed_asc: string;
    ed_suc: string;
    ed_fpa: string;
    ed_fra: string;
    ed_amb: string;
    ed_am2: string;
    ed_am3: string;
    ed_am4: string;
    ed_am5: string;
    ed_ful: string;
    ed_iub: string;
    id_zona_uruguay: string;
    ed_czp: string;
    valor_desde: string;
    valor_hasta: string;
    valor_m2: string;
    porcentaje_boleto: string;
    porcentaje_cuotas: string;
    cantidad_cuotas: string;
    de_terceros: string;
    muestra_street_view: string;
    muestra_map: string;
    propietario_id: string;
    created: string;
    codsuc: string;
    codemp: string;
    ed_vwe: string;
    ed_op: string;
    ed_pdf: string;
    ed_coo: string;
    eliminado: string;
    apto_financiacionEmprendimiento: string;
    tipo: string;
    link: string;
    img_princ: string;
    amigable: string;
    titulo: string;
}
export interface Results {
    datos: Datos;
    emprendimiento: EntrePreneurShip[];
    img: Array<string[]>;
    query: null;
}

export interface Datos {
    codemp: string;
    consulta: string;
    cantidad: number;
}
