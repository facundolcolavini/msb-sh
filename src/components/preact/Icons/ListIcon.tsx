import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
    addStyles?: string;
    w?: string;
    h?: string;
}

const ListIcon = ({ addStyles, w = "16", h = "16" }: Props) => {
    const styles = twMerge(clsx("h-100 w-100 icon icon-tabler icon-tabler-list", addStyles));
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles} width={w} height={h} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill={styles} ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
    )
}

export default ListIcon