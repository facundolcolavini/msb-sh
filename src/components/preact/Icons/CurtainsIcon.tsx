import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
    addStyles?: string;
    w?: string;
    h?: string;
}
export const CurtainsIcon = ({ addStyles, w = "16", h = "16" }: Props) => {
    const styles = twMerge(clsx("h-100 w-100 object-contain", addStyles));
    return (
        <img id="curtains" className={styles} alt="curtains icon" src="/images/curtains.png" width={w} height={h} />
    )
}
