import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
    addStyles?: string;
    w ?: string;
    h ?: string; 
  }
const WarningAlertIcon = ({addStyles, w = "24", h = "24"}:Props) => {
    const styles = twMerge(clsx("h-100 w-100 object-contain", addStyles));
  return (
    <>
      <img id="warning alert" className={styles} alt="warning alert icon" src="/images/warning.png" width={w} height={h} />
    </>
  )
}

export default WarningAlertIcon