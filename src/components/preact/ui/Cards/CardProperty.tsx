
import BathIcon from "@/components/preact/Icons/BathIcon";
import DoorOpen from "@/components/preact/Icons/DoorOpen";
import RuleIcon from "@/components/preact/Icons/RuleIcon";
import SquareMeterIcon from '@/components/preact/Icons/SquareMeterIcon';
import WhatsAppIcon from "@/components/preact/Icons/WhatsAppIcon";
import type { File } from "@/interfaces/results.records.interfaces";
import type { HTMLAttributes } from "astro/types";
import clsx from 'clsx';
import he from "he";
import { type FunctionComponent } from "preact/compat";
import { twMerge } from 'tailwind-merge';



interface Props extends HTMLAttributes<"a"> {
    cardData: File
    addStyles?: string;
    defaultImgeProperty?: string;
    cardContentStyles?: string;
    href: string;
    key: string;
}
const CardProperty: FunctionComponent<Props> = ({ cardData, addStyles, href, key, defaultImgeProperty, cardContentStyles }: Props) => {

    const styles = twMerge(clsx("rounded relative overflow-hidden shadow-lg animate-fade", addStyles));
    const contentCardStyles = twMerge(clsx("bg-secondary-msb relative rounded-b-md border gap-y-3 h-[148px] md:px-3 p-3 md:py-3 lg:px-3 lg:py-3", cardContentStyles));


    return (
        <div >
            <a href={href} className={styles} key={key}>
                <img className={`w-full h-[248px] rounded-t-md border-[#a4a4a4] text-balance ${cardData.img_princ === "" ? "object-contain" : "object-cover"}`} loading="eager" width={408} height={248} src={cardData.img_princ === "" ? '/images/msz-logo.webp' : cardData.img_princ} alt="Imagen del interior de la vivienda" />

                <div class={contentCardStyles}>
                    <div className="">
                        <div className="lg:text-xl md:text-lg text-lg font-gotham font-semibold truncate ..."><span className="font-gothamBold ">{cardData.precio}</span> | {he.decode(cardData.in_cal)} {cardData.in_nro}</div>
                        <p className="text-bg-2-msb font-gothamMedium truncate ...">
                            {he.decode(cardData.in_loc)} {he.decode(cardData.in_bar) ? `- ${he.decode(cardData.in_bar)}` : ""}
                        </p>
                    </div>
                    <div className="flex flex-auto w-100 justify-start  items-center mt-1 gap-x-1 overflow-hidden ">

                        {he.decode(cardData.in_cub) !== "0.00" && he.decode(cardData.in_cub) !== "" && <span className="flex items-center text-sm font-thin text-gray-700 mr-2 mb-2 gap-1 "><RuleIcon h="16" w="16" /> {he.decode(cardData?.in_cub)}m²</span>}
                        {he.decode(cardData.in_sto) !== "0.00" && he.decode(cardData.in_sto) !== "" && <span className="flex items-center text-sm font-thin text-gray-700 mr-2 mb-2 gap-1 truncate ..."><SquareMeterIcon h="16" w="16" /> {he.decode(cardData?.in_sto)}m²</span>}
                        {he.decode(cardData.ti_dor) !== "" && he.decode(cardData.ti_dor) !== "0" && <span className="flex items-center text-sm font-thin text-gray-700 mr-2 mb-2 gap-1 truncate ..."><DoorOpen /> {he.decode(cardData.ti_dor)} dorm.</span>}
                        {he.decode(cardData?.in_bao) !== "" && he.decode(cardData?.in_bao) !== "0" && <span className="flex items-center text-sm font-thin text-gray-700 mr-2 mb-2 gap-1 overflow-hidden truncate ..."><BathIcon />{`${he.decode(cardData?.in_bao) === "1" ? `${he.decode(cardData?.in_bao)} baño` : `${he.decode(cardData?.in_bao)} baños`}`} </span>}
                    </div>
                    <div className="flex justify-between h-fit absolute p-3 items-center bottom-0 right-0 left-0 h-100 place-content-end">
                        <div>
                            <button className="text-xs bg-bg-2-msb rounded-full px-3 py-2  hover:bg-bg-1-msb text-white uppercase">
                                {he.decode(cardData.operacion)}
                            </button>
                        </div>
                        <div class="flex place-content-center self-center items-center justify-center gap-1">
                            <a href={`https://api.whatsapp.com/send/?phone=5491144161700&text=Hola%2C+me+contactaba+desde+http%3A%2F%2Fmatiasszpira.com.ar%2F+para+consultarles&type=phone_number&app_absent=0`} target="_blank"><WhatsAppIcon className={'size-6 fill-gray-700'} /></a>
                        </div>

                    </div>
                </div>
            </a>
        </div>
    )
}

