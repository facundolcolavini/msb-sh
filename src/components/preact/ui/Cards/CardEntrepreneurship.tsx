
import WhatsAppIcon from "@/components/preact/Icons/WhatsAppIcon";
import type { HTMLAttributes } from "astro/types";
import clsx from 'clsx';
import { useState, type FunctionComponent } from "preact/compat";
import { twMerge } from 'tailwind-merge';

interface Props extends HTMLAttributes<"a"> {
    cardData: {
        ed_nom: string;
        ed_pos: string;
        img_princ: string;
        ed_est: string;
    }
    addStyles?: string;
    href: string;
}    const colorEstLabel = (est: string) => {

    const estLabel = est.replace("&oacute;", "ó").toUpperCase()
    switch (estLabel) {
        case "EN CONSTRUCCIÓN":
            return "bg-tertiary-bg-hover-msb hover:bg-bg-3-hover-msb"
        case "EN POZO":
            return "bg-secondary-bg-hover-msb hover:bg-bg-1-hover-msb"
        case "TERMINADO":
            return "bg-tertiary-bg-msb  hover:bg-tertiary-hover-msb "
        default:
            return "bg-secondary-bg-hover-msb"

    }

}

const CardEntrepreneurship: FunctionComponent<Props> = ({ cardData, addStyles, href }: Props) => {
    const [colorEst, setColorEst] = useState(colorEstLabel(cardData.ed_est))


    const styles = twMerge(clsx("rounded relative overflow-hidden shadow-lg h-100", addStyles));

    colorEstLabel(cardData.ed_est)
    return (
        <div className={'shadow-lg'}>
            <a href={href} className={styles} >
                <img className="w-full h-[248px]  text-balance object-cover" width={380} height={248} src={cardData.img_princ} style={{
                    aspectRatio: "380/192",
                    objectFit: "cover",
                }} alt="Imagen del interior de la vivienda" />
            </a>
            <div class="bg-secondary-msb relative h-[150px] md:px-3 p-3 md:py-3 lg:px-3 lg:py-3">
                <div className="">
                    <div className="lg:text-xl md:text-lg text-lg font-medium"><span className="font-extrabold capitalize">{cardData.ed_nom}</span></div>
                    <p className="text-primary-text-msb font-thin flex gap-1">
                        <span className={'text-primary-text-msb font-bold'}>Posesión:</span>
                        {cardData.ed_pos || "No disponible"}
                    </p>
                </div>

                <div className="flex justify-between items-end absolute p-3 bottom-0 right-0 left-0 h-100 place-content-end self">
                    <button className={`${colorEst} rounded-full px-3 py-2  hover:bg-bg-1-msb text-white font-bold  text-sm uppercase`}>
                        {cardData?.ed_est.replace("&oacute;", "ó")}
                    </button>
                    <div class="flex items-center justify-center gap-1 ">
                        <a href={`https://api.whatsapp.com/send/?phone=5491144161700&text=Hola%2C+me+contactaba+desde+http%3A%2F%2Fmatiasszpira.com.ar%2F+para+consultarles&type=phone_number&app_absent=0`} target="_blank"><WhatsAppIcon className={'h-6 w-6 fill-gray-700'}/></a>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default CardEntrepreneurship