export interface APIResponseOffices {
    resultado: ResultsOffice;
}

export interface ResultsOffice {
    sucursales: Office[];
}

export interface Office {
    muestraFotoOperador:        string;
    apiKeyGMaps:                string;
    redondeaDireccionPropiedad: string;
    enlaceFacebook:             string;
    enlaceTwitter:              string;
    enlaceInstagram:            string;
    enlaceLinkedin:             string;
    enlaceYoutube:              string;
    enlacePinterest:            string;
    enlaceSkype:                string;
    numeroWhatsapp:             string;
    direccionPaginaWeb:         string;
    telefonoPaginaWeb:          string;
    correoPaginaWeb:            string;
    nombreSucursalPaginaWeb:    string;
}