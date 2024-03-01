import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
  imgUrl?:string;
}
const HomePropertyIcon = ({ addStyles, w = "56", h = "56", imgUrl= 'home-property' }: Props) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return (
    <>
      <img id={imgUrl} className={styles} alt={`${imgUrl} icon`} src={`/images/${imgUrl}.png`} width={w} height={h} />
    </>

  )
}

export default HomePropertyIcon