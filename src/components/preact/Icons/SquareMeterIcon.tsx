import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}

const SquareMeterIcon = ({ addStyles, w = "16", h = "16" }: Props) => {
  const styles = twMerge(clsx("h-100 w-100", addStyles));
  return (
    <>
   
    <img id="square-meter" alt="square meter icon" src="/images/square-meter.png" width={w} height={h}/>

    </>

  )
}

export default SquareMeterIcon