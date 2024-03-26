import { useSearch } from "@/hooks/useSearch";
import type { APIResponseEntrepreneurship, EntrePreneurShip, Results as ResultEntrepreneurship } from "@/interfaces/entrepreneurship.interfaces";
import type { FilterDefault, FilterSelects, ResultLocation, Results } from "@/interfaces/selects.form.interfaces";
import { defaultsFilters, filterEntrePreneurshipToFillDefault, labelMappingEntrePreneurshipForQuerys } from "@/utils/filter-default";
import { formatAndUseSearch } from "@/utils/formatAndUseSearch";
import { type OutputOption } from "@/utils/formats";
import he from "he";
import { useEffect, useState } from "preact/compat";
import { filterItems, resetFilter, searchParamsStore } from "src/store/filterStore";
import { ArrowSortIcon } from "../Icons/ArrowSortIcon";
import CardResultSkeleton from "../Skeletons/CardResultSkeleton";
import Button from "../ui/Buttons/Button";
import CardEntrepreneurship from "../ui/Cards/CardEntrepreneurship";
import SelectField from "../ui/Selects/SelectField";
import type { Session } from "lucia";


interface Props {
  selects: Results;
  locations: ResultLocation;
  session: Session | null;
}

const EntrepreneurshipPage = ({ selects, locations,session }: Props) => {
  const filterStore = filterItems.get();
  const searchPStore = searchParamsStore.get()
  const defaultOptions = {
    ed_est: {
      value: window.location.search?.includes('Pozo') ? 'En Pozo' : window.location.search?.includes('Construccion') ? 'En Construccion' : window.location.search?.includes('Terminado') ? 'Terminado' : filterStore.ed_est?.value ?? 'En Pozo'
      , label: 'Estado'
    }, // En pozo , En construccion , Terminado
    /*  tipo:{ label: 'tipo', isLocation: false, isDefault: false }, */
    ed_tip: { value: '', label: 'Tipo' },
    ed_loc: { value: 'All', label: 'Localidad' },
    ed_bar: { value: 'All', label: 'Barrio' },
    ed_cal: { value: 'All', label: 'Calle' },
    ed_cat: { value: 'All', label: 'Categoria' },
    valor_desde: { value: 'All', label: 'Desde' },
    valor_hasta: { value: 'All', label: 'Hasta' },
    /*   rppagina: { value: '15', label: '15' }, */
  }

  const [results, setResults] = useState<ResultEntrepreneurship | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const filters: FilterSelects = {
    selects,
    locations,
    default: defaultsFilters,
  };

  const filterToFill: FilterDefault[] = filterEntrePreneurshipToFillDefault;
  const filtersformatted = formatAndUseSearch(filters, filterToFill, labelMappingEntrePreneurshipForQuerys)
  const { handleSelect, resetSelect, handleCheckboxChange, filtersSelected } = useSearch(filtersformatted, {
    ...defaultOptions,
    ...filterStore,
    ed_est: {
      value: window.location.search?.includes('Pozo') ? 'En Pozo' : window.location.search?.includes('Construccion') ? 'En Construccion' : window.location.search?.includes('Terminado') ? 'Terminado' : filterStore.ed_est?.value ?? 'En Pozo',
      label: "Estado"
    }
  })

  useEffect(() => {
    fetchResults()
  }, [])

  useEffect(() => {
    fetchResults()
    const currentUrl = window.location.pathname;
    const newUrl = `${currentUrl}${searchPStore.length > 0 ? `?${searchPStore}` : ''}`;
    window.history.pushState({}, '', newUrl);
  }, [searchPStore])

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/emprendimientos.json?${searchParamsStore.get()}`);
      const data: APIResponseEntrepreneurship = await response.json();

      if (data?.hasOwnProperty("error")) {
        setResults(null);
        setIsLoading(false);
      } else if (response.ok) {
        setIsLoading(false);
        setResults(data.resultado as ResultEntrepreneurship);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetAndFetch = async (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    // Establecer los filtros en los valores predeterminados
    resetSelect(defaultOptions);
    // Reinicia el estado de los filtros y realiza el fetch con los filtros predeterminados
    resetFilter(defaultOptions);
    await fetchResults();
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

  return (
    <div className={'container mx-auto'}>
      {/* Buscador */}
      <div className="grid  grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-0 px-3 ">
        <div className="md:col-start-1 md:col-end-3 lg:col-start-1 lg:col-end-3 flex gap-4">
          <Button
            variant="outline"
            onClick={handleSelect}
            value={'En Pozo'}
            addStyles={`text-base  w-full  h-[56px] ${he.decode(filtersSelected?.ed_est?.value) === 'En Pozo' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out h-[56px]'}`}
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
            addStyles={` text-base h-[56px] w-full ${filtersSelected?.ed_est.value === 'En Construccion' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out h-[56px]'}`}
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
            addStyles={`text-base h-[56px] w-full  ${he.decode(filtersSelected?.ed_est?.value) === 'Terminado' && 'text-secondary-msb bg-bg-2-msb border-bg-2-msb border-none hover:border-none transition duration-500 ease-in-out h-[56px]'}`}
            id="ed_est"
          >
            Terminado
          </Button>
        </div>
      </div>
      <div className="py-20">

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4 md:px-0 px-3">
          <div class="lg:col-start-4 lg:col-end-13 md:hidden hidden lg:flex items-end justify-between w-full">
            <p className="font-bold text-primary-text-msb text-base">Tenemos <span className={'font-bold text-bg-2-msb text-sm md:text-md lg:text-lg'}>{Array.isArray(results?.emprendimiento) ? results?.emprendimiento.length : 0}</span> resultados con tu búsqueda</p>
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
                <SelectField id="ed_bar" onChange={handleSelect} defaultOption={filterStore.ed_bar} opts={filtersformatted.ed_bar} />
              </div>
              <div className="flex mb-4">
                <SelectField id="ed_cal" onChange={handleSelect} defaultOption={filterStore.ed_cal} opts={filtersformatted.ed_cal} />
              </div>
              <div className="flex mb-4">
                <SelectField id="ed_cat" onChange={handleSelect} defaultOption={filterStore.ed_cat} opts={filtersformatted.ed_cat} />
              </div>
              <div className="mt-4">
                <Button
                  type="button"
                  variant="primary"
                  onClick={
                    resetAndFetch
                  }
                  addStyles="w-full h-[56px] text-md border-2 border-gray-300 rounded-md flex justify-center items-center"
                >
                  Limpiar búsqueda
                </Button>
              </div>
              <div class="lg:col-start-4 lg:col-end-13 lg:hidden flex items-end justify-between w-full mt-4">
                <p className="font-bold text-primary-text-msb text-base">Tenemos <span className={'font-bold text-bg-2-msb text-sm md:text-md lg:text-lg'}>{Array.isArray(results?.emprendimiento) ? results?.emprendimiento.length : 0}</span> resultados con tu búsqueda</p>
                <Button onClick={orderAscDesc} addStyles="bg-transparent hover:bg-transparent p-0 m-0">
                  <div className="flex items-center text-primary-text-msb text-sm md:text-md lg:text-lg font-bold  gap-1"> Ordenar <ArrowSortIcon /></div>
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
          </div>
        </div>
      </div >
    </div>
  )
}

export default EntrepreneurshipPage