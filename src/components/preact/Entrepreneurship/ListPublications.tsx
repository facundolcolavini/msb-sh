import type { EntrePreneurShip } from "@/interfaces/entrepreneurship.interfaces";
import CardEntrepreneurship from "../ui/Cards/CardEntrepreneurship";

interface Props {
    cardList: EntrePreneurShip[] ;
}


const ListPublications = ({ cardList }: Props) => {
    const max = 4;
    const maxCarList =  Array.isArray(cardList) && cardList?.length > max ? cardList?.slice(0, max) : cardList;
    return (
        <>
            {Array.isArray(maxCarList) && maxCarList.length > 0 && (
                <>
                    <h2 className={'font-gotham pt-20 text-xl md:text-xl lg:text-2xl  md:text-start text-start  font-bold text-primary-text-msb pb-3'}>Publicaciones de tu interés</h2>
                    <p className={'text-sm md:text-md lg:text-lg font-base pb-8'}>Te mostramos otros anuncios relacionados con tu búsqueda</p>
                </>
            )}
            <div className={`grid pb-20 gap-5 grid-cols md:grid-cols-2 lg:grid-cols-${Array.isArray(maxCarList) && maxCarList?.length && maxCarList.length > 3 ? 4 : 3}`} >
                {
                    Array.isArray(maxCarList) && maxCarList.length > 0
                        ? maxCarList?.map((cardData: EntrePreneurShip) => (

                            <div >
                                <CardEntrepreneurship
                                    key={cardData.ed_idl}
                                    cardData={cardData}
                                    href={`/emprendimientos/${cardData?.ed_est}/${cardData?.ed_loc}/${cardData.ed_bar}/${cardData.codsuc}-${cardData.ed_idl}`} />
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