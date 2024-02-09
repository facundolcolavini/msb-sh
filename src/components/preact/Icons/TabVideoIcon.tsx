// TabVideoIcon.tsx
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TabVideoIconProps {
    addStyles?: string;
    active?: boolean; // Nueva propiedad para indicar si el icono está activo
}

const TabVideoIcon = (props: TabVideoIconProps) => {
    const styles = twMerge(clsx('object-contain', props.active && 'fill-primary-text-msb', props.addStyles)); // Agrega 'fill-primary-text-msb' si el icono está activo
    return (
        <img id="tabVideo" alt="tabVideo icon" className={styles} src="/images/tabVideo.png" width="30" height="30" />
    );
};

export default TabVideoIcon;