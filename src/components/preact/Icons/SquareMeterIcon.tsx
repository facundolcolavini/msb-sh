import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}

const SquareMeterIcon = ({ addStyles, w = "16", h = "16" }: Props) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return (
    <>
    <img id="square-meter" className={styles} alt="square meter icon" src="/images/square-meter.png" width={w} height={h}/>
    </>

  )
}

export default SquareMeterIcon