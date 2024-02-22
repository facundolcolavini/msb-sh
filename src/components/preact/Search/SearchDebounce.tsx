import { useEffect, useRef, useState } from 'preact/hooks';
import InputField from '../ui/Inputs/InputField';

import { addFilterValue, filterItems, searchParamsStore } from '../../../store/filterStore';
import "../ui/Selects/selectsField.css";

interface Props {
    filterOptsLocations:  OutputOption[] 
}

const SearchDebounce = ({ filterOptsLocations }: Props) => {
    const filters = filterItems.get();
    const params = searchParamsStore.get();
    const [searchTerm, setSearchTerm] = useState<OutputOption>(filters.in_iub);
    const [listOpts, setOpts] = useState<OutputOption[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const listContainerRef = useRef<HTMLUListElement>(null);

    // Función de debounce
    const debounce = (func: Function, delay: number) => {
        let timer: number;
        return function (this: any, ...args: any[]) {
            clearTimeout(timer);
            timer = window.setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Lógica de búsqueda con debounce
    const handleSearchWithDebounce = debounce((value: string) => {
        const filteredOpts = filterOptsLocations.filter(location =>
            location.label.toLowerCase().includes(value.toLowerCase())
        );
        setOpts(filteredOpts);
        setShowResults(true);
    }, 300); // 300 ms de retraso

    useEffect(() => {
        // Limpiar la lista de opciones cuando se desmonta el componente
        return () => setOpts([]);
    }, []);

    const handleInputChange = (event: Event) => {
        const value = (event.target as HTMLInputElement).value;
        const id = (event.target as HTMLInputElement).id;
        setSearchTerm({ label: value, value: id });
        // Llamar a la función de búsqueda con debounce
        handleSearchWithDebounce(value);
    };

    useEffect(() => {
        // Ajustar la altura del listado de opciones al contenido
        if (listContainerRef.current) {
            const maxHeight = window.innerHeight - listContainerRef.current.getBoundingClientRect().top - 100; // 20px de margen inferior
            listContainerRef.current.style.maxHeight = `${maxHeight}px`;
        }
    }, [listOpts]);

    // Actualizar la url con los filtros del buscador 
    useEffect(() => {
        if (filters.in_iub?.value === '' && filters.in_iub?.label === '') {
            setSearchTerm({ label: filters?.in_iub?.label, value: filters?.in_iub?.value });
        }
        const currentUrl = window.location.pathname;
        const newUrl = `${currentUrl}${params.length > 0 ? `?${params}` : ''}`;
        window.history.pushState({}, '', newUrl);


    }, [params]);

    const handleOptionSelect = (option: OutputOption) => {
        addFilterValue({ in_iub: { value: option.value, label: option.label } });
        setSearchTerm(option);
        setShowResults(false); // Ocultar el listado después de seleccionar una opción
    };

    return (
        <div className={`relative top-0  w-full`}>
            <InputField
                id="in_iub"
                type='search'
                value={searchTerm?.label} // Usar el valor del estado como valor del input
                className='border-2 border-primary-msb focus:border-b-1 rounded-md px-4 flex w-full h-full py-2 focus:outline-none focus:ring-0 sticky z-0'
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Buscar por barrio o localidad"
            />
            {/* Lista de opciones de ubicaciones */}
            {showResults && (
                <ul
                    ref={listContainerRef}
                    className={`absolute z-20 top-12 bg-white w-full border border-gray-300 rounded-md shadow-md overflow-auto scrollbar scrollbar-thumb-color scrollbar-track-color`}
                >
                    {listOpts.length > 0 ? (
                        listOpts.map(location => (
                            <li
                                key={`${location.label}-${location.value}`}
                                className={`py-2 px-4 relative z-10 hover:bg-gray-200 cursor-pointer`}
                                onClick={(e) => handleOptionSelect(location)}
                            >
                                {location.label}
                            </li>
                        ))
                    ) : (
                        <li className="py-2 px-4 text-gray-500">No hay resultados</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchDebounce;
export type OutputOption = { label: string, value: string };
