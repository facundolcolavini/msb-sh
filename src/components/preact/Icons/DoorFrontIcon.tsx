import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
    addStyles?: string;
    active?: boolean; // Nueva propiedad para indicar si el icono está activo
    w?: string;
    h?: string;
}

const DoorFrontIcon = ({ addStyles, w = "24", h = "24" }: Props) => {
    const styles = twMerge(clsx("flex items-center h-100 w-100", addStyles));
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} className={styles}><path fill={styles} d="M21.333 21.333V2.667C21.333 1.2 20.133 0 18.667 0H5.333a2.675 2.675 0 0 0-2.666 2.667v18.666H0V24h24v-2.667h-2.667Zm-2.666 0H5.333V2.667h13.334v18.666Zm-5.334-10.666H16v2.666h-2.667v-2.666Z"/></svg>
        )

}

export default DoorFrontIcon