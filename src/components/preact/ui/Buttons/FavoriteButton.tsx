import HeartIcon from "@/components/preact/Icons/HeartIcon";
import clsx from "clsx";
import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { twMerge } from "tailwind-merge";
interface FavoriteButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'icon'> {

}

interface FavoriteButtonProps {
    initialIsFavorited: boolean;
    toggleFavorite: (e: Event) => Promise<void>
 
    children:  JSX.Element;
    addStyles?:string;
}

const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({ initialIsFavorited,toggleFavorite ,addStyles,children }) => {
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

    const styles = twMerge(clsx("", addStyles));
    const handleClick = (e:Event) => {
        e.preventDefault();
        setIsFavorited(!isFavorited);
        toggleFavorite(e);
    };
    useEffect(() => {
        setIsFavorited(initialIsFavorited);
    }, [initialIsFavorited]);
    return (
        <button  className={styles} onClick={handleClick}>
       {/*      {isFavorited ? '❤️' : '🤍'} */}
            {children}
            <span  className={ !isFavorited? " fill-black-400" : "fill-black-400"}>
            <HeartIcon addStyles={ !isFavorited ? "fill-primary-white stroke-primary-text-msb  hover:fill-primary-text-msb " : "stroke-primary-text-msb transition-all hover:fill-primary-text-msb fill-primary-text-msb"}  />
          </span>
        </button>
    );
};

export default FavoriteButton;