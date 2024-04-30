
import PaperLocationIcon from '@/components/preact/Icons/PaperLocationIcon';
import WhatsAppIcon from "@/components/preact/Icons/WhatsAppIcon";
import type { HTMLAttributes } from "astro/types";
import clsx from "clsx";
import type { FunctionComponent } from "preact";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<"div"> {
    suc_name: string;
    suc_loc: string;
    suc_img: string;
    suc_dir: string;
    suc_phone: string;
    addStyles?: string;
    href: string;
    whatsAppPhone: string;
}

const CardBranch: FunctionComponent<Props> = ({ href, suc_name, suc_loc, suc_img, suc_dir, suc_phone, whatsAppPhone, addStyles }) => {
    const styles = twMerge(clsx(" rounded-lg  mx-auto w-full overflow-hidden shadow-lg", addStyles));
    return (
        <div className={styles}>
            <div class="bg-secondary-msb">
                <img className="w-full object-cover" src={suc_img} alt={suc_name} />
                <div className="p-5 ">
                    <div className="text-xl font-medium text-nowrap capitalize"><span className="font-extrabold capitalize">{suc_name}</span></div>
                    <p className="text-bg-2-msb  text-md font-bold">
                        {suc_loc}
                    </p>
                    <div class="flex justify-between">
                        <div>
                            <span className="flex items-center text-sm font-semibold text-gray-700 mr-2 mb-1 ">{suc_dir}</span>
                            <span className="flex items-center text-xs font-semibold text-gray-700 mr-2 mb-2 gap-1">{suc_phone}</span>
                        </div>

                        <div class="flex items-center justify-center gap-1 ">
                            <a href={href} target="_blank"><PaperLocationIcon className={'h-4 w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 stroke-gray-700'} /></a>
                            <a href={`https://api.whatsapp.com/send?phone=${whatsAppPhone}`} target="_blank">
                                <WhatsAppIcon className={'h-4 w-4 md:h-5 md:w-5 lg:h-5 lg:w-5 fill-gray-700'} />
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CardBranch