import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
    addStyles?: string;
    w ?: string;
    h ?: string; 
  }
const ShareIcon = ({addStyles, w = "24", h = "24"}:Props) => {
    const styles = twMerge(clsx("h-100 w-100 object-contain", addStyles));
  return (
    <>
      <img id="share-icon" className={styles} alt="share icon" src="/images/share.png" width={w} height={h} />
    </>
  )
}

export default ShareIcon