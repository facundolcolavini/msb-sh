import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
interface Props {
    addStyles?: string;
    w?: string;
    h?: string;
}

const PropertyBuildIcon = ({ addStyles, w = "16", h = "16" }: Props) => {
    const styles = twMerge(clsx("h-100 w-100 icon-tabler icon-tabler-list", addStyles));
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox={`0 0 24 24`} className={styles}><path  fill={styles} d="M21.274 5.333H18.91V8h2.364V5.333ZM21.274 10.667H18.91v2.666h2.364v-2.666ZM21.274 16H18.91v2.667h2.364V16ZM0 10.667V24h7.09v-6.667h2.365V24h7.09V10.667L8.274 4 0 10.667Zm14.182 10.666h-2.364v-6.666h-7.09v6.666H2.363V12l5.909-4.667L14.182 12v9.333Z"/><path fill={styles} d="M10.637 0v2.627L13 4.533V2.667h10.637v18.666h-4.728V24H26V0H10.637Z"/></svg>
    )
}

export default PropertyBuildIcon