import type { File, hasErrorResult } from "@/interfaces/results.records.interfaces";
import CardProperty from "../ui/Cards/CardProperty";

interface Props {
    cardList: File[] | hasErrorResult | undefined
}


const ListPublications = ({ cardList }: Props) => {
    // Max 4 cards per row 
    const max = 4;
    const maxCarList = Array.isArray(cardList) && cardList?.length > max ? cardList.slice(0, max) : cardList;
    return (
        <>

            {Array.isArray(maxCarList) && maxCarList.length > 0 && (
                <>
                    <h2 className={'font-gotham pt-20 text-xl md:text-xl lg:text-2xl  md:text-start text-start  font-bold text-primary-text-msb pb-3'}>Publicaciones de tu interés</h2>
                    <p className={'text-sm md:text-md lg:text-lg font-base pb-8'}>Te mostramos otros anuncios relacionados con tu búsqueda</p>
                </>
            )}


            <div className={`grid  pb-20 gap-5 grid-cols md:grid-cols-2 lg:grid-cols-4`} >
                {
                    Array.isArray(maxCarList) && maxCarList.length > 0
                        ? maxCarList?.map((cardData: File) => (

                            <div >
                                <CardProperty cardData={cardData} href={`${window.location.pathname.includes('resultados-de-busqueda') ? '/resultados-de-busqueda' : '/emprendimientos'}/${cardData?.operacion}/${cardData?.in_loc}/${cardData?.direccion_completa}/${cardData?.in_suc}-${cardData?.in_num}`} key={cardData.id} />
                            </div>
                        ))
                        : <>

                        </>
                }
            </div>
        </>
    )
}

export default ListPublications