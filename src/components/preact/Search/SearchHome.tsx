import type { APIResponseLocations, FilterDefault, FilterSelects, Results } from '@/interfaces/selects.form.interfaces';

import { useSearch } from '@/hooks/useSearch.ts';
import { defaultsFilters, filterResultToFill, labelMappingResultForQuerys } from '@/utils/filter-default';
import { formatAndUseSearch } from '@/utils/formatAndUseSearch';
import { navigate } from 'astro:transitions/client';
import { useEffect, useState } from 'preact/hooks';
import { resetFilter, searchParamsStore } from 'src/store/filterStore';
import SearchIcon from '../Icons/SearchIcon';
import Button from "../ui/Buttons/Button";
import SelectField from '../ui/Selects/SelectField';
import SearchDebounce from './SearchDebounce';

interface Props {
  selects: Results
  /*   locations: APIResponseLocations */
}
const SearchHome = ({ selects }: Props) => {
  const [locations, setLocations] = useState()
  const searchPStore = searchParamsStore.get()

  const fetchLocations = async () => {
    const dataLocation = await fetch(`/api/location.json/`)
    const locations = await dataLocation.json()
    setLocations(locations)
  }

  const filters: FilterSelects = {
    selects,
    locations: locations !== undefined ? (locations as APIResponseLocations).resultado : null,
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
    fetchLocations()
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    fetchLocations()
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [searchParams]);

  return (
    <>

      <div className="container z-1 font-gotham">
        <div className="mx-auto grid bg-[#D9D9D9] bg-opacity-40 rounded grid-cols lg:grid-cols-12 gap-4  lg:pt-5 lg:pb-2 lg:px-0 md:p-5 p-5  ">
          <div class="lg:col-start-1 lg:col-end-1 lg:w-[100px]">
            {' '}
          </div>
          <div className="col-start-1 col-end-12 lg:col-start-2 lg:col-end-4">
            <Button
              variant="outline"
              onClick={handleSelect}
              value={'V'}
              addStyles={`sm:text-sm md:text-md lg:text-md lg:flex lg:self-center h-[42px] lg:h-[34px] lg:justify-center lg:items-center text-ellipsis overflow-hidden ... w-full ${filtersSelected?.tipo_operacion?.value === 'V' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out h-[42px] lg:h-[34px]'}`}
              id="tipo_operacion"
            >
              Venta
            </Button>
          </div>
          <div className="col-start-1 col-end-12  lg:col-start-4 lg:col-end-6 lg:h-[34px]">
            <Button
              variant="outline"
              onClick={handleSelect}
              value={'A'}
              addStyles={` sm:text-sm md:text-md lg:text-md lg:flex lg:self-center lg:justify-center lg:items-center text-ellipsis overflow-hidden ... w-full  h-[42px] lg:h-[34px]  ${filtersSelected?.tipo_operacion?.value === 'A' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out h-[42px] lg:h-[34px]'}`}
              id="tipo_operacion"
            >
              Alquiler
            </Button>
          </div>
          <div className="col-start-1 col-end-12 lg:col-start-6 lg:col-end-9">
            <Button
              variant="outline"
              onClick={handleSelect}
              value={'T'}
              addStyles={`sm:text-sm md:text-md lg:text-md lg:flex lg:self-center lg:justify-center lg:items-center  text-ellipsis overflow-hidden ... w-full h-[42px] lg:h-[34px] ${filtersSelected?.tipo_operacion?.value === 'T' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out  h-[42px] lg:h-[34px] '}`}
              id="tipo_operacion"
            >
              Alquiler Temporario
            </Button>
          </div>
          <div className="lg:col-start-9 lg:col-end-12 col-start-1 col-end-12 text-ellipsis overflow-hidden ... text-nowrap">
            <Button
              variant="outline"
              onClick={handleSelect}
              value={filtersSelected?.in_tpr?.value}
              addStyles={`sm:text-sm md:text-md lg:text-md lg:flex lg:self-center lg:justify-center lg:items-center h-[42px] lg:h-[34px] w-full ${filtersSelected?.in_tpr?.value === 'COUNTRY' ? 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out h-[42px] lg:h-[34px] ' : ''}`}
              id="in_tpr"
            >
              Barrios Cerrados y Countries
            </Button>
          </div>
          <div className="col-start-1 col-end-12 lg:col-start-2 lg:col-end-4">
            <SelectField addStyles='sm:text-sm md:text-md lg:text-base h-[42px] lg:h-[48px] lg:text-md' id="tipo_inmueble" onChange={handleSelect} defaultOption={filtersSelected?.tipo_inmueble} opts={filtersformatted.tipo_inmueble} />
          </div>
          <div className=" col-start-1 col-end-12 lg:col-start-4 lg:col-end-10 sm:text-sm md:text-md lg:text-base">
            <SearchDebounce filterOptsLocations={filtersformatted.in_iub} propIdRef={"in_iub"} />
          </div>
          <div className="col-start-1 col-end-12 lg:col-start-10 lg:col-end-12">
            <Button
              variant="primary"
              onClick={send}
              addStyles="rounded-md  shadow-lg w-full h-[42px] lg:h-[48px] py-3 active:bg-bg-2-msb text-pretty hover:bg-bg-2-msb transition duration-500 ease-in-out"
            >
               <div className={'flex gap-2 justify-center items-center lg:pr-3'}>
                <SearchIcon className={'hidden lg:flex size-7 lg:size-7'} />
                <span className={'lg:flex lg:text-lg '}>BUSCAR</span>
              </div>
            </Button>
          </div>
          <div class="lg:col-start-11 lg:col-end-12 lg:w-[100px]">
            {' '}
          </div>
        </div>



      </div>


    </>
  )
}

export default SearchHome