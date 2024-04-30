import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
  path?:string;
}
const DoorOpen = ({ addStyles, w = "16", h = "16" , path="/images/door-open.png"}: Props) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return (
    <>
      <img id="door-open" className={styles} alt="door open icon" src={path} width={w} height={h} />
    </>

  )
}

export default DoorOpen