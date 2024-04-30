
 
import { useState, useEffect } from 'preact/hooks';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { JSX } from 'preact/jsx-runtime';


type ToastProps = {
  message: string;
  isVisible: boolean;
  icon?: JSX.Element;
  customStyles?: string;
  duration?: number;
};

export const Toast = ({ message, isVisible, icon, customStyles, duration = 3000 }: ToastProps) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible) {
      setVisible(true);
      timer = setTimeout(() => {
        setVisible(false);
      }, duration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, duration]);

  const baseStyles = 'fixed bottom-0 right-0 m-6 p-4 rounded shadow-lg';
  const variantStyles = 'bg-blue-500 text-white';
  const styles = twMerge(clsx(baseStyles, variantStyles, {
    'opacity-0': !visible,
    'opacity-100': visible,
  }, customStyles));

  return (
    <div className={styles}>
      {icon}
      <p className={'text-[#45484C]'}>{message}</p>
    </div>
  );
};