import { useSearch } from "@hooks/useSearch"
import type { APIResponseResultsRecords, File, Result } from "@interfaces/results.records.interfaces"
import type { ResultLocation, Results } from "@interfaces/selects.form.interfaces"
import { formatOptions, type OutputOption } from "@utils/formats"
import { useEffect, useState } from "preact/hooks"
import { filterItems, resetFilter, searchParamsStore } from "src/store/filterStore"
import { ArrowSortIcon } from "../Icons/ArrowSortIcon"
import SearchIcon from "../Icons/SearchIcon"
import CardResultSkeleton from "../Skeletons/CardResultSkeleton"
import Button from "../ui/Buttons/Button"
import CardProperty from "../ui/Cards/CardProperty"
import InputField from "../ui/Inputs/InputField"
import SelectField from "../ui/Selects/SelectField"
import SearchDebounce from "../Search/SearchDebounce"



interface Props {
  selects: Results;
  locations: ResultLocation
}

const ResultsPage = ({ selects,locations }: Props) => {
  const filterStore = filterItems.get();
  const searchPStore = searchParamsStore.get()

  /* Logica de filtros */
  let tipo_propiedad = [] as OutputOption[];  // CASA
  let tipo_operacion = [] as OutputOption[]; //VENTA
  let Ambientes = [] as OutputOption[];  // 1 AMBIENTE
  let calles = [] as OutputOption[];
  let sellocalidades = [] as OutputOption[];
  let barrios1 = [] as OutputOption[];
  let moneda = [] as OutputOption[];
  let valor_minimo = [] as OutputOption[];
  let valor_maximo = [] as OutputOption[];
  let in_iub = [] as OutputOption[];

  tipo_propiedad = formatOptions(selects?.tipo);
  tipo_operacion = formatOptions(selects.operacion);
  Ambientes = formatOptions(selects.ambientes);
  calles = formatOptions(selects.calles);
  sellocalidades = formatOptions(selects.localidades);
  barrios1 = formatOptions(selects.barrio);
  in_iub = formatOptions(locations.ubicaciones);
  moneda = [{
    value: "P",
    label: "Pesos"
  }, {
    value: "D",
    label: "U$D"
  }]

  valor_minimo = formatOptions(selects.valor.desde);
  valor_maximo = formatOptions(selects.valor.hasta);

  const defaultOptions = {
    tipo_operacion: { value: "V", label: 'Venta' },
    tipo_propiedad: { value: 'All', label: 'Tipo de propiedad' },
    Ambientes: { value: 'All', label: 'Cantidad de Ambientes' },
    calles: { value: 'All', label: 'Calle' },
    sellocalidades: { value: 'All', label: 'Localidad' },
    barrios1: { value: 'All', label: 'Barrio' },
    moneda: { value: 'D', label: 'U$D' },
    valor_minimo: { value: 'All', label: 'Desde' },
    valor_maximo: { value: 'All', label: 'Hasta' },
    rppagina: { value: '15', label: '15' },
    in_iub: { value: '', label: '' }
  }

  const [initialLoad, setInitialLoad] = useState(true);
  const [results, setResults] = useState<Result | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isActive, setIsActive] = useState(defaultOptions?.tipo_operacion?.value)
  /*   const [filterParams, setFilterParams] = useState<string>(updatedSearchParams) */
  const [monedaSeleccionada, setMonedaSeleccionada] = useState<OutputOption>(defaultOptions?.moneda);

  const { handleSelect, resetSelect, handleCheckboxChange, filtersSelected } = useSearch({
    tipo_operacion,
    tipo_propiedad,
    Ambientes,
    calles,
    sellocalidades,
    barrios1,
    moneda,
    valor_minimo,
    valor_maximo,
    in_iub
  }, {
    ...defaultOptions, moneda:
      monedaSeleccionada
    , ...filterStore
  })


  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/results.json?${searchParamsStore.get()}`);
      const data: APIResponseResultsRecords = await response.json();

      if (data.resultado.fichas?.hasOwnProperty("error")) {
        setResults(null);
        setIsLoading(false);
      } else if (response.ok) {
        setIsLoading(false);
        // Actualizar la URL con los parámetros de búsqueda
        setResults(data.resultado);
        const currentUrl = window.location.pathname;
        const newUrl = `${currentUrl}?${searchParamsStore.get()}`;
        window.history.pushState({}, '', newUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const orderAscDesc = () => {
    // Al darle click lo ordena de menor a mayor si se da otro click lo ordena de mayor a menor y asi sucesivamente
    if (Array.isArray(results?.fichas)) {
      // Asegurar que sean numeros y evitar NaN en el ordenamiento para eso debemos sacarle a la prop precio el signo $ o U$S y el . y convertirlo a numero


      results?.fichas.map((result) => {
        const precio = result.precio.replace(/[$.]/g, '')
        return {
          ...result,
          precio: Number(precio)
        }
      })
        .sort((a, b) => a.precio - b.precio)

      // Actualizar el estado de los resultados con el ordenamiento 
      setResults({
        ...results,
        fichas: results?.fichas.reverse()
      })
    }
  }

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
    setIsActive("V");
    setMonedaSeleccionada(defaultOptions.moneda);

    // Reinicia el estado de los filtros y realiza el fetch con los filtros predeterminados
    resetFilter(defaultOptions);
    fetchResults();
  };

  // Obtenemos los searchParams para mandarlo en el fetch y actualizar la url de busqueda.
  const onSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await fetchResults()
  };

  return (
    <article className=" py-10">
      {/* Buscador */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 md:px-0 px-3 ">
        <div className="lg:col-start-1 lg:col-end-4 flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'V'}
            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === 'V' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
            id="tipo_operacion"
          >
            Vender
          </Button>
        </div>
        <div className="lg:col-start-4 lg:col-end-7   flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'A'}
            addStyles={` sm:text-sm md:text-md lg:text-lg w-full ${filtersSelected?.tipo_operacion?.value === 'A' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
            id="tipo_operacion"
          >
            Alquilar
          </Button>
        </div>
        <div className="lg:col-start-7 lg:col-end-10 flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'M'}
            addStyles={`sm:text-sm md:text-md lg:text-lg  w-full  ${filtersSelected?.tipo_operacion?.value === 'M' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out'}`}
            id="tipo_operacion"
          >
            Venta y Alquiler
          </Button>
        </div>
        <div className="lg:col-start-10 lg:col-end-13 flex  gap-4">
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
        <div className="lg:col-start-1 lg:col-end-4">
          <SelectField id="tipo_propiedad" onChange={handleSelect} defaultOption={filterStore.tipo_propiedad} opts={tipo_propiedad} />
        </div>
        <div className="md:col-1 lg:col-start-4  lg:col-end-13 md:col-start-1 md:col-end-4 flex gap-4  w-full flex-grow ">
          <SearchDebounce filterOptsLocations={{in_iub}} />
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
          <div class="lg:col-start-4 lg:col-end-13  flex items-end justify-between w-full">
            {/* Manejar el caso donde no se encuentran resultados */}

            <p className="font-bold text-primary-text-msb text-sm md:text-md lg:text-lg">Tenemos <span className={'font-bold text-bg-2-msb text-sm md:text-md lg:text-lg'}>{Array.isArray(results?.fichas) ? results?.fichas.length : 0}</span> resultados con tu búsqueda</p>
            <Button onClick={orderAscDesc} addStyles="bg-transparent hover:bg-transparent p-0 m-0">
              <div className="flex items-center text-primary-text-msb text-sm md:text-md lg:text-lg font-bold  gap-1"> Ordenar <ArrowSortIcon /></div>
            </Button>
          </div>
          {/* Aside para filtros */}
          <aside className="md:col-12 lg:col-start-1 lg:col-end-4">
            <div className="flex flex-col">


              <div className="flex mb-4">
                <SelectField id="Ambientes" onChange={handleSelect} defaultOption={filterStore.Ambientes} opts={Ambientes} />
              </div>
              <div className="flex mb-4">
                <SelectField id="calles" onChange={handleSelect} defaultOption={filterStore.calles} opts={calles} />
              </div>
              <div className="flex mb-4">
                <SelectField id="sellocalidades" onChange={handleSelect} defaultOption={filterStore.sellocalidades} opts={sellocalidades} />
              </div>
              <div className="flex">
                <SelectField id="barrios1" onChange={handleSelect} defaultOption={filterStore.barrios1} opts={barrios1} />
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
                  <SelectField id="valor_minimo" onChange={handleSelect} defaultOption={filterStore.valor_minimo} opts={valor_minimo} />
                  <SelectField id="valor_maximo" onChange={handleSelect} defaultOption={filterStore.valor_maximo} opts={valor_maximo} />
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

          {/* Grilla de Tarjetas */}
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
                      href={`/propiedades/${result.direccion_completa}`}
                    />
                  ))}
                </>
              )}

            </div>


          </div>
        </div>
      </div >


    </article >
  )
}

export default ResultsPage