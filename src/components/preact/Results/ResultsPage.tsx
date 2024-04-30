import { useSearch } from "@/hooks/useSearch"
import type { APIResponseResultsRecords, Datos, File, Result } from "@/interfaces/results.records.interfaces"
import type { FilterDefault, FilterSelects, ResultLocation, Results } from "@/interfaces/selects.form.interfaces"
import { type OutputOption } from "@/utils/formats"
import { useEffect, useState } from "preact/hooks"
import { filterItems, resetFilter, searchParamsStore } from "src/store/filterStore"
import { ArrowSortIcon } from "../Icons/ArrowSortIcon"
import SearchIcon from "../Icons/SearchIcon"
import CardResultSkeleton from "../Skeletons/CardResultSkeleton"
import Button from "../ui/Buttons/Button"
import CardProperty from "../ui/Cards/CardProperty"

import Pagination from "@/components/preact/Pagination"
import { defaultsFilters, filterResultToFill, labelMappingResultForQuerys } from "@/utils/filter-default"
import { formatAndUseSearch } from "@/utils/formatAndUseSearch"
import type { Session } from "lucia"
import SearchDebounce from "../Search/SearchDebounce"
import SelectField from "../ui/Selects/SelectField"



interface Props {
  selects: Results;
  locations: ResultLocation
  session: Session | null;
}

