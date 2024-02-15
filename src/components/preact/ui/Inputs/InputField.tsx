import { useState } from 'preact/hooks';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { FunctionComponent, JSX } from 'preact';

interface InputFieldProps extends Omit<JSX.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'onChange' | 'icon'> {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
  successMessage?: string;
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
  errorMessage = '',
  successMessage = '',
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
    errorMessage ? 'border-red-500' : 'border-gray-300',
    isFocused ? 'ring-2 ring-primary-msb' : 'ring-0',
    addStyles
  );

  const inputClasses = clsx(
    'w-full h-full rounded-md transition-all duration-200 focus:outline-none focus:ring-0',
    {
      'border-2 ': isFocused || hasValue,
      'border-gray-300': !errorMessage && !successMessage && !isFocused,
      'border-red-500': errorMessage,
      'border-primary-border-msb': successMessage,
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
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        {successMessage && <span className="text-primary-border-msb flex justify-center">{successMessage}</span>}
        {icon && <span className="text-primary-border-msb flex justify-center transition-all  ease-in-out animate-duration-200">{icon}</span>}
      </div>
    </div>
  );
};

export default InputField;
