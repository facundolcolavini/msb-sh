import type { FunctionComponent, FunctionalComponent, JSX } from 'preact';
import { useState } from 'preact/hooks';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends JSX.HTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
  successMessage?: string;
  addStyles ?: string;
  value?: string;
  onChange?: (event: Event) => void;
}  

const InputField: FunctionComponent<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  errorMessage = '',
  successMessage = '',
  value = '',
  addStyles,
  onChange,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  // Adjust the padding and label position for a less tall input
  const inputPaddingY = 'py-2'; // Reduced vertical padding
  const labelPositionY = 'top-1'; // Adjusted label vertical position
  const labelTransitionClasses = 'transform -translate-y-5 scale-75'; // Adjusted for less tall input

  const labelClasses = clsx(
    'absolute left-3 transition-all duration-300 pointer-events-none h-full ',
    {
      'text-primary-text-msb text-sm': !isFocused && !hasValue,
      [`text-primary-msb text-xs ${labelTransitionClasses}`]: isFocused || hasValue,
    },
    labelPositionY,
  
  );

  const inputContainerClasses = twMerge(
    'relative w-full  h-full rounded-md transition-all duration-200 ',
    errorMessage ? 'border-red-500' : 'border-gray-300',
    isFocused ? 'ring-2 ring-primary-msb' : 'ring-0',
    addStyles
  );

  const inputClasses = clsx(
    'w-full h-full rounded-md transition-all duration-200 focus:outline-none focus:ring-0',
    
    {
      'border-2 ': isFocused || hasValue, // Asegura que el borde sea del grosor deseado
      'border-gray-300': !errorMessage && !successMessage && !isFocused,
      'border-red-500': errorMessage,
      'border-green-500': successMessage,
      'ring-0  ': true, // Asegura que no haya anillo aplicado que cause separación
      'px-3 py-2': true, // Ajusta el padding si es necesario
    }
  );

  return (
    <div className={inputContainerClasses }>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        value={value}
        onInput={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...inputProps} // Spread the rest of the input props
      />
      <div className="absolute right-3 bottom-1 text-sm">
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        {successMessage && <span className="text-green-500">{successMessage}</span>}
      </div>
    </div>
  );
};


export default InputField;
