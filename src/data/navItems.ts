import type { NavI } from "@/interfaces/navbar.interfaces";


export const buyNavItems: NavI[] = [
  {
    label: 'Comprar',
    href: '#',
    icon: 'home-2',
    dropdown: [
      { label: 'Ubicación', category: 'buy-location', isTitle: true },
      { label: 'Capital Federal', category: 'buy-location', href: '/comprar/capital-federal' },
      { label: 'GBA Oeste', category: 'buy-location', href: '/comprar/gba-oeste' },
      { label: 'GBA Sur', category: 'buy-location', href: '/comprar/gba-sur' },
      { label: 'GBA Norte', category: 'buy-location', href: '/comprar/gba-norte' },
      { label: 'Tipo de propiedad', category: 'buy-kind-of-property', isTitle: true },
      { label: 'Casas', category: 'buy-kind-of-property', href: '/comprar/casas' },
      { label: 'Departamentos', category: 'buy-kind-of-property', href: '/comprar/departamentos' },
      { label: 'Galpones', category: 'buy-kind-of-property', href: '/comprar/galpones' },
      { label: 'Cocheras', category: 'buy-kind-of-property', href: '/comprar/cocheras' },
      { label: 'Locales', category: 'buy-kind-of-property', href: '/comprar/locales' },
      { label: 'Oficinas', category: 'buy-kind-of-property', href: '/comprar/oficinas' },
      { label: 'Campos', category: 'buy-kind-of-property', href: '/comprar/campos' },
      { label: 'Quintas', category: 'buy-kind-of-property', href: '/comprar/quintas' },
      { label: 'Lotes', category: 'buy-kind-of-property', href: '/comprar/lotes' },
      { label: 'Cantidad de ambientes', category: 'buy-number-of-environments', isTitle: true },
      { label: 'Monoambiente', category: 'buy-number-of-environments', href: '/comprar/monoambiente' },
      { label: '2 ambientes', category: 'buy-number-of-environments', href: '/comprar/2-ambientes' },
      { label: '3 ambientes', category: 'buy-number-of-environments', href: '/comprar/3-ambientes' },
      { label: '4 ambientes', category: 'buy-number-of-environments', href: '/comprar/4-ambientes' },
      { label: '5 ambientes', category: 'buy-number-of-environments', href: '/comprar/5-ambientes' },
      { label: '6 ambientes', category: 'buy-number-of-environments', href: '/comprar/6-ambientes' },
      { label: '7 o más ambientes', category: 'buy-number-of-environments', href: '/comprar/7-mas-ambientes' },
      { label: 'Ayuda', category: 'buy-help', isTitle: true },
      { label: '¿Qué necesito para comprar?', category: 'buy-help', href: '/comprar/ayuda-para-comprar' },
      { label: 'Guía de Barrios', category: 'buy-help', href: '/comprar/guia-de-barrios' },
    ],
  },
]

export const rentNavItems: NavI[] = [
  {
    label: 'Alquilar',
    href: '#',
    icon: 'home-2',
    dropdown: [
      { label: 'Ubicación', category: 'rent-location', isTitle: true },
      { label: 'Capital Federal', category: 'rent-location', href: '/alquilar/capital-federal' },
      { label: 'GBA Oeste', category: 'rent-location', href: '/alquilar/gba-oeste' },
      { label: 'GBA Sur', category: 'rent-location', href: '/alquilar/gba-sur' },
      { label: 'GBA Norte', category: 'rent-location', href: '/alquilar/gba-norte' },
      { label: 'Tipo de propiedad', category: 'rent-kind-of-property', isTitle: true },
      { label: 'Casas', category: 'rent-kind-of-property', href: '/alquilar/casas' },
      { label: 'Departamentos', category: 'rent-kind-of-property', href: '/alquilar/departamentos' },
      { label: 'Galpones', category: 'rent-kind-of-property', href: '/alquilar/galpones' },
      { label: 'Cocheras', category: 'rent-kind-of-property', href: '/alquilar/cocheras' },
      { label: 'Locales', category: 'rent-kind-of-property', href: '/alquilar/locales' },
      { label: 'Oficinas', category: 'rent-kind-of-property', href: '/alquilar/oficinas' },
      { label: 'Campos', category: 'rent-kind-of-property', href: '/alquilar/campos' },
      { label: 'Quintas', category: 'rent-kind-of-property', href: '/alquilar/quintas' },
      { label: 'Lotes', category: 'rent-kind-of-property', href: '/alquilar/lotes' },
      { label: 'Cantidad de ambientes', category: 'rent-number-of-environments', isTitle: true },
      { label: 'Monoambiente', category: 'rent-number-of-environments', href: '/alquilar/monoambiente' },
      { label: '2 ambientes', category: 'rent-number-of-environments', href: '/alquilar/2-ambientes' },
      { label: '3 ambientes', category: 'rent-number-of-environments', href: '/alquilar/3-ambientes' },
      { label: '4 ambientes', category: 'rent-number-of-environments', href: '/alquilar/4-ambientes' },
      { label: '5 ambientes', category: 'rent-number-of-environments', href: '/alquilar/5-ambientes' },
      { label: '6 ambientes', category: 'rent-number-of-environments', href: '/alquilar/6-ambientes' },
      { label: '7 o más ambientes', category: 'rent-number-of-environments', href: '/alquilar/7-mas-ambientes' },
      { label: 'Ayuda', category: 'rent-help', isTitle: true },
      { label: '¿Qué necesito para alquilar?', category: 'rent-help', href: '/alquilar/ayuda-para-alquilar' },
      { label: 'Guía de Barrios', category: 'rent-help', href: '/alquilar/guia-de-barrios' },
    ],
  }

]

