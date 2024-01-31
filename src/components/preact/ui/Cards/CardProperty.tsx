

import type { HTMLAttributes } from "astro/types";
import clsx from 'clsx';
import type { FunctionComponent } from "preact/compat";
import { twMerge } from 'tailwind-merge';
import SquareMeterIcon from '../../Icons/SquareMeterIcon';
import HeartIcon from "../../Icons/HeartIcon";
import type { File } from "src/interfaces/results.records.interfaces";
import BathIcon from "../../Icons/BathIcon";
import DoorOpen from "../../Icons/DoorOpen";
import RuleIcon from "../../Icons/RuleIcon";

interface Props extends HTMLAttributes<"a"> {
    cardData: File
    addStyles?: string;
    href: string;
    key: string;
}

const CardProperty: FunctionComponent<Props> = ({ cardData, addStyles,href, key }: Props) => {
    const styles = twMerge(clsx("rounded overflow-hidden shadow-lg h-100 animate-fade", addStyles));
    return (

        <a href={href} className={styles} key={key}>
            <img className="w-full h-[248px]  text-balance object-cover" loading="eager" width={408} height={248} src={cardData.img_princ} alt="Imagen del interior de la vivienda" />
            <div class="bg-secondary-msb  min-h-fit p-6">
                <div className="">
                    <div className="text-xl  font-medium text-nowrap"><span className="font-extrabold ">{cardData.precio}</span> | {cardData.in_cal} {cardData.in_nro}</div>
                    <p className="text-bg-2-msb font-bold">
                        {cardData.in_loc}
                    </p>
                </div>
                <div className="flex justify-start items-center m-0 pt-2">

                    <span className="flex items-center text-sm font-semibold text-gray-700 mr-2 mb-2 gap-1"><RuleIcon /> 51mt2</span>
                    <span className="flex items-center text-sm font-semibold text-gray-700 mr-2 mb-2 gap-1"><SquareMeterIcon /> 46mt2</span>
                    <span className="flex items-center text-sm font-semibold text-gray-700 mr-2 mb-2 gap-1"><DoorOpen /> {cardData.ti_dor}</span>
                    <span className="flex items-center text-sm font-semibold text-gray-700 mr-2 mb-2 gap-1"><BathIcon />{`${cardData?.in_ban} baño`} </span>
                </div>
                <div className="flex justify-between self-end">
                    <button className="bg-bg-2-msb rounded-full px-3 py-2  hover:bg-bg-1-msb text-white font-bold   uppercase">
                        {cardData.operacion}
                    </button>

                    <button>
                        <HeartIcon />
                    </button>
                </div>
            </div>

        </a>

    )
}

export default CardProperty