
import HeartIcon from "@components/preact/Icons/HeartIcon";
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


    const styles = twMerge(clsx("rounded overflow-hidden shadow-lg h-100", addStyles));

    colorEstLabel(cardData.ed_est)
    return (

        <a href={href} className={styles} >
            <img className="w-full h-[248px]  text-balance object-cover" width={380} height={248} src={cardData.img_princ} style={{
                aspectRatio: "380/192",
                objectFit: "cover",
            }} alt="Imagen del interior de la vivienda" />
            <div class="bg-secondary-msb  min-h-fit   p-6 ">
                <div className="">
                    <div className="text-xl mb-2 font-medium text-nowrap capitalize"><span className="font-extrabold capitalize">{cardData.ed_nom}</span></div>
                    <p className="text-primary-text-msb font-thin flex gap-1">
                        <span className={'text-primary-text-msb font-bold'}>Posesión:</span>
                        {cardData.ed_pos || "No disponible"}
                    </p>
                </div>
                
                <div className="flex justify-between self-end pt-2">
                    <button className={`${colorEst} rounded-full px-3 py-2  hover:bg-bg-1-msb text-white font-bold  text-sm uppercase`}>
                        {cardData?.ed_est.replace("&oacute;", "ó")}
                    </button>

                    <button className="hover:bg-primary-msb">
                        <HeartIcon />
                    </button>
                </div>
            </div>

        </a>

    )
}

export default CardEntrepreneurship