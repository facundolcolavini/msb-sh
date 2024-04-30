import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}
const ErrorIcon = ({ addStyles, w = "24", h = "24" }: Props) => {
  const styles = twMerge(clsx("h-100 w-100 object-contain", addStyles));
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg"  className={styles} width={w} height={h} fill="none"   viewBox="0 0 24 24" stroke={addStyles ?? "currentColor"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-x"><path stroke="none" d="M0 0h24v24H0z" /><path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0M10 10l4 4m0-4-4 4" /></svg>   </>
  )
}

export default ErrorIcon