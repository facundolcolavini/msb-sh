export type NavI = {
    label: string;
    href?: string; // `href` ahora es opcional
    dropdown?: NavI[];
    category?: string; // Añadido para diferenciar categorías de elementos normales
    icon?: string;
    isTitle?: boolean; // Añadido para diferenciar títulos de elementos normales
  };
  
  export type NavbarProps = {
    navItems: NavI[];
    logo: string;
    user?: { name: string; email: string };
  };
  