import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}
const DoorOpen = ({ addStyles, w = "16", h = "16" }: Props) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return (
    <>
      <img id="door-open" className={styles} alt="door open icon" src="/images/door-open.png" width={w} height={h} />
    </>

  )
}

export default DoorOpen