import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
    addStyles?: string;
    w ?: string;
    h ?: string; 
  }
const HomeLocation = ({addStyles, w = "16", h = "16"}:Props) => {
    const styles = twMerge(clsx("h-100 w-100 object-contain", addStyles));
  return (
    <>
      <img id="home-location" className={styles} alt="home location icon" src="/images/home-location.png" width={w} height={h} />
    </>
  )
}

export default HomeLocation