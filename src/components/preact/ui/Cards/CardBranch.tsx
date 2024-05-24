
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
    highlight?: boolean;
    whatsAppPhone: string;
}

const CardBranch: FunctionComponent<Props> = ({ href, suc_name, suc_loc, suc_img, suc_dir, suc_phone, whatsAppPhone, addStyles, highlight = false }) => {
    const styles = twMerge(clsx(" rounded-lg h-100 mx-auto w-full overflow-hidden shadow-lg relative", addStyles));
    return (
        <div className={styles}>
            
            <div class="bg-white ">
            {highlight 
                        && (
                             <p className=" absolute  right-3  top-3 text-md font-bold rounded-full px-3 py-2 bg-secondary-bg-hover-msb hover:bg-bg-1-msb hover:animate-twice text-white   text-sm uppercase">
                        {suc_loc}
                    </p>) }
                <img className="w-full h-100 object-cover" src={suc_img} alt={suc_name} />
                <div className="p-5 h-[142px] flex  justify-between flex-col bg-white">
                    <div className="text-xl font-gothamMedium font-bold text-nowrap capitalize"><span className="font-extrabold capitalize">{suc_name}</span></div>
                    <p className="text-bg-2-msb  font-gothamMedium font-thin text-md ">
                        {suc_loc}
                    </p>


                    <div class="flex justify-between align-bottom items-end h-100 ">
                        <div className={''}>
                            <span className="flex flex-wrap items-center text-xs font-semibold text-gray-700 mr-2 ">{suc_dir}</span>
                            <span className="flex items-center text-xs font-semibold text-gray-700 gap-1  ">{suc_phone}</span>
                        </div>

                        <div class="flex items-center justify-center gap-1 place-content-end self-end ">
                            <a href={href} target="_blank"><PaperLocationIcon className={'h-5 w-5 md:h-5 md:w-5 lg:h-5 lg:w-5 stroke-gray-700'} /></a>
                            <a href={`https://api.whatsapp.com/send?phone=${whatsAppPhone}`} target="_blank">
                                <WhatsAppIcon className={'h-5 w-5 md:h-5 md:w-5 lg:h-5 lg:w-5 fill-gray-700'} />
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CardBranch