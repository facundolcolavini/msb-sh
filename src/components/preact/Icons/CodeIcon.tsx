import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
    addStyles?: string;
    active?: boolean; // Nueva propiedad para indicar si el icono está activo
    w?: string;
    h?: string;
}

const CodeIcon = ({ addStyles, w = "24", h = "24" }: Props) => {
    const styles = twMerge(clsx("flex items-center h-100 w-100", addStyles));
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} fill={styles}><path fill={styles} d="m8.8 16.8 1.867-1.9-2.9-2.9 2.9-2.9L8.8 7.2 4 12l4.8 4.8Zm6.4 0L20 12l-4.8-4.8-1.867 1.9 2.9 2.9-2.9 2.9 1.867 1.9ZM2.667 24c-.734 0-1.362-.26-1.884-.783A2.57 2.57 0 0 1 0 21.333V2.667C0 1.933.26 1.305.783.783A2.571 2.571 0 0 1 2.667 0h18.666c.734 0 1.362.26 1.884.783.522.522.783 1.15.783 1.884v18.666a2.57 2.57 0 0 1-.783 1.884 2.57 2.57 0 0 1-1.884.783H2.667Zm0-2.667h18.666V2.667H2.667v18.666Z"/></svg>
        )

}

export default CodeIcon