import { useSearch } from "@hooks/useSearch";
import type { APIResponseEntrepreneurship, EntrePreneurShip, Results as ResultEntrepreneurship } from "@interfaces/entrepreneurship.interfaces";
import type { FilterDefault, FilterSelects, ResultLocation, Results } from "@interfaces/selects.form.interfaces";
import { defaultsFilters, filterEntrePreneurshipToFillDefault, labelMappingEntrePreneurshipForQuerys } from "@utils/filter-default";
import { formatAndUseSearch } from "@utils/formatAndUseSearch";
import { type OutputOption } from "@utils/formats";
import he from "he";
import { useEffect, useState } from "preact/compat";
import { filterItems, resetFilter, searchParamsStore } from "src/store/filterStore";
import { ArrowSortIcon } from "../Icons/ArrowSortIcon";
import SearchIcon from "../Icons/SearchIcon";
import SearchDebounce from "../Search/SearchDebounce";
import CardResultSkeleton from "../Skeletons/CardResultSkeleton";
import Button from "../ui/Buttons/Button";
import CardEntrepreneurship from "../ui/Cards/CardEntrepreneurship";
import SelectField from "../ui/Selects/SelectField";


interface Props {
  selects: Results;
  locations: ResultLocation
}

const EntrepreneurshipPage = ({ selects, locations }: Props) => {
  const filterStore = filterItems.get();
  const searchPStore = searchParamsStore.get()
  const defaultOptions = {
    ed_est: {
      value: window.location.search?.includes('Pozo') ? 'En Pozo' : window.location.search?.includes('Construccion') ? 'En Construccion' : window.location.search?.includes('Terminado') ? 'Terminado' : 'Pozo'
      , label: 'Estado'
    }, // En pozo , En construccion , Terminado
    /*  tipo:{ label: 'tipo', isLocation: false, isDefault: false }, */
    ed_tip: { value: '', label: 'Tipo' },
    ed_amb: { value: 'All', label: 'Cantidad de Ambientes' },
    ed_loc: { value: 'All', label: 'Localidad' },
    ed_iub: { value: '', label: '' },
    moneda: { value: 'D', label: 'U$D' },
    valor_desde: { value: 'All', label: 'Desde' },
    valor_hasta: { value: 'All', label: 'Hasta' },
    /*   rppagina: { value: '15', label: '15' }, */
  }

  const [results, setResults] = useState<ResultEntrepreneurship | null>()
  const [resetPagination, setResetPagination] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [monedaSeleccionada, setMonedaSeleccionada] = useState<OutputOption>(defaultOptions?.moneda);

  const filters: FilterSelects = {
    selects,
    locations,
    default: defaultsFilters,
  };

  const filterToFill: FilterDefault[] = filterEntrePreneurshipToFillDefault;
  const filtersformatted = formatAndUseSearch(filters, filterToFill, labelMappingEntrePreneurshipForQuerys)

  const { handleSelect, resetSelect, handleCheckboxChange, filtersSelected } = useSearch(filtersformatted, {
    ...defaultOptions, moneda:
      monedaSeleccionada
    ,
    ...filterStore,
    ed_est: {
      value: window.location.search?.includes('Pozo') ? 'En Pozo' : window.location.search?.includes('Construccion') ? 'En Construccion' : window.location.search?.includes('Terminado') ? 'Terminado' : 'En Pozo',
      label: "Estado"
    }
  })

  useEffect(() => {
    fetchResults()
    setResetPagination(false)
    setIsSubmitting(false)
  }, [])

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/emprendimientos.json?${searchParamsStore.get()}`);
      const data: APIResponseEntrepreneurship = await response.json();

      if (data?.hasOwnProperty("error")) {
        setResults(null);
        setIsLoading(false);
        setIsSubmitting(false);
      } else if (response.ok) {
        setIsLoading(false);
        setResults(data.resultado as ResultEntrepreneurship);
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
    resetSelect(defaultOptions);
    setMonedaSeleccionada(defaultOptions.moneda);
    setResetPagination(true)
    // Reinicia el estado de los filtros y realiza el fetch con los filtros predeterminados
    resetFilter(defaultOptions);
    await fetchResults();
    setResetPagination(false)
  };
  const orderAscDesc = () => {
    // Al darle click lo ordena de menor a mayor si se da otro click lo ordena de mayor a menor y asi sucesivamente
    if (Array.isArray(results?.emprendimiento)) {
      results?.emprendimiento.map((result) => {
        const precio = result.valor_desde.replace(/[$.]/g, '')
        return {
          ...result,
          precio: Number(precio)
        }
      })
        .sort((a, b) => a.precio - b.precio)
      // Actualizar el estado de los resultados con el ordenamiento 
      setResults({
        ...results,
        emprendimiento: results?.emprendimiento.reverse()
      })
    }
  }
  // Obtenemos los searchParams para mandarlo en el fetch y actualizar la url de busqueda.
  const onSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentUrl = window.location.pathname;
    const newUrl = `${currentUrl}${searchPStore.length > 0 ? `?${searchPStore}` : ''}`;
    window.history.pushState({}, '', newUrl);
    setIsSubmitting(true)
    await fetchResults()
    setResetPagination(false)
  };


  return (
    <>
      {/* Buscador */}
      <div className="grid  grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-0 px-3 ">
        <div className="md:col-start-1 md:col-end-3 lg:col-start-1 lg:col-end-3 flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'En Pozo'}
            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full  ${he.decode(filtersSelected?.ed_est?.value) === 'En Pozo' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
            id="ed_est"
          >
            En Pozo
          </Button>
        </div>
        <div className="md:col-start-3 md:col-end-6 lg:col-start-3 lg:col-end-5   flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'En Construccion'}
            addStyles={` sm:text-sm md:text-md lg:text-lg w-full ${filtersSelected?.ed_est.value === 'En Construccion' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
            id="ed_est"
          >
            En Construcción
          </Button>
        </div>
        <div className="md:col-start-6 md:col-end-13 lg:col-start-5 lg:col-end-7 flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'Terminado'}
            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full  ${he.decode(filtersSelected?.ed_est?.value) === 'Terminado' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
            id="ed_est"
          >
            Terminado
          </Button>
        </div>
        <div className="md:col-start-1 md:col-end-10 lg:col-start-7 lg:col-end-12 flex  gap-4">
          <SearchDebounce filterOptsLocations={filtersformatted.ed_iub} propIdRef={"ed_iub"} />
        </div>
        {/*         <div className="lg:col-start-1 lg:col-end-3">
          <SelectField id="tipo_propiedad" onChange={handleSelect} defaultOption={filterStore.ed_tip} opts={filtersformatted.ed_tip} />
        </div> */}


        <div className="lg:flex  md:col-start-10  md:col-end-13  lg:col-start-12  lg:col-end-13 flex lg:justify-between">
          <Button
            variant="primary"
            onClick={onSubmit}
            type="submit"
            className="lg:w-auto text-base lg:text-lg xl:text-xl p-3 bg-red-500 text-white"
            addStyles='w-full sm:text-sm md:text-md lg:text-lg flex lg:flex-grow justify-center items-center gap-x-8'
          >
            <div><SearchIcon /></div>


          </Button>

        </div>

      </div>
      <div className="py-20">

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4 md:px-0 px-3">
          <div class="lg:col-start-4 lg:col-end-13  flex items-end justify-between w-full">


            <p className="font-bold text-primary-text-msb text-sm md:text-md lg:text-lg">Tenemos <span className={'font-bold text-bg-2-msb text-sm md:text-md lg:text-lg'}>{Array.isArray(results?.emprendimiento) ? results?.emprendimiento.length : 0}</span> resultados con tu búsqueda</p>
            <Button onClick={orderAscDesc} addStyles="bg-transparent hover:bg-transparent p-0 m-0">
              <div className="flex items-center text-primary-text-msb text-sm md:text-md lg:text-lg font-bold  gap-1"> Ordenar <ArrowSortIcon /></div>
            </Button>
          </div>
          {/* Aside para filtros */}
          <aside className="md:col-12 lg:col-start-1 lg:col-end-4">
            <div className="flex flex-col">
              <div className="flex mb-4">
                <SelectField id="ed_tip" onChange={handleSelect} defaultOption={filterStore.ed_tip} opts={filtersformatted.ed_tip} />
              </div>

              <div className="flex mb-4">
                <SelectField id="ed_loc" onChange={handleSelect} defaultOption={filterStore.ed_loc} opts={filtersformatted.ed_loc} />
              </div>
              <div className="flex mb-4">
                <SelectField id="ed_amb" onChange={handleSelect} defaultOption={filterStore.ed_amb} opts={filtersformatted.ed_amb} />
              </div>
              {/*    <div className="flex">
                <SelectField id="barrios1" onChange={handleSelect} defaultOption={filterStore.barrios1} opts={filtersformatted.barrios1} />
              </div> */}
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
                      checked={monedaSeleccionada.value === 'P'}
                      onChange={() => handleCheckbox("moneda", "P")}
                    />
                    <div className={`rounded-full border bg-tertiary-bg-msb w-5 h-5 flex items-center justify-center ${monedaSeleccionada.value === 'P' ? 'bg-tertiary-bg-msb' : 'bg-white border-5 border-separate'}`}>
                      {monedaSeleccionada.value === 'P' && <div className="w-4 h-4 border-2 rounded-full"></div>}
                    </div>
                    <span className={"text-secondary-text-msb font-base  text-sm md:text-md lg:text-lg"}>Pesos</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      id="moneda"
                      value="D"
                      checked={monedaSeleccionada.value === 'D'}
                      onChange={() => handleCheckbox("moneda", "D")}
                    />
                    <div className={`rounded-full border bg-tertiary-bg-msb w-5 h-5 flex items-center justify-center ${monedaSeleccionada.value === 'D' ? 'bg-tertiary-bg-msb' : 'bg-white border-5 border-separate'}`}>
                      {monedaSeleccionada.value === 'D' && <div className="w-4 h-4 border-2 rounded-full"></div>}
                    </div>
                    <span className={"text-secondary-text-msb font-base  text-sm md:text-md lg:text-lg"}>U$D</span>
                  </label>
                </div>
              </div>

              {/* Desde - Hasta Inputs */}
              <div className="mt-4">
                <p className="font-bold text-primary-text-msb text-sm md:text-md lg:text-lg">Valores</p>
                <div className="flex gap-4">
                  <SelectField id="valor_desde" onChange={handleSelect} defaultOption={filterStore.valor_desde} opts={filtersformatted.valor_desde} />
                  <SelectField id="valor_hasta" onChange={handleSelect} defaultOption={filterStore.valor_hasta} opts={filtersformatted.valor_hasta} />
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
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </aside>

          {/* Grilla de Resultados */}
          <div className="lg:col-start-4 lg:col-end-13">
            {/* Mostrar indicador de carga si los datos están cargando */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 z-1 gap-4 animate-fade">
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
                  {results?.emprendimiento?.map((result: EntrePreneurShip) => (
                    <CardEntrepreneurship
                      cardData={
                        {
                          ed_nom: result.ed_nom,
                          img_princ: result.img_princ,
                          ed_est: result.ed_est,
                          ed_pos: result.ed_pos
                        }
                      }
                      key={`${result.codemp}${result.codsuc}-${result.ed_nro}-${result.ed_dir}`} // Aquí estás utilizando result.id como clave
                      href={`emprendimientos/${result.ed_est}/${result.ed_loc}/${result.ed_bar}/${result.codsuc}-${result.ed_idl}`}
                    />
                  ))}
                </>
              )}
            </div>
            {/* Paginacion */}
            {/* <div className={'mt-20'}>
              {results?.datos === undefined ? <></> : (
                <Pagination
                  paginationData={results?.emprendimiento as any}
                  setData={setResults}
                  setLoading={setIsLoading}
                  resetPagination={resetPagination}
                  isSubmitting={isSubmitting}
                />
              )}
            </div> */}
          </div>
        </div>
      </div >
    </>
  )
}

export default EntrepreneurshipPage