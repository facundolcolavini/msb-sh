// TabGalleryIcon.tsx
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TabGalleryIconProps {
    addStyles?: string;
    w?: string;
    h?: string;
}

const TabGalleryIcon = ({addStyles,w,h}: TabGalleryIconProps) => {
    const styles = twMerge(clsx('object-contain h-100 w-100', addStyles));
    return (
<svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} fill="none" className={styles}><g clip-path="url(#a)"><path fill={styles} d="M8.333 5.833a2.41 2.41 0 0 1-.729 1.771 2.41 2.41 0 0 1-1.77.73 2.41 2.41 0 0 1-1.771-.73 2.41 2.41 0 0 1-.73-1.77c0-.695.243-1.285.73-1.771a2.41 2.41 0 0 1 1.77-.73 2.41 2.41 0 0 1 1.771.73 2.41 2.41 0 0 1 .73 1.77Zm13.334 5v5.834H3.333v-2.5L7.5 10l2.083 2.083 6.667-6.666 5.417 5.416Zm1.25-9.166H2.083a.4.4 0 0 0-.293.123.4.4 0 0 0-.123.293v15.834a.4.4 0 0 0 .123.293.4.4 0 0 0 .293.123h20.834a.4.4 0 0 0 .293-.123.4.4 0 0 0 .123-.293V2.083a.4.4 0 0 0-.123-.293.4.4 0 0 0-.293-.123ZM25 2.083v15.834c0 .573-.204 1.063-.612 1.471a2.006 2.006 0 0 1-1.471.612H2.083a2.006 2.006 0 0 1-1.471-.612A2.006 2.006 0 0 1 0 17.917V2.083C0 1.51.204 1.02.612.612A2.006 2.006 0 0 1 2.083 0h20.834c.573 0 1.063.204 1.471.612.408.408.612.898.612 1.471Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h25v20H0z"/></clipPath></defs></svg>
    );
};

export default TabGalleryIcon;