import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
    addStyles?: string;
    active?: boolean; // Nueva propiedad para indicar si el icono está activo
    w?: string;
    h?: string;
}

const VisibilityIcon = ({ addStyles, w = "24", h = "24" }: Props) => {
    const styles = twMerge(clsx("flex items-center h-100 w-100", addStyles));
    return (
<svg xmlns="http://www.w3.org/2000/svg"  width={w} height={h} className={styles} ><path fill={styles} d="M12 6a9.77 9.77 0 0 1 8.82 5.5A9.77 9.77 0 0 1 12 17a9.77 9.77 0 0 1-8.82-5.5A9.77 9.77 0 0 1 12 6Zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4Zm0 5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5Zm0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7Z"/></svg>
    )
}

export default VisibilityIcon