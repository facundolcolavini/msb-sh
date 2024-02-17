import { useEffect, useState } from 'preact/hooks';
import { resetTabMenu, setTabMenu, tabMenuPropertyStore } from '../../../store/tabMenuPropertyStore';

import TabVideoIcon from "../Icons/TabVideoIcon";
import Button from "../ui/Buttons/Button";
import type { FunctionComponent, JSX } from 'preact';
import TabGalleryIcon from '../Icons/TabGalleryIcon';
interface Props {
    videoUrl: string | null
}
const TabMenu: FunctionComponent<Props> = ({ videoUrl }: Props) => {
    const [tabMenuProperty, setTabMenuProperty] = useState(
        tabMenuPropertyStore.get()
    );

    useEffect(() => {
        resetTabMenu();
    }, [])

    const handlerTab = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        // El que está en true no se puede volver a clickear
        if (e.currentTarget.id === 'tabGallery') {
            console.log()
            setTabMenuProperty(prev => ({
                ...prev,
                video: false,
                gallery: true
            }));
            setTabMenu({ // Actualiza el estado del almacén aquí
                video: false,
                gallery: true
            });
        } else if (e.currentTarget.id === 'tabVideo') {
            setTabMenuProperty(prev => ({
                ...prev,
                video: true,
                gallery: false
            }));
            setTabMenu(
                {
                    video: true,
                    gallery: false
                }
            );
        }
    };

    return (
        <div className={'flex items-center gap-3 '}>
            <Button
                id="tabGallery"
                type="button"
                disabled={tabMenuPropertyStore.get()?.gallery}
                icon={<TabGalleryIcon addStyles={tabMenuPropertyStore.get()?.gallery ? ' bg-primary-text-msb animate-fill-forwards transition-all animation-duration-400' : ''} active={tabMenuPropertyStore.get()?.gallery} />}
                onClick={handlerTab}
                value={tabMenuPropertyStore.get().gallery === true ? 'true' : 'false'}
                addStyles="bg-transparent hover:bg-transparent px-0"
            />
            {videoUrl === null ? null : <Button
                type="button"
                disabled={tabMenuPropertyStore.get().video}
                icon={<TabVideoIcon addStyles={tabMenuPropertyStore.get()?.video ? 'bg-primary-text-msb animate-fill-forwards transition-all animation-duration-400 rounded-lg ' : ''} active={tabMenuPropertyStore.get()?.video} />}
                id="tabVideo"
                onClick={handlerTab}
                value={tabMenuPropertyStore.get().video === true ? 'true' : 'false'}
                addStyles="bg-transparent hover:bg-transparent px-0"
            />
            }

        </div>
    );
};

export default TabMenu;
