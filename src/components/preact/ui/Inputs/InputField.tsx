import clsx from 'clsx';
import type { FunctionComponent, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends Omit<JSX.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'onChange' | 'icon'> {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  icon?: JSX.Element | undefined; // Updated type of 'icon' property
  addStyles?: string;
  value?: string;
  onChange?: JSX.GenericEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const InputField: FunctionComponent<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  error = false,
  success = false,
  value = '',
  addStyles,
  icon,
  onChange,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  const labelPositionY = isFocused || hasValue ? '-2' : 'top-1'; // Adjusted label vertical position

  const labelClasses = clsx(
    'absolute left-3 transition-all duration-200 pointer-events-none h-full transform origin-top',
    {
      'text-primary-text-msb text-xs': !isFocused && !hasValue,
      'text-primary-msb text-xs scale-75 -translate-y-2': isFocused || hasValue,
    },
    labelPositionY
  );

  const inputContainerClasses = twMerge(
    'relative w-full h-full rounded-md transition-all duration-200',
    error ? 'border-red-500' : 'border-gray-300',
    isFocused && success ? 'ring-2 ring-primary-msb' : 'ring-0',
    isFocused && error ? 'border-red-500' : 'border-gray-300',
    isFocused ? 'ring-2 ring-primary-msb' : 'ring-0',
    addStyles
  );

  const inputClasses = clsx(
    'w-full h-full rounded-md transition-all duration-200 focus:outline-none focus:ring-0',
    {
      'border-2 ': isFocused || hasValue,
      'border-gray-300': !error && !success && !isFocused,
      'border-red-500': error && !success, // Solo aplica el borde rojo cuando hay un error y no hay éxito
      'border-primary-border-msb': success && !error, // Solo aplica el borde verde cuando hay éxito y no hay error
      'ring-0': true,
      'px-3 py-2': type !== 'textarea', // Adjust padding for non-textarea inputs
      'pt-2 pb-1 px-2': type === 'textarea', // Adjust padding for textarea inputs
    }
  );

  return (
    <div className={inputContainerClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          className={inputClasses}
          value={value}
          onInput={onChange as JSX.GenericEventHandler<HTMLTextAreaElement>} // Cast onChange to correct type
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...inputProps}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={inputClasses}
          value={value}
          onInput={onChange as JSX.GenericEventHandler<HTMLInputElement>} // Cast onChange to correct type
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...inputProps}
        />
      )}
      <div className="absolute right-3 bottom-3 flex items-center  text-sm">
        {icon && <span className="text-primary-border-msb flex justify-center transition-all  ease-in-out animate-duration-200">{icon}</span>}
      </div>
    </div>
  );
};

export default InputField;
