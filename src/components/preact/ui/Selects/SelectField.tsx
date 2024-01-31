import type { JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import "./selectsField.css";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  opts: Option[];
  id: string;
  onChange: JSX.GenericEventHandler<HTMLElement>;
  defaultOption?: Option; // Added prop for default option
}

const SelectField = ({ opts, id, onChange, defaultOption }: SelectFieldProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState(defaultOption ? defaultOption.label : '');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option.label);
    toggleDropdown();
    onChange({ target: { id, value: option.value } } as any);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Update selectedOption when defaultOption changes
    if (defaultOption && defaultOption.label !== selectedOption) {
      setSelectedOption(defaultOption.label);
    }
  }, [defaultOption, selectedOption]);

  return (
    <div ref={dropdownRef} className="relative w-full h-full transition-all ">
      <button
        id={String(id)}
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border h-full bg-white text-gray-700 rounded-md border-primary-text-msb flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-primary-text-msb focus:border-primary-text-msb font-semibold "
        type="button"
      >
        {selectedOption}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill="currentColor" />
        </svg>
      </button>

      {isOpen && (

        <div className="absolute w-full z-10 mt-1 bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-2 overflow-auto font-semibold animate-fade-down animate-duration-300 scrollbar scrollbar-thumb-color scrollbar-track-color">
          {opts.map((option, index) => (
            <div className="bg-fixed " // Utiliza las clases de Tailwind para el scrollbar
            >
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>

      )}
    </div>
  );
};

export default SelectField;
