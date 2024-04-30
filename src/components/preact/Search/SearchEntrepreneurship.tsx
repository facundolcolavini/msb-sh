import { useSearch } from '@/hooks/useSearch.ts';
import type { FilterDefault, FilterSelects, ResultLocation, Results } from '@/interfaces/selects.form.interfaces';
import { defaultsFilters, filterEntrePreneurshipToFillDefault, labelMappingEntrePreneurshipForQuerys } from '@/utils/filter-default';
import { formatAndUseSearch } from '@/utils/formatAndUseSearch';
import { navigate } from 'astro:transitions/client';
import { useEffect } from 'preact/hooks';

import { resetFilter, searchParamsStore } from 'src/store/filterStore';
import Button from "../ui/Buttons/Button";
import type { JSXInternal } from 'node_modules/preact/src/jsx';

interface Props {
  selects: Results
  locations: ResultLocation
}
const SearchEntrepreneurship = ({ selects, locations }: Props) => {
  const searchPStore = searchParamsStore.get()



  const defaultOptions = {
    ed_est: { value: '', label: 'Estado' },
    /*   ed_iub: { value: '', label: '' }, */
  }

  const filters: FilterSelects = {
    selects,
    locations,
    default: defaultsFilters,
  };
  const filterToFill: FilterDefault[] = filterEntrePreneurshipToFillDefault;
  const filtersformatted = formatAndUseSearch(filters, filterToFill, labelMappingEntrePreneurshipForQuerys)
  const { handleSelect, resetSelect, handleOnChange, filtersSelected, searchParams } = useSearch(filtersformatted, defaultOptions)

  useEffect(() => {
    // REINICIA EL ESTADO DE LOS FILTROS CUANDO SE CARGA LA PÁGINA HOME
    searchParamsStore.set('')
    resetFilter({})
    resetSelect(defaultOptions)
  }, [])
  const navigateToPage = (e: JSXInternal.TargetedMouseEvent<HTMLButtonElement>) => {
    handleSelect(e)
    navigate(`/emprendimientos${searchPStore.length > 0 ? `?${searchPStore}` : ''}`);
  }
  const toPozo = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/emprendimientos?ed_est=En Pozo`);
  }

  const toConstruccion = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/emprendimientos?ed_est=En Construccion`);
  }
  const toTerminado = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/emprendimientos?ed_est=Terminado`);
  }
  return (
    <>

      <div
        class="flex md:flex-row lg:flex-row flex-col justify-center w-100 gap-4 p-6 lg:px-2 md:px-6"
      >

        <Button
          variant="primary"
          onClick={toPozo}
          id="ed_est"
          value={'En Pozo'}
          addStyles="rounded-md  shadow-lg w-full md:w-[192px] lg:w-[192px] h-full py-3 active:bg-primary-bg-msb text-pretty"
        >
          En Pozo
        </Button>


        <Button
          variant="primary"
          id="ed_est"
          onClick={
            toConstruccion

          }
          value={'En Construccion'}
          addStyles="rounded-md  shadow-lg w-full md:w-[192px] lg:w-[192px] h-full py-3 active:bg-primary-bg-msb text-pretty"
        >
          En Construcción
        </Button>


        <Button
          variant="primary"
          id="ed_est"
          onClick={toTerminado}
          value={'Terminado'}
          addStyles="rounded-md  shadow-lg w-full md:w-[192px] lg:w-[192px] h-full py-3 active:bg-primary-bg-msb text-pretty"
        >
          Terminado
        </Button>

      </div>


    </>
  )
}

export default SearchEntrepreneurship