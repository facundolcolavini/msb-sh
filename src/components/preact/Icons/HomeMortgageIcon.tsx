import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w ?: string;
  h ?: string; 
}
const HomeMortgageIcon = ({addStyles, w = "16", h = "16"}:Props) => {
    const styles = twMerge(clsx("h-100 w-100 object-contain", addStyles));
  return (
    <>
      <img id="home-mortgage" className={styles}  alt="home mortgage icon" src="/images/home-mortgage.png" width={w} height={h} />
    </>
  )
}

export default HomeMortgageIcon