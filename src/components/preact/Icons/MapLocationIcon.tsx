import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;

}
const MapLocationIcon = ({ addStyles, w = "24", h = "24" }: Props) => {
  const styles = twMerge(clsx("object-contain h-100 w-100", addStyles));
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 56 56`} width={w} height={h} className={styles} fill={styles}><path fill={styles} d="M28.001 32.667c5.148 0 9.334-4.186 9.334-9.334C37.335 18.186 33.149 14 28 14c-5.147 0-9.333 4.186-9.333 9.333 0 5.148 4.186 9.334 9.333 9.334Zm0-14a4.671 4.671 0 0 1 4.667 4.666A4.671 4.671 0 0 1 28.001 28a4.671 4.671 0 0 1-4.666-4.667A4.671 4.671 0 0 1 28 18.667Z"/><path fill={styles} d="M26.646 50.9a2.328 2.328 0 0 0 2.706 0c.71-.502 17.381-12.54 17.314-27.567 0-10.292-8.375-18.666-18.667-18.666-10.292 0-18.667 8.374-18.667 18.655-.067 15.038 16.604 27.076 17.314 27.577Zm1.353-41.567c7.72 0 14 6.28 14 14.012.049 10.355-10.239 19.654-14 22.703-3.76-3.052-14.05-12.352-14-22.715 0-7.72 6.279-14 14-14Z"/></svg>
       
    </>

  )
}

export default MapLocationIcon