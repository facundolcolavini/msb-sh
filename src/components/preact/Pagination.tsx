import type { APIResponseResultsRecords, Datos as DatosResults, Result } from "@/interfaces/results.records.interfaces";
import { useEffect, useState } from "preact/hooks";
import Button from "./ui/Buttons/Button";
import { addFilterValue, filterItems, searchParamsStore } from "src/store/filterStore";
import ChevronRight from "./Icons/ChevronRight";
import ChevronLeft from "./Icons/ChevronLeft";

interface Props {
  paginationData: DatosResults;
  setData: (value: Result | null) => void;
  setLoading: (value: boolean) => void;
  resetPagination: boolean;
  isSubmitting: boolean;
}

const Pagination = ({ paginationData, setData, setLoading, resetPagination, isSubmitting }: Props) => {
  const searchPStore = searchParamsStore.get()
  const filterStore = filterItems.get();
  const [currentPage, setCurrentPage] = useState(Number(filterStore?.page?.value) ? Number(filterStore?.page?.value): 0);
  useEffect(() => {
    setCurrentPage(Number(filterStore?.page?.value) ? Number(filterStore?.page?.value): 0);
  }, [resetPagination, isSubmitting]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage <= paginationData?.paginas - 1) {
      setCurrentPage(newPage);
      addFilterValue(
        {
          ...filterStore,
          page: { label: "page", value: newPage.toString() },
        }
       );
    }
  };

  const fetchResults = async () => {
    // Cancelar la petición anterior si existe  con abort 
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      setLoading(true);
      const response = await fetch(`/api/results.json?${searchPStore}&page=${filterStore?.page?.value}` , { signal });

      const data: APIResponseResultsRecords = await response.json();

      if (data.resultado.fichas?.hasOwnProperty("error")) {
        setData(null);
        setLoading(false);
      } else if (response.ok) {
        setLoading(false);
        setData(data.resultado);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [currentPage]);

  if (paginationData?.cantidad <= 0 || paginationData?.paginas <= 1) {
    return null; // No mostrar la paginación si no hay resultados o solo hay una página.
  }

  const renderPageButtons = () => {
    let pagesToDisplay: number[] = [];
    
    if (paginationData?.paginas <= 3) {
      // Si hay 3 o menos páginas, mostrar todas las páginas disponibles
      pagesToDisplay = Array.from({ length: paginationData?.paginas }, (_, i) => i);
    } else if (currentPage <= 1) {
      // Si estamos en las primeras páginas, mostrar las primeras 3 páginas
      pagesToDisplay = [0, 1, 2];
    } else if (currentPage >= paginationData?.paginas - 2) {
      // Si estamos en las últimas páginas, mostrar las últimas 3 páginas
      pagesToDisplay = [paginationData?.paginas - 3, paginationData?.paginas - 2, paginationData?.paginas - 1];
    } else {
      // En otras páginas, mostrar la página actual y las dos siguientes
      pagesToDisplay = [currentPage - 1, currentPage, currentPage + 1];
    }

    return pagesToDisplay.map((page) => (
      
      <Button
        key={page}
        addStyles={`hover:bg-[#E9ECEF] py-4 px-6 w-100 border-2 border-gray-200 rounded focus:outline-none  ${page === currentPage ? 'relative z-1 border-gray-200 bg-gray-200 hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring focus:ring-[#939B41] border-[#939B41] ' : 'py-4 px-6'} `}
        variant={"secondary"}
        onClick={() => handlePageChange(page)}
        disabled={page >= paginationData?.paginas - 1}
        id="page"
      >
        {page + 1}
      </Button>
    ));
  };
  

  return (
    <div className="flex items-center justify-center  space-x-0 h-100 ">
      <Button
        variant="secondary"
        addStyles={`hover:bg-[#E9ECEF] p-5 border-2 border-gray-200  rounded-full focus:outline-none  } `}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        id="page"
      >
        <ChevronLeft/>
      </Button>

      {renderPageButtons()}

      <Button
        variant="secondary"
        addStyles={`hover:bg-[#E9ECEF]  p-5 border-2 border-gray-200 rounded-full focus:outline-none  } `}
        onClick={() => handlePageChange(currentPage + 3)}
        disabled={currentPage + 3 >= paginationData?.paginas - 1}
        id="page"
      >
        <ChevronRight/>
      </Button>
    </div>
  );
};

export default Pagination;
