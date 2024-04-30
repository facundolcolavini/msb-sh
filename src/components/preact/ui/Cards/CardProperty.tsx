
import BathIcon from "@/components/preact/Icons/BathIcon";
import DoorOpen from "@/components/preact/Icons/DoorOpen";
import RuleIcon from "@/components/preact/Icons/RuleIcon";
import type { File } from "@/interfaces/results.records.interfaces";
import type { HTMLAttributes } from "astro/types";
import clsx from 'clsx';
import he from "he";
import { type FunctionComponent } from "preact/compat";
import { twMerge } from 'tailwind-merge';
import SquareMeterIcon from '@/components/preact/Icons/SquareMeterIcon';
import WhatsAppIcon from "@/components/preact/Icons/WhatsAppIcon";


interface Props extends HTMLAttributes<"a"> {
    cardData: File
    addStyles?: string;
    href: string;
    key: string;
}
const CardProperty: FunctionComponent<Props> = ({ cardData, addStyles, href, key }: Props) => {

    const styles = twMerge(clsx("rounded relative overflow-hidden shadow-lg h-100 animate-fade", addStyles));

    //Add To Favorite


    return (
        <div className={'shadow-lg'}>
            <a href={href} className={styles} key={key}>
                <img className="w-full h-[248px]  text-balance object-cover" loading="eager" width={408} height={248} src={cardData.img_princ} alt="Imagen del interior de la vivienda" />
            </a>
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

        </div>

    )
}

export default CardProperty