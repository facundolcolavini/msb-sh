import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
    addStyles?: string;
    w?: string;
    h?: string;
}

const PaperTipsIcon = ({ addStyles, w = "16", h = "16" }: Props) => {
    const styles = twMerge(clsx("h-100 w-100", addStyles));
    return (
        <>
            <img id="paper-tips" alt="paper tips icon" className={styles} src="/images/paper-tips.png" width={w} height={h} />
        </>
    )
}

export default PaperTipsIcon