export const renKindPropertyNavmenu: NavI[] = [
  {
    label: 'Alquiler Temporario',
    href: '#',
    icon: 'home-2',
    dropdown: [
      { label: 'Ubicación', category: 'temporary-rent-location', isTitle: true },
      { label: 'Capital Federal', category: 'temporary-rent-location', href: '/alquiler-temporario/quintas/capital-federal' },
      { label: 'GBA Oeste', category: 'temporary-rent-location', href: '/alquiler-temporario/quintas/gba-oeste' },
      { label: 'GBA Sur', category: 'temporary-rent-location', href: '/alquiler-temporario/quintas/gba-sur' },
      { label: 'GBA Norte', category: 'temporary-rent-location', href: '/alquiler-temporario/quintas/gba-norte' },
      { label: 'Tipo de propiedad', category: 'temporary-rent-kind-of-property', isTitle: true },
      { label: 'Casas', category: 'temporary-rent-kind-of-property', href: '/alquiler-temporario/quintas/casas' },
      { label: 'Departamentos', category: 'temporary-rent-kind-of-property', href: '/alquiler-temporario/quintas/departamentos' },
      { label: 'Galpones', category: 'temporary-rent-kind-of-property', href: '/alquiler-temporario/quintas/galpones' },
      { label: 'Cocheras', category: 'temporary-rent-kind-of-property', href: '/alquiler-temporario/quintas/cocheras' },
      { label: 'Locales', category: 'temporary-rent-kind-of-property', href: '/alquiler-temporario/quintas/locales' },
      { label: 'Oficinas', category: 'temporary-rent-kind-of-property', href: '/alquiler-temporario/quintas/oficinas' },
      { label: 'Campos', category: 'temporary-rent-kind-of-property', href: '/alquiler-temporario/quintas/campos' },
      { label: 'Quintas', category: 'temporary-rent-kind-of-property', href: '/alquiler-temporario/quintas/quintas' },
      { label: 'Lotes', category: 'temporary-rent-kind-of-property', href: '/alquiler-temporario/quintas/lotes' },
      { label: 'Cantidad de ambientes', category: 'temporary-rent-number-of-environments', isTitle: true },
      { label: 'Monoambiente', category: 'temporary-rent-number-of-environments', href: '/alquiler-temporario/quintas/monoambiente' },
      { label: '2 ambientes', category: 'temporary-rent-number-of-environments', href: '/alquiler-temporario/quintas/2-ambientes' },
      { label: '3 ambientes', category: 'temporary-rent-number-of-environments', href: '/alquiler-temporario/quintas/3-ambientes' },
      { label: '4 ambientes', category: 'temporary-rent-number-of-environments', href: '/alquiler-temporario/quintas/4-ambientes' },
      { label: '5 ambientes', category: 'temporary-rent-number-of-environments', href: '/alquiler-temporario/quintas/5-ambientes' },
      { label: '6 ambientes', category: 'temporary-rent-number-of-environments', href: '/alquiler-temporario/quintas/6-ambientes' },
      { label: '7 o más ambientes', category: 'temporary-rent-number-of-environments', href: '/alquiler-temporario/quintas/7-mas-ambientes' },
    ],
  },
];

export const gatedCommunities: NavI[] = [
  {
    label: 'Barrios Cerrados y Countries',
    href: '/barrios-cerrados-countries',
    icon: 'home-1',
  }
]

export const ourServicesNavItems: NavI[] = [
  {
    label: 'Nuestros Servicios',
    href: '/servicios',
    icon: 'note-check',
    dropdown: [
      { label: 'Nuestros Servicios', category: 'our-services', isTitle: true },
      { label: 'Tasaciones', category: 'our-services', href: '/servicios/tasaciones' },
      { label: 'Administración', category: 'our-services', href: '/servicios/administracion' },
    ],
  }]

export const contactUsNavItems: NavI[] = [
  {
    label: 'Contacto',
    href: '/contacto',
    icon: 'mail',
  }
]

export const joinUsNavItems: NavI[] = [
  {
    label: 'Sumate a nuestro equipo',
    href: '/sumate',
    icon: 'paper-user',
  }
]



export const navItems: NavI[] = [
  ...contactUsNavItems,
  ...joinUsNavItems,
  ...ourServicesNavItems,
  /*  ...gatedCommunities, */
];