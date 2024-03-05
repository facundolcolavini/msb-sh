import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  h? : string;
  w? : string;
  addStyles? : string;
}

export const WhatsAppIcon = ({addStyles, h="24",w="24"}:Props) => {
  const styles = twMerge(clsx("icon icon-tabler icon-tabler-brand-whatsapp flex justify-center items-center", addStyles));
  return (
  <svg xmlns="http://www.w3.org/2000/svg" className={styles} width={w} height={h} viewBox="0 0 24 24" stroke-width="1.8" stroke="#494949" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
  )
}