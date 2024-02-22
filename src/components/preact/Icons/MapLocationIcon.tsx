import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}
const MapLocationIcon = ({ addStyles, w = "56", h = "56" }: Props) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return (
    <>
      <img id="map-location" className={styles} alt="map location icon" src="/images/map.png" width={w} height={h} />
    </>

  )
}

export default MapLocationIcon