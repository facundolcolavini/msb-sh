import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}
const BathIcon = ({ addStyles, w = "16", h = "16" }: Props) => {
  const styles = twMerge(clsx("h-100 w-100 icon icon-tabler icon-tabler-bath", addStyles));
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className={styles} width={w} height={h} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1z" /><path d="M6 12v-7a2 2 0 0 1 2 -2h3v2.25" /><path d="M4 21l1 -1.5" /><path d="M20 21l-1 -1.5" /></svg>
    </>
  )
}

export default BathIcon