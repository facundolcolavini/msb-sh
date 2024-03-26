import type { FilterDefault, FilterSelects, ResultLocation, Results } from '@/interfaces/selects.form.interfaces';
import { formatOptions, type OutputOption } from '@/utils/formats';

import { useSearch } from '@/hooks/useSearch.ts';
import { navigate } from 'astro:transitions/client';
import { useEffect } from 'preact/hooks';
import { resetFilter, searchParamsStore } from 'src/store/filterStore';
import SearchIcon from '../Icons/SearchIcon';
import Button from "../ui/Buttons/Button";
import SelectField from '../ui/Selects/SelectField';
import SearchDebounce from './SearchDebounce';
import { formatAndUseSearch } from '@/utils/formatAndUseSearch';
import { defaultsFilters, filterResultToFill, labelMappingResultForQuerys } from '@/utils/filter-default';

interface Props {
  selects: Results
  locations: ResultLocation
}
const SearchHome = ({ selects, locations }: Props) => {
  const searchPStore = searchParamsStore.get()

/*   let tipo_inmueble = [] as OutputOption[];
  let tipo_operacion = [] as OutputOption[];
  let in_iub = [] as OutputOption[];
  let in_tpr = [] as OutputOption[];
  tipo_inmueble = formatOptions(selects?.tipo);
  tipo_operacion = formatOptions(selects.operacion);
  in_iub = formatOptions(locations?.ubicaciones);
  in_tpr = [
    {
      value: 'COUNTRY',
      label: 'Barrios Cerrados y Countries'
    }
  ] */
  const filters: FilterSelects = {
    selects,
    locations,
    default: defaultsFilters,
  };
  const filterToFill: FilterDefault[] = filterResultToFill;
  const filtersformatted = formatAndUseSearch(filters, filterToFill, labelMappingResultForQuerys)

  const { handleSelect, resetSelect, handleOnChange, filtersSelected, searchParams } = useSearch(filtersformatted, {
    tipo_inmueble: { value: 'All', label: 'Tipo de propiedad' },
    tipo_operacion: { value: '', label: '' },
    in_iub: { value: '', label: '' },
    in_tpr: { value: '', label: 'Barrios Cerrados y Countries' },

  })

  useEffect(() => {
    // REINICIA EL ESTADO DE LOS FILTROS CUANDO SE CARGA LA PÁGINA HOME
    searchParamsStore.set('')
    resetFilter({})
    resetSelect({
      tipo_inmueble: { value: 'All', label: 'Tipo de propiedad' },
      tipo_operacion: { value: '', label: '' },
      in_iub: { value: '', label: '' },
      in_tpr: { value: '', label: 'Barrios Cerrados y Countries' },
    })



  }, [])

  const send = async (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/resultados-de-busqueda${searchPStore.length > 0 ? `?${searchPStore}` : ''}`);
  }

  // Evento enter para el input de búsqueda
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      send(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [searchParams]);

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
            <SelectField id="tipo_inmueble" onChange={handleSelect} defaultOption={filtersSelected?.tipo_inmueble} opts={filtersformatted.tipo_inmueble}/>
          </div>
          <div className="md:col-1 lg:col-start-3  lg:col-end-11 md:col-start-2 md:col-end-5 flex gap-4  w-full flex-grow ">
            <SearchDebounce filterOptsLocations={filtersformatted.in_iub} propIdRef={"in_iub"} />
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

export default SearchHome