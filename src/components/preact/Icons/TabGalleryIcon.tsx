// TabGalleryIcon.tsx
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TabGalleryIconProps {
    addStyles?: string;
    active?: boolean; // Nueva propiedad para indicar si el icono está activo
}

const TabGalleryIcon = (props: TabGalleryIconProps) => {
    const styles = twMerge(clsx('object-contain', props.active && 'fill-primary-text-msb', props.addStyles)); // Agrega 'fill-primary-text-msb' si el icono está activo
    return (
        <img className={styles} id="tabImage" alt="tabImage icon" src="/images/tabImage.png" width="30" height="30" />
    );
};

export default TabGalleryIcon;