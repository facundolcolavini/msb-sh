import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
    addStyles?: string;
    w?: string;
    h?: string;
}
const FurnitureIcon = ({ addStyles, w = "16", h = "16" }: Props) => {
    const styles = twMerge(clsx("h-100 w-100 icon icon-tabler icon-tabler-sofa", addStyles));
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={styles} width={w} height={h} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 11a2 2 0 0 1 2 2v1h12v-1a2 2 0 1 1 4 0v5a1 1 0 0 1 -1 1h-18a1 1 0 0 1 -1 -1v-5a2 2 0 0 1 2 -2z" /><path d="M4 11v-3a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v3" /><path d="M12 5v9" /></svg>
    )
}

export default FurnitureIcon