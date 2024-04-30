import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
  addStyles?: string;
  active?: boolean; // Nueva propiedad para indicar si el icono está activo
  w?: string;
  h?: string;
}

const DocumentPdfIcon = ({ addStyles, w = "24", h = "24" }: Props) => {
  const styles = twMerge(clsx("icon-tabler icon-tabler-file-type-pdf ", addStyles));
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} className={styles} fill="currentColor" viewBox="-4 -2 24 24"><path d="M3 0h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm1 7a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2H4zm0 8a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2H4zM4 3a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2H4zm0 8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H4z"/></svg>
    )
}

export default DocumentPdfIcon