const ResultsPage = ({ selects, locations, session }: Props) => {
  const filterStore = filterItems.get();
  const searchPStore = searchParamsStore.get()
  const filters: FilterSelects = {
    selects,
    locations,
    default: defaultsFilters,
  };
  
  const filterToFill: FilterDefault[] = filterResultToFill;
  const filtersformatted = formatAndUseSearch(filters, filterToFill, labelMappingResultForQuerys);

  const defaultOptions = {
    tipo_operacion: {
      value: window.location.search?.includes('tipo_operacion') ?
        window.location.search?.includes('tipo_operacion=A') ? 'A' :
          window.location.search?.includes('tipo_operacion=T') ? 'T' :
            window.location.search?.includes('tipo_operacion=V') ? 'V' : '' :
        filterStore?.tipo_operacion?.value ?? '',
      label: ""
    },
    tipo_inmueble: { value: 'All', label: 'Tipo de propiedad' },
    Ambientes: { value: 'All', label: 'Cantidad de Ambientes' },
    calles: { value: 'All', label: 'Calle' },
    sellocalidades: { value: 'All', label: 'Localidad' },
    barrios1: { value: 'All', label: 'Barrio' },
    moneda: { value: 'D', label: 'U$D' },
    valor_minimo: { value: 'All', label: 'Desde' },
    valor_maximo: { value: 'All', label: 'Hasta' },
    rppagina: { value: '15', label: '15' },
    in_iub: { value: '', label: '' },
    ordenar: { value: 'preciomenor', label: 'Ordenar' },
    in_tpr: { value: '', label: 'Barrios Cerrados y Countries' },
  }

  const [results, setResults] = useState<Result | null>()

  const [resetPagination, setResetPagination] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [monedaSeleccionada, setMonedaSeleccionada] = useState<OutputOption>(defaultOptions?.moneda);

  const { handleSelect, resetSelect, handleCheckboxChange, filtersSelected } = useSearch(filtersformatted, {
    ...defaultOptions, moneda:
      monedaSeleccionada
    , ...filterStore,

    tipo_operacion: {
      value: window.location.search?.includes('tipo_operacion') ?
        window.location.search?.includes('tipo_operacion=A') ? 'A' :
          window.location.search?.includes('tipo_operacion=T') ? 'T' :
            window.location.search?.includes('tipo_operacion=V') ? 'V' : '' :
        filterStore?.tipo_operacion?.value,
      label: ""
    }
  })

  useEffect(() => {
    fetchResults()

    setIsSubmitting(false)
  }, [searchPStore])


  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/results.json?${searchParamsStore.get()}`);
      const data: APIResponseResultsRecords = await response.json();

      if (data.resultado.fichas?.hasOwnProperty("error")) {
        setResults(null);
        setIsLoading(false);
        setIsSubmitting(false);
      } else if (response.ok) {
        setIsLoading(false);
        setResults(data.resultado);
        setIsSubmitting(false);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (id: string, value: string) => {
    const updatedMonedaSeleccionada: OutputOption = {
      value: value,
      label: id,
    };
    setMonedaSeleccionada(updatedMonedaSeleccionada);
    handleCheckboxChange(id, value);
  };

  const resetAndFetch = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    // Establecer los filtros en los valores predeterminados
    resetSelect({});
    setMonedaSeleccionada(defaultOptions.moneda);
    setResetPagination(true)
    // Reinicia el estado de los filtros y realiza el fetch con los filtros predeterminados
    resetFilter({
      ...defaultOptions,
      tipo_operacion: {
        value: "",
        label: ""
      }

    });
    await fetchResults();
    setResetPagination(false)
  };

  // Obtenemos los searchParams para mandarlo en el fetch y actualizar la url de busqueda.
  const onSubmit = async (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentUrl = window.location.pathname;
    const newUrl = `${currentUrl}${searchPStore.length > 0 ? `?${searchPStore}` : ''}`;
    window.history.pushState({}, '', newUrl);
    setIsSubmitting(true)
    await fetchResults()
    setResetPagination(false)
  };

  // Evento enter para el input de búsqueda
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [searchPStore]);

  return (
    <article className="py-10">
      {/* Buscador */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 md:px-0 px-3 ">
        <div className="lg:col-start-1 lg:col-end-3 flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'V'}
            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full   ${filtersSelected?.tipo_operacion?.value === 'V' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out  '}`}
            id="tipo_operacion"
          >
            Venta
          </Button>
        </div>
        <div className="lg:col-start-3 lg:col-end-5  flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'A'}
            addStyles={` sm:text-sm md:text-md lg:text-lg  w-full ${filtersSelected?.tipo_operacion?.value === 'A' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out  '}`}
            id="tipo_operacion"
          >
            Alquiler
          </Button>
        </div>
        <div className="lg:col-start-5 lg:col-end-9 flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'T'}
            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === 'T' && '  text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
            id="tipo_operacion"
          >
            Alquiler Temporiario
          </Button>

        </div>
        <div className="lg:col-start-9 lg:col-end-13 flex  gap-4">
          <Button
            variant="outline"
            onClick={handleSelect} // Llama a handleSelect cuando se hace clic en el botón
            value={filtersSelected?.in_tpr?.value}
            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.in_tpr?.value === 'COUNTRY' ? ' text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out' : ''}`}
            id="in_tpr"
          >
            Barrios Cerrados y Countries
          </Button>
        </div>
        <div className="lg:col-start-1 lg:col-end-3">
          <SelectField id="tipo_inmueble" onChange={handleSelect} defaultOption={filterStore.tipo_inmueble} opts={filtersformatted.tipo_inmueble} />
        </div>
        <div className="md:col-1 lg:col-start-3  lg:col-end-13 md:col-start-1 md:col-end-4 flex gap-4  w-full flex-grow ">
          <SearchDebounce filterOptsLocations={filtersformatted.in_iub} propIdRef={"in_iub"} />
          <div className="hidden md:flex lg:hidden gap-4">
            <Button
              variant="primary"
              onClick={onSubmit}
              className="lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white"
              addStyles="sm:text-sm md:text-md lg:text-lg border-2 border-gray-300 rounded-md  flex w-full justify-center items-center"
            >
              BUSCAR
            </Button>
          </div>

          <div className=" md:hidden lg:flex lg:col-start-11  lg:col-end-13 flex lg:justify-between">
            <Button
              variant="primary"
              onClick={onSubmit}
              type="submit"
              className="lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white"
              addStyles='w-full sm:text-sm md:text-md lg:text-lg flex lg:flex-grow justify-center items-center gap-x-8'
            >
              <div><SearchIcon /></div>

              BUSCAR
            </Button>

          </div>
        </div>
      </div>
      <div className="py-20">

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4 md:px-0 px-3">
          <div class="lg:col-start-4 lg:col-end-13 md:hidden hidden lg:flex  items-end justify-between w-full">
            <p className="font-bold text-primary-text-msb text-sm md:text-md lg:text-lg">Tenemos <span className={'font-bold text-bg-2-msb text-sm md:text-md lg:text-lg'}>{Array.isArray(results?.fichas) ? results?.fichas.length : 0}</span> resultados con tu búsqueda</p>
            <SelectField id="ordenar" variant="secondary" addStyles="bg-transparent relative w-full h-[56px] transition-all flex justify-between items'end h-fit py-0 w-fit gap-8" onChange={handleSelect} defaultOption={filterStore.ordenar} opts={filtersformatted.ordenar}><ArrowSortIcon /></SelectField>

          </div>
          {/* Aside para filtros */}
          <aside className="md:col-12 lg:col-start-1 lg:col-end-4">
            <div className="flex flex-col">


              <div className="flex mb-4">
                <SelectField id="Ambientes" onChange={handleSelect} defaultOption={filterStore.Ambientes} opts={filtersformatted.Ambientes} />
              </div>
              <div className="flex mb-4">
                <SelectField id="calles" onChange={handleSelect} defaultOption={filterStore.calles} opts={filtersformatted.calles} />
              </div>
              <div className="flex mb-4">
                <SelectField id="sellocalidades" onChange={handleSelect} defaultOption={filterStore.sellocalidades} opts={filtersformatted.sellocalidades} />
              </div>
              <div className="flex">
                <SelectField id="barrios1" onChange={handleSelect} defaultOption={filterStore.barrios1} opts={filtersformatted.barrios1} />
              </div>
              {/* Radio buttons Pesos / USD */}
              <div className="mt-4">
                <p className="font-bold text-primary-text-msb text-sm md:text-md lg:text-lg">Moneda</p>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="moneda"
                      value="P"
                      checked={filterStore.moneda?.value === 'P'}
                      onChange={() => handleCheckbox("moneda", "P")}
                    />
                    <div className={`rounded-full border bg-tertiary-bg-msb w-5 h-5 flex items-center justify-center ${filterStore.moneda?.value === 'P' ? 'bg-tertiary-bg-msb' : 'bg-white border-5 border-separate'}`}>
                      {filterStore.moneda?.value === 'P' && <div className="w-4 h-4 border-2 rounded-full"></div>}
                    </div>
                    <span className={"text-secondary-text-msb font-base  text-sm md:text-md lg:text-lg"}>Pesos</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="moneda"
                      value="D"
                      checked={filterStore.moneda?.value === 'D'}
                      onChange={() => handleCheckbox("moneda", "D")}
                    />
                    <div className={`rounded-full border bg-tertiary-bg-msb w-5 h-5 flex items-center justify-center ${filterStore.moneda?.value === 'D' ? 'bg-tertiary-bg-msb' : 'bg-white border-5 border-separate'}`}>
                      {filterStore.moneda?.value === 'D' && <div className="w-4 h-4 border-2 rounded-full"></div>}
                    </div>
                    <span className={"text-secondary-text-msb font-base  text-sm md:text-md lg:text-lg"}>U$D</span>
                  </label>
                </div>
              </div>

              {/* Desde - Hasta Inputs */}
              <div className="mt-4">
                <p className="font-bold text-primary-text-msb text-sm md:text-md lg:text-lg">Valores</p>
                <div className="flex gap-4">
                  <SelectField id="valor_minimo" onChange={handleSelect} defaultOption={filterStore.valor_minimo} opts={filtersformatted.valor_minimo} />
                  <SelectField id="valor_maximo" onChange={handleSelect} defaultOption={filterStore.valor_maximo} opts={filtersformatted.valor_maximo} />
                </div>
              </div>
              <div className="mt-4">
                <Button
                  type="button"
                  variant="primary"
                  onClick={
                    resetAndFetch
                  }
                  addStyles="w-full text-md border-2 border-gray-300 rounded-md flex justify-center items-center"
                >
                  Limpiar búsqueda
                </Button>
              </div>
              <div class="lg:col-start-4 lg:col-end-13 lg:hidden flex items-end justify-between w-full mt-4">
                <p className="font-bold text-primary-text-msb text-sm md:text-md lg:text-lg">Tenemos <span className={'font-bold text-bg-2-msb text-sm md:text-md lg:text-lg'}>{Array.isArray(results?.fichas) ? results?.fichas.length : 0}</span> resultados con tu búsqueda</p>
                <SelectField id="ordenar" variant="secondary" addStyles="bg-transparent relative w-full h-[56px] transition-all flex justify-between items'end h-fit py-0 w-fit" onChange={handleSelect} defaultOption={filterStore.ordenar} opts={filtersformatted.ordenar}><ArrowSortIcon /></SelectField>
              </div>
            </div>
          </aside>

          {/* Grilla de Resultados */}
          <div className="lg:col-start-4 lg:col-end-13">
            {/* Mostrar indicador de carga si los datos están cargando */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-1 gap-4 animate-fade">
              {isLoading ? (

                <>
                  {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]?.map(result => {
                      return (
                        <div className={'animate-ease-linear animate-pulse'}><CardResultSkeleton /></div>
                      )
                    })
                  }
                </>

              ) : (
                <>
                  {Array.isArray(results?.fichas) && results.fichas.map((result: File,) => (
                    <CardProperty
                      cardData={result}
                      key={`${result.id}${result.in_suc}-${result.in_num}-${result.direccion_completa}`} // Aquí estás utilizando result.id como clave
                      href={`resultados-de-busqueda/${result.operacion}/${result.in_loc}/${result.direccion_completa}/${result.in_suc}-${result.in_num}`}
                    />
                  ))}
                </>
              )}
            </div>
            {/* Paginacion */}
            <div className={'mt-20'}>
              {results?.datos === undefined ? <></> : (
                <Pagination
                  paginationData={results?.datos as Datos}
                  setData={setResults}
                  setLoading={setIsLoading}
                  resetPagination={resetPagination}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>
        </div>
      </div >


    </article >
  )
}

export default ResultsPage