export default CardProperty

{/* <div className={'shadow-lg'}>
            <a href={href} className={styles} key={key}>
                <img className={`w-full h-[248px]  text-balance ${cardData.img_princ === "" ?  "object-contain" : "object-cover"}`} loading="eager" width={408} height={248} src={cardData.img_princ === "" ? '/images/msz-logo.webp' : cardData.img_princ  } alt="Imagen del interior de la vivienda" />
           
            <div class="bg-secondary-msb relative h-[210px] md:px-3 p-3 md:py-3 lg:px-3 lg:py-3">
                <div className="">
                    <div className="lg:text-xl md:text-lg text-lg font-medium"><span className="font-extrabold ">{cardData.precio}</span> | {he.decode(cardData.in_cal)} {cardData.in_nro}</div>
                    <p className="text-bg-2-msb font-bold">
                        {he.decode(cardData.in_loc)} {he.decode(cardData.in_bar) ? `- ${he.decode(cardData.in_bar)}` : ""}
                    </p>
                </div>
                <div className="flex justify-start  flex-wrap items-center mt-1 lg:gap-x-10 gap-x-5">

                    {he.decode(cardData.in_cub) !== "0.00" && he.decode(cardData.in_cub) !== "" && <span className="flex items-center text-base font-thin text-gray-700 mr-2 mb-2 gap-1"><RuleIcon /> {he.decode(cardData?.in_cub)}mt2</span>}
                    {he.decode(cardData.in_sto) !== "0.00" && he.decode(cardData.in_sto) !== "" && <span className="flex items-center text-base font-thin text-gray-700 mr-2 mb-2 gap-1"><SquareMeterIcon /> {he.decode(cardData?.in_sto)}mt2</span>}
                    {he.decode(cardData.ti_dor) !== "" && he.decode(cardData.ti_dor) !== "0" && <span className="flex items-center text-base font-thin text-gray-700 mr-2 mb-2 gap-1"><DoorOpen /> {he.decode(cardData.ti_dor)} dorm.</span>}
                    {he.decode(cardData?.in_bao) !== "" && he.decode(cardData?.in_bao) !== "0" && <span className="flex items-center text-base font-thin text-gray-700 mr-2 mb-2 gap-1"><BathIcon />{`${he.decode(cardData?.in_bao) === "1" ? `${he.decode(cardData?.in_bao)} baño` : `${he.decode(cardData?.in_bao)} baños`}`} </span>}
                </div>
                <div className="flex justify-between items-end absolute p-3 bottom-0 right-0 left-0 h-100 place-content-end self">
                    <button className="text-base bg-bg-2-msb rounded-full px-3 py-2  hover:bg-bg-1-msb text-white font-medium   uppercase">
                        {he.decode(cardData.operacion)}
                    </button>
                    <div class="flex items-center justify-center gap-1 ">
                        <a href={`https://api.whatsapp.com/send/?phone=5491144161700&text=Hola%2C+me+contactaba+desde+http%3A%2F%2Fmatiasszpira.com.ar%2F+para+consultarles&type=phone_number&app_absent=0`} target="_blank"><WhatsAppIcon className={'h-6 w-6 fill-gray-700'} /></a>
                    </div>

                </div>
            </div>
            </a>
        </div> */}