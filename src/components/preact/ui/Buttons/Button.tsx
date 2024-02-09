import HeartIcon from '@components/preact/Icons/HeartIcon';
import clsx from 'clsx';
import type { FunctionComponent, JSX } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { twMerge } from 'tailwind-merge';

interface Props extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'icon'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'disabled';
  isFavorite?: boolean;
  addStyles?: string;
  icon?: JSX.Element;
  onClick?: (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => void
}

const Button: FunctionComponent<Props> = ({
  variant = 'primary',
  isFavorite,
  children,
  addStyles,
  icon,
  onClick,
  ...buttonProps
}) => {
  const baseStyles = 'px-4 py-2 rounded font-semibold text-sm transition-all';
  const [favorited, setFavorited] = useState(isFavorite || false); // Estado para controlar si se marca como favorito
 
  // Definimos las clases condicionales según el valor de variant
  const variantStyles = clsx({
    'bg-primary-msb text-white border-primary-msb hover:bg-primary-hover-msb': variant === 'primary',
    'bg-secondary-msb text-primary-text-msb border-secondary-msb hover:bg-secondary-hover-msb': variant === 'secondary',
    'bg-tertiary-msb text-white border-tertiary-msb hover:bg-tertiary-hover-msb': variant === 'tertiary',
    'bg-secondary-msb border-2 border-primary-msb text-primary-msb hover:border-primary-hover-msb': variant === 'outline',
    'bg-gray-400 text-gray-800 cursor-not-allowed': variant === 'disabled',
    // Agrega más clases condicionales según necesites.
  });

  // Combinamos las clases base y las condicionales
  const styles = twMerge(clsx(baseStyles, variantStyles, addStyles));

  // Handler para el botón de favorito
  const handleButtonClick = (e:JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    // Cambiar el estado de favorito al hacer clic
    isFavorite && setFavorited(!favorited);
    // Ejecutar la función onClick si está definida
    if (onClick) onClick(e);
  };
  
  return (
    <button
      {...buttonProps}
      className={styles}
      id={buttonProps.id}
      disabled={variant === 'disabled'}
      onClick={onClick}
      value={buttonProps.value}
    >
    
      {/* Renderizar el icono con el color adecuado */}
      {icon && icon}
      {children}
      {
        isFavorite && (
          <span onClick={handleButtonClick} className={ isFavorite && favorited ? " fill-black-400" : "hover:fill-black-300"}>
            <HeartIcon className={isFavorite && favorited ? "relative z-10" : "fill-primary-text-msb"}  />
          </span>
        )
      }
    </button>
  );

}

export default Button;
