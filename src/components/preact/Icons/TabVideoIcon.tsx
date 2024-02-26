// TabVideoIcon.tsx
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TabVideoIconProps {
    addStyles?: string;
    w?: string;
    h?:string;
}

const TabVideoIcon = ({addStyles,w,h}: TabVideoIconProps) => {
    const styles = twMerge(clsx('object-contain h-100 w-100', addStyles));
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} fill="none"  className={styles}><path fill={styles} fill-rule="evenodd" d="M5 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1.586l2.293 2.293A1 1 0 0 0 22 16V8a1 1 0 0 0-1.707-.707L18 9.586V8a3 3 0 0 0-3-3H5Z" clip-rule="evenodd"/></svg>
    );
};

export default TabVideoIcon;