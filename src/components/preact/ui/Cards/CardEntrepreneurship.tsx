
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
    cardContentStyles?: string;
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
            return "bg-tertiary-bg-msb  hover:bg-tertiary-hover-msb"
        default:
            return "bg-secondary-bg-hover-msb"

    }

}

const CardEntrepreneurship: FunctionComponent<Props> = ({ cardData, addStyles, href, cardContentStyles }: Props) => {
    const [colorEst, setColorEst] = useState(colorEstLabel(cardData.ed_est))


    const styles = twMerge(clsx("rounded relative overflow-hidden  rounded-b-md  h-100", addStyles));
    const contentCardStyles = twMerge(clsx("bg-secondary-msb rounded-b-md border relative h-[144px] md:px-3 p-3 md:py-3 lg:px-3 lg:py-3", cardContentStyles));

    colorEstLabel(cardData.ed_est)
    return (
        <div>
        <a href={href} className={styles} key={cardData} >
            <img className="w-full h-[248px] rounded-t-md border-[#a4a4a4]  text-balance object-cover" width={407} height={248} src={cardData.img_princ} style={{
                aspectRatio: "380/192",
                objectFit: "cover",
            }} alt="Imagen del interior de la vivienda" />

            <div class={contentCardStyles}>
                <div className="">
                    <div className="lg:text-xl md:text-lg text-lg font-gothamMedium font-thin truncate ..."><span className="font-gothamBold capitalize">{cardData.ed_nom}</span></div>
                    <p className="text-primary-text-msb font-gotham flex gap-1">
                        <span className={'text-primary-text-msb font-gothamMedium'}>Posesión:</span>
                        {cardData.ed_pos || "No disponible"}
                    </p>
                </div>

                <div className="flex justify-between absolute w-full p-3 items-center bottom-0 right-0 left-0 h-100 ">
             
                        <button className={`${colorEst} text-base rounded-full px-3 py-2  hover:bg-bg-1-msb text-white font-bold uppercase`}>
                            {cardData?.ed_est.replace("&oacute;", "ó")}
                        </button>
                        <div class="flex place-content-center self-center items-center justify-center gap-1">
                            <a href={`https://api.whatsapp.com/send/?phone=5491144161700&text=Hola%2C+me+contactaba+desde+http%3A%2F%2Fmatiasszpira.com.ar%2F+para+consultarles&type=phone_number&app_absent=0`} target="_blank"><WhatsAppIcon className={'size-6 fill-gray-700'} /></a>
                        </div>
                
                </div>
            </div>
        </a>
        </div>

    )
}

export default CardEntrepreneurship