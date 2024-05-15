import type { APIResponseResultsRecords, Datos as DatosResults, Result } from "@/interfaces/results.records.interfaces";
import { useEffect, useState } from "preact/hooks";
import { addFilterValue, filterItems, searchParamsStore } from "src/store/filterStore";
import ArrowDobleLeft from "./Icons/ArrowDobleLeft";
import ArrowDobleRight from "./Icons/ArrowDobleRight";
import ChevronLeft from "./Icons/ChevronLeft";
import ChevronRight from "./Icons/ChevronRight";
import Button from "./ui/Buttons/Button";

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
  const [currentPage, setCurrentPage] = useState(Number(filterStore?.page?.value) ? Number(filterStore?.page?.value) : 0);

  const totalPages = Math.ceil(paginationData?.cantidad / paginationData?.fichasPorPagina);
  // Determinar las páginas a mostrar
  let startPage = Math.max(currentPage - 1, 0);
  let endPage = Math.min(startPage + 3, totalPages);

  // Asegurarse de que siempre se muestren 3 páginas
  if (endPage - startPage < 3 && startPage > 0) {
    startPage = endPage - 3;
  }
  useEffect(() => {
    setCurrentPage(Number(filterStore?.page?.value) ? Number(filterStore?.page?.value) : 0);
  }, [resetPagination, isSubmitting]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      // Establecer la página actual en la nueva página
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
      const response = await fetch(`/api/results.json?${searchPStore}&page=${filterStore?.page?.value}`, { signal });

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



  /*   const renderPageButtons = () => {
      let pagesToDisplay: number[] = [];
  
      if (totalPages <= 3) {
        // Si hay 3 o menos páginas, mostrar todas las páginas disponibles
        pagesToDisplay = Array.from({ length: totalPages }, (_, i) => i);
      } else if (currentPage <= 1) {
        // Si estamos en las primeras páginas, mostrar las primeras 3 páginas
        pagesToDisplay = [0, 1, 2];
      } else if (currentPage >= totalPages - 2) {
        // Si estamos en las últimas páginas, mostrar las últimas 3 páginas
        pagesToDisplay = [totalPages - 3, totalPages - 2, totalPages - 1];
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
          disabled={currentPage >= totalPages}
          id="page"
        >
          {page + 1}
        </Button>
      ));
    }; */


  return (
    <>
      {/* Desktop */}
      <div className="flex items-center justify-center  space-x-0 h-100 ">
        <Button
          variant="secondary"
          addStyles={`hidden md:flex hover:bg-[#E9ECEF]  p-5 border-2 border-gray-200  rounded-full focus:outline-none  } `}
          onClick={() => handlePageChange(0)}
        >
          <ArrowDobleLeft className={'size-6'} />
        </Button>
        <Button
          variant="secondary"
          addStyles={`hidden md:flex hover:bg-[#E9ECEF] p-5 border-2 border-gray-200  rounded-full focus:outline-none  } `}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          id="page"
        >
          <ChevronLeft />
        </Button>

        {Array.from({ length: endPage - startPage }, (_, i) => (
          <Button
            key={i + startPage}
            variant="secondary"
            addStyles={`hover:bg-[#E9ECEF] py-4 px-6 w-100 border-2 border-gray-200 rounded focus:outline-none  ${currentPage === i + startPage ? 'relative z-1 border-gray-200 bg-gray-200 hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring focus:ring-[#939B41] border-[#939B41] ' : 'py-4 px-6'} `}
            onClick={() => handlePageChange(i + startPage)}
          >
            {
              i + startPage + 1
            }
          </Button>
        ))}
        <Button
          variant="secondary"
          addStyles={`hidden md:flex hover:bg-[#E9ECEF]  p-5 border-2 border-gray-200 rounded-full focus:outline-none  } `}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage + 1 >= paginationData?.paginas}

          id="page"
        >
          <ChevronRight />
        </Button>
        <Button
          variant="secondary"
          addStyles={`hidden md:flex hover:bg-[#E9ECEF] p-5 border-2 border-gray-200  rounded-full focus:outline-none  } `}
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}

        >
          <ArrowDobleRight className={'size-6'} />
        </Button>
      </div>
      {/* Mobile */}
      <div className="flex md:hidden lg:hidden items-center justify-center pt-4 ">
        <Button
          variant="secondary"
          addStyles={`hover:bg-[#E9ECEF]  text-base  h-fit p-4 border-2 border-gray-200  rounded-full focus:outline-none  } `}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          id="page"
        >
          <ChevronLeft className={'size-4'} />
        </Button>
        <Button
          variant="secondary"
          addStyles={` hover:bg-[#E9ECEF] text-base  h-fit p-4 border-2 border-gray-200  rounded-full focus:outline-none  } `}
          onClick={() => handlePageChange(0)}
        >
          <ArrowDobleLeft className={'size-4'} />
        </Button>
        <Button
          variant="secondary"
          addStyles={` hover:bg-[#E9ECEF]  h-fit p-4 border-2 border-gray-200  rounded-full focus:outline-none  } `}
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
        >
          <ArrowDobleRight className={'size-4'} />
        </Button>
        <Button
          variant="secondary"
          addStyles={`hover:bg-[#E9ECEF]  h-fit p-4  border-2 border-gray-200 rounded-full focus:outline-none  } `}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage + 1 >= paginationData?.paginas}
          id="page"
        >
          <ChevronRight className={'size-4'} />
        </Button>
      </div>
    </>

  );
};

export default Pagination;
