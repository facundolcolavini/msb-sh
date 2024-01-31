
import type { HTMLAttributes } from "astro/types";
import clsx from "clsx";
import type { FunctionComponent } from "preact";
import { twMerge } from "tailwind-merge";
import { PaperLocationIcon } from '../../Icons/PaperLocationIcon';
import { WhatsAppIcon } from "../../Icons/WhatsAppIcon copy";

interface Props extends HTMLAttributes<"a"> {
    suc_name: string;
    suc_loc: string;
    suc_img: string;
    suc_dir: string;
    suc_phone: string;
    addStyles?: string;
    href: string;
}

const CardBranch: FunctionComponent<Props> = ({ href, suc_name, suc_loc, suc_img, suc_dir, suc_phone, addStyles }) => {
    const styles = twMerge(clsx(" rounded-lg  mx-auto w-full overflow-hidden shadow-lg ", addStyles));
    return (
        <a href={href} target="_blank" className={styles} >
            <div class="bg-secondary-msb">
                <img className="w-full object-cover" src={suc_img} alt={suc_name} />
                <div className="p-5 border-[#A4A4A4] border-r-2 border-l-2 border-b-2 rounded-b-lg ">
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
                            <span><PaperLocationIcon /></span>
                            <WhatsAppIcon />
                        </div>

                    </div>

                </div>

            </div>
        </a>
    )
}

export default CardBranch