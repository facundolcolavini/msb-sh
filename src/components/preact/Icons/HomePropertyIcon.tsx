import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}
const HomeProperty = ({ addStyles, w = "56", h = "56" }: Props) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return (
    <>
      <img id="home-property" className={styles} alt="home property icon" src="/images/home-property.png" width={w} height={h} />
    </>

  )
}

export default HomeProperty