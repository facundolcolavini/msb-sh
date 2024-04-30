import clsx from 'clsx';
import type { FunctionComponent, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { twMerge } from 'tailwind-merge';
import IconEyeInvisible from '../../Icons/EyeInvisibleIcon';
import IconEye from '../../Icons/EyeIcon';
import './inputFile.css';

interface InputFieldProps extends Omit<JSX.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>, 'onChange' | 'icon'> {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  icon?: JSX.Element | undefined;
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // New state variable
  const hasValue = value && value.length > 0;

  const labelPositionY = isFocused || hasValue ? '-2' : 'top-1';

  const labelClasses = clsx(
    'absolute left-3 transition-all duration-200 pointer-events-none h-full transform origin-top',
    {
      'text-primary-text-msb translate-y-1 text-gray-400 text-base font-normal': !isFocused && !hasValue,
      'text-primary-msb text-xs scale-70 translate-y-0 ': isFocused || hasValue,
    },
    labelPositionY
  );

  const inputContainerClasses = twMerge(
    'relative w-full h-full rounded-md transition-all duration-200 border w-full border-primary-border-msb',
    addStyles
  );

  const inputClasses = clsx(
    `w-full h-full rounded-md transition-all duration-200 focus:outline-none focus:ring-0 ${icon ? 'pr-10' : ''}`,
    {
      'border ': isFocused || hasValue,
      'border-gray-300': !error && !success && !isFocused,
      'border-red-500': error && !success,
      'border-primary-border-msb': success && !error,
      'ring-0': true,
      'p-4': type !== 'textarea',
      'p-3': type === 'textarea',
      'input-file-upload' : type === 'file',
    }
  );

  return (
    <div className={inputContainerClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      {
        type === 'file' ? (
          <div className='input-file-upload'>
          <label className="input-file-icon" htmlFor={id}>
            {icon}
          </label>
          <input
            id={id}
            type={type}
            className={inputClasses}
            onChange={onChange as JSX.GenericEventHandler<HTMLInputElement>}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...inputProps}
          />
        </div>
        ):
      
      type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          className={inputClasses}
          value={value}
          onInput={onChange as JSX.GenericEventHandler<HTMLTextAreaElement>}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...inputProps}
        />
      ) : (
        <input
          id={id}
          type={isPasswordVisible ? 'text' : type} // Change type based on isPasswordVisible
          placeholder={placeholder}
          className={inputClasses}
          value={value}
          onInput={onChange as JSX.GenericEventHandler<HTMLInputElement>}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...inputProps}
        />
      )}
      <div className="absolute right-3 bottom-3 flex items-center z-1 text-sm">
        {type === 'password' && (
       <button
       type="button"
       onClick={(e) => {
         e.stopPropagation(); // Stop event propagation
         setIsPasswordVisible(!isPasswordVisible);
       }}
       className="text-primary-border-msb flex justify-center transition-all  gap-2 px-2 ease-in-out animate-duration-200"
     >
       {isPasswordVisible ? <IconEyeInvisible className={'size-5'} /> : <IconEye  className={'size-5'}/>}
     </button>
        )}
        {icon  && type !== 'file' && <span className="text-primary-border-msb flex justify-center transition-all  ease-in-out animate-duration-200">{icon}</span>}
      </div>
    </div>
  );
};

export default InputField;