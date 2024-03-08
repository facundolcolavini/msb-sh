import clsx from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}
export const ArrowSortIcon = ({ addStyles, w = "24", h = "24" }: Props) => {
  const styles = twMerge(clsx("object-contain h-100 w-100", addStyles));
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 24 24`} width={w} height={h} className={styles} fill={styles}> <path fill={styles} d="M7.281 3.219a.75.75 0 0 0-1.062 0l-4.5 4.5a.75.75 0 1 0 1.062 1.062L6 5.561V20.25a.75.75 0 1 0 1.5 0V5.56l3.219 3.221a.75.75 0 1 0 1.062-1.062l-4.5-4.5ZM16.73 20.79a.75.75 0 0 0 1.04 0l4.5-4.35a.751.751 0 0 0-1.04-1.08L18 18.482V3.752a.75.75 0 1 0-1.5 0v14.73l-3.228-3.12a.75.75 0 1 0-1.044 1.077l4.502 4.351Z"/></svg>
  )
}
