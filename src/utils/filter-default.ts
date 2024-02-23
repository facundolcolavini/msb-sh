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
  ed_est: [
    {
      label: 'En Construccion',
      value: 'En Construccion'
    },
    {
      label: 'Terminado',
      value: 'Terminado'
    },
    {
      label: 'En Pozo',
      value: 'En Pozo'
    },
    {
      label: 'A Estrenar',
      value: 'A Estrenar'
    }
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
{ label: 'ed_est' , isLocation: false, isDefault: true},
/*   { label: 'estado', isLocation: false, isDefault: true }, */
  { label: 'tipo', isLocation: false, isDefault: false },
  { label: 'ambientes', isLocation: false, isDefault: false },
  { label: 'localidad', isLocation: false, isDefault: false },
/*   { label: 'ubicaciones', isLocation: true, isDefault: false }, */
  { label: 'ed_iub', isLocation: true, isDefault: false },
  { label: 'valor', isLocation: false, isDefault: false },
  { label: 'moneda', isLocation: false, isDefault: true },
/*   { label: 'rppagina', isLocation: false, isDefault: true } */

]
// Se usa para renombrar propiedades
export const labelMappingEntrePreneurshipForQuerys = {
  'tipo': 'ed_tip',
  'ambientes': 'ed_amb',
  'localidad': 'ed_loc',
  'operacion': 'tipo_operacion',
  'ubicaciones': 'ed_iub', // Este se actualizará más adelante
  'valor_maximo': 'valor_hasta',
  'valor_minimo': 'valor_desde'
};
