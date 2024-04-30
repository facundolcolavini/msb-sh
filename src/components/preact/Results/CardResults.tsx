import type { FileFeaturedProperties } from "@/interfaces/featured.properties.interfaces";
import type { File } from "@/interfaces/results.records.interfaces";
import clsx from "clsx";
import type { CSSProperties } from "preact/compat";




interface Props {
    cardData: File /* & FileFeaturedProperties; */
    className?: string; 
    style ?: CSSProperties;
}
const CardResults = ({cardData,className,style}:Props) => {

    return (
        <div style={style} className={clsx(
            "shadow-lg rounded-lg  bottom-0",
            className
        
        )}>
            <img
                alt={cardData.id} 
                className="w-full h-48 object-cover"
                src={cardData?.img_princ}
                style="aspect-ratio: 16/9; object-fit: cover;"
           
                width={266}
                height={192}
            />
            <div className="p-4 bg-gray-500 text-white">
                <div className="h-[170px] flex flex-col space-y-2">
                    <h3 className="h-100 text-lg font-semibold">
                        {cardData.direccion_completa} - {cardData?.in_bar}
                    </h3>
                    <p className="h-100 text-sm">{cardData.titulo}</p>
                    <p className="h-100 text-sm">
                        {cardData?.ambientes_num} Ambientes | {cardData?.dormitorios}
                        Dormitorios
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-xs w-fit bg-slate-600 text-white px-2 py-1 rounded"
                        >{cardData?.precio}</span>
                        <div>
                            <span className="text-xs w-fit bg-slate-600 text-white px-2 py-1 rounded"
                            >{cardData?.in_suc}</span>
                            <span className="text-xs w-fit bg-slate-600 text-white px-2 py-1 rounded"
                            >{cardData?.in_num}</span>

                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-end mt-3">
                    <div className="flex gap-1">
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                        >{cardData.operacion}
                        </span>
            {/*             {
                            (
                                <AddToCartFavForm item={cardData} client:visible>
                                    Fav
                                </AddToCartFavForm>
                            )
                        }*/}
                    </div>
                    <a
                        href={`/${cardData.amigable}`}
                        data-astro-prefetch="hover"
                        className="text-xs text-white cursor-pointer border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white"
                    >
                        Ver más
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CardResults