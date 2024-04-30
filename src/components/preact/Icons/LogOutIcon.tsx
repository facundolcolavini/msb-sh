import { clsx } from "clsx";
import type { FunctionComponent } from "preact";
import { twMerge } from "tailwind-merge";

interface Props {
    addStyles?:string;
}

const LogOutIcon = ({addStyles}:Props) => {
    const styles = twMerge(clsx("h-100 w-100 icon icon-tabler icon-tabler-calendar-month", addStyles));
  return (

    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={styles} className={styles} ><path  fill={styles} stroke={styles} d="M5 21c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 3 19V5c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 5 3h7v2H5v14h7v2H5Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5-5 5Z"/></svg>
  );
};

export default LogOutIcon;
