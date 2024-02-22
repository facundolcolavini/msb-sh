import type { ResultLocation, Results } from '@interfaces/selects.form.interfaces';
 

import { useSearch } from '@hooks/useSearch.ts';
import { navigate } from 'astro:transitions/client';
import { useEffect } from 'preact/hooks';
import { resetFilter, searchParamsStore } from 'src/store/filterStore';
import SearchIcon from '../Icons/SearchIcon';
import Button from "../ui/Buttons/Button";
import SelectField from '../ui/Selects/SelectField';
import { formatOptions } from '../../../utils/formats';
import SearchDebounce from '../Search/SearchDebounce';
 

interface Props {
    selects: Results
    locations: ResultLocation
    navigateTo: string;

}
export type OutputOption = { label: string, value: string };




// La idea es hacer este componente resutilizable tanto para cualquier vista de propiedades como para cualquier vista de emprendimientos
const FilterActive = ({ selects, locations, navigateTo }: Props) => {
    const searchPStore = searchParamsStore.get()
    // Primero tener al tener los datos de los selects necesitaria una funcion que transforme los datos y devuelva el objeto con los valores de los selects formateados  (importante el nombre de las variables que se le pasan a formatOptions deben ser iguales a los que se pasan en selects y locations para que funcione correctamente el formateo de los datos y para eso tendremos que pasarle un objeto con los nombres y valores por default para tener de ref los nombres [key] que va a tener el objeto resultante y los valores [value] de los selects y locations)
    // Y luego pasar ese objeto al hook useSearch para que se encargue de manejar el estado de los filtros
    let tipo_propiedad = [] as OutputOption[];
    let tipo_operacion = [] as OutputOption[];
    let in_iub = [] as OutputOption[];
    let in_tpr = [] as OutputOption[];
    tipo_propiedad = formatOptions(selects?.tipo);
    tipo_operacion = formatOptions(selects.operacion);
    in_iub = formatOptions(locations?.ubicaciones);
    in_tpr = [
        {
            value: 'COUNTRY',
            label: 'Barrios Cerrados y Countries'
        }
    ]

    const { handleSelect, resetSelect, handleOnChange, filtersSelected, searchParams } = useSearch({ tipo_propiedad, tipo_operacion, in_iub, in_tpr }, {
        tipo_propiedad: { value: 'All', label: 'Tipo de propiedad' },
        tipo_operacion: { value: '', label: '' },
        in_iub: { value: '', label: '' },
        in_tpr: { value: '', label: 'Barrios Cerrados y Countries' },
    })

    useEffect(() => {
        // REINICIA EL ESTADO DE LOS FILTROS CUANDO SE CARGA LA PÁGINA HOME

        searchParamsStore.set('')
        resetFilter({})
        resetSelect({
            tipo_propiedad: { value: 'All', label: 'Tipo de propiedad' },
            tipo_operacion: { value: '', label: '' },
            in_iub: { value: '', label: '' },
            in_tpr: { value: '', label: 'Barrios Cerrados y Countries' },
        })



    }, [])

    const send = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(`${navigateTo}${searchPStore.length > 0 ? `?${searchPStore}` : ''}`);
    }

    return (
        <>

            <div className="container z-1 ">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-0 px-3 ">
                    <div className="lg:col-start-1 lg:col-end-3 md:grid-col-start-1 md:grid-col-end-2 flex gap-4">
                        <Button
                            variant="outline"
                            onClick={handleSelect}
                            value={'V'}
                            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === 'V' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
                            id="tipo_operacion"
                        >
                            Venta
                        </Button>
                    </div>
                    <div className="lg:col-start-3 lg:col-end-5  md:grid-col-start-2 md:grid-col-end-4 flex gap-4">
                        <Button
                            variant="outline"
                            onClick={handleSelect}
                            value={'A'}
                            addStyles={` sm:text-sm md:text-md lg:text-lg w-full ${filtersSelected?.tipo_operacion?.value === 'A' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
                            id="tipo_operacion"
                        >
                            Alquiler
                        </Button>
                    </div>
                    <div className="lg:col-start-5 lg:col-end-9  md:grid-col-start-1 md:grid-col-end-2 flex gap-4">
                        <Button
                            variant="outline"
                            onClick={handleSelect}
                            value={'T'}
                            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === 'T' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
                            id="tipo_operacion"
                        >
                            Alquiler Temporiario
                        </Button>
                    </div>
                    <div className="lg:col-start-9 lg:col-end-13 flex   md:grid-col-start-2 md:grid-col-end-4 gap-4">
                        <Button
                            variant="outline"
                            onClick={handleSelect} // Llama a handleSelect cuando se hace clic en el botón
                            value={filtersSelected?.in_tpr?.value}
                            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.in_tpr?.value === 'COUNTRY' ? 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out' : ''}`}
                            id="in_tpr"
                        >
                            Barrios Cerrados y Countries
                        </Button>
                    </div>
                    {/* Selector e input de la fila inferior */}
                    <div className="lg:col-start-1  lg:col-end-3 flex  h-full  ">
                        <SelectField id="tipo_propiedad" onChange={handleSelect} defaultOption={filtersSelected?.tipo_propiedad} opts={tipo_propiedad} />
                    </div>
                    <div className="md:col-1 lg:col-start-3  lg:col-end-11 md:col-start-2 md:col-end-5 flex gap-4  w-full flex-grow ">
                        <SearchDebounce filterOptsLocations={{ in_iub }} />
                        <div className="hidden md:flex lg:hidden gap-4">
                            <Button
                                variant="primary"
                                onClick={send}
                                className="lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white"
                                addStyles="sm:text-sm md:text-md lg:text-lg border-2 border-gray-300 rounded-md  flex w-full justify-center items-center"
                            >
                                BUSCAR
                            </Button>
                        </div>
                    </div>
                    {/* Botón de búsqueda de la fila inferior */}
                    <div className=" md:hidden lg:flex lg:col-start-11  lg:col-end-13 flex  gap-4">
                        <Button
                            variant="primary"
                            onClick={send}
                            className="lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white"
                            addStyles='w-full sm:text-sm md:text-md lg:text-lg flex lg:flex-grow justify-center items-center gap-2'
                        >
                            <div><SearchIcon /></div>

                            BUSCAR
                        </Button>
                    </div>

                </div>
            </div>


        </>
    )
}

export default FilterActive