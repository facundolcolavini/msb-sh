import type { Default } from "@interfaces/selects.form.interfaces";

  /* B= Barrio Cerrado
  T= Country
  P= Parque Industrial
  L= Loteo
  E= Edificio */

export const defaultsFilters: Default = {

  in_tpr: [
    {
      value: "COUNTRY",
      label: "Barrios Cerrados y Countries",
    },
  ],
  ed_tip: [
    {
      value: "E",
      label: "Edificio"
    },
    {
      value: "P",
      label: "Parque Industrial"
    },
    {
      value: "L",
      label: "Loteo"
    },
    {
      value: "B",
      label: "Barrio Cerrado"
    },
    {
      value: "T",
      label: "Country"
    }
  ],
  ed_est: [
    {
      value: "En Pozo",
      label: "En Pozo",
    },
    {
      value: "En Construccion",
      label: "En Construcción",
    },
    {
      value: "Terminado",
      label: "Terminado",
    },

  ],
  moneda: [
    {
      value: "P",
      label: "Pesos",
    },
    {
      value: "D",
      label: "U$D",
    },
  ],
  rppagina: [{ value: '15', label: '15' }]

}

export const filterResultToFill = [
  { label: 'barrio', isLocation: false, isDefault: false },
  { label: 'operacion', isLocation: false, isDefault: false },
  { label: 'tipo', isLocation: false, isDefault: false },
  { label: 'ambientes', isLocation: false, isDefault: false },
  { label: 'calles', isLocation: false, isDefault: false },
  { label: 'localidades', isLocation: false, isDefault: false },
  { label: 'ubicaciones', isLocation: true, isDefault: false },
  { label: 'in_iub', isLocation: true, isDefault: false },
  { label: 'in_tpr', isLocation: false, isDefault: true },
  { label: 'valor', isLocation: false, isDefault: false },
  { label: 'moneda', isLocation: false, isDefault: true },
  { label: 'rppagina', isLocation: false, isDefault: true }
]
export const labelMappingResultForQuerys = {
  'ambientes': 'Ambientes',
  'localidades': 'sellocalidades',
  'barrio': 'barrios1',
  'operacion': 'tipo_operacion',
  'tipo': 'tipo_propiedad',
  'ubicaciones': 'ubicaciones', // Este se actualizará más adelante
};
// Nombre de los selects 
export const filterEntrePreneurshipToFillDefault = [
/*   { label: 'tipo', isLocation: false, isDefault: false }, */
  { label: 'ed_est', isLocation: false, isDefault: true },
  { label: 'ed_tip', isLocation: false, isDefault: true },
  { label: 'ambientes', isLocation: false, isDefault: false },
  { label: 'localidades', isLocation: false, isDefault: false },
  { label: 'ubicaciones', isLocation: true, isDefault: false },
  { label: 'ed_iub', isLocation: true, isDefault: false },
  { label: 'valor', isLocation: false, isDefault: false },
  { label: 'moneda', isLocation: false, isDefault: true },
/*   { label: 'rppagina', isLocation: false, isDefault: true } */

]
// Se usa para renombrar propiedades
export const labelMappingEntrePreneurshipForQuerys = {
  'ambientes': 'ed_amb',
  'localidades': 'ed_loc',
  'operacion': 'tipo_operacion',
  'ubicaciones': 'ed_iub', // Este se actualizará más adelante
  'valor_maximo': 'valor_hasta',
  'valor_minimo': 'valor_desde'
};
