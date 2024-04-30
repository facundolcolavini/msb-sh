import type { Default } from "@/interfaces/selects.form.interfaces";

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
  ordenar: [
    { value: 'preciomenor', label: 'Menor precio' },
    { value: 'preciomayor', label: 'Mayor precio' },
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
  { label: 'rppagina', isLocation: false, isDefault: true },
  { label: 'ordenar', isLocation: false, isDefault: true }
]
export const labelMappingResultForQuerys = {
  'ambientes': 'Ambientes',
  'localidades': 'sellocalidades',
  'barrio': 'barrios1',
  'operacion': 'tipo_operacion',
  'tipo': 'tipo_inmueble',
  'ubicaciones': 'ubicaciones', // Este se actualizará más adelante
};
// Nombre de los selects 
export const filterEntrePreneurshipToFillDefault = [
  { label: 'ed_est', isLocation: false, isDefault: true },
  { label: 'tipo', isLocation: false, isDefault: false },
  { label: 'localidad', isLocation: false, isDefault: false },
  { label: 'barrio', isLocation: false, isDefault: false },
  { label: 'calles', isLocation: false, isDefault: false },
  { label: 'categoria', isLocation: false, isDefault: false },
  { label: 'valor', isLocation: false, isDefault: false },

]
// Se usa para renombrar propiedades
export const labelMappingEntrePreneurshipForQuerys = {
  'tipo': 'ed_tip',
  'localidad': 'ed_loc',
  'barrio': 'ed_bar',
  'calles': 'ed_cal',
  'categoria': 'ed_cat',
  'operacion': 'tipo_operacion',
  'valor_maximo': 'valor_hasta',
  'valor_minimo': 'valor_desde'
};
