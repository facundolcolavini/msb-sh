import { useEffect, useState } from 'preact/hooks';
import { resetTabMenu, setTabMenu, tabMenuPropertyStore } from '../../../store/tabMenuPropertyStore';

import type { FunctionComponent, JSX } from 'preact';
import DocumentPdfIcon from '../Icons/DocumentPdfIcon';
import TabGalleryIcon from '../Icons/TabGalleryIcon';
import TabVideoIcon from "../Icons/TabVideoIcon";
import Button from "../ui/Buttons/Button";
import BluePrintIcon from '../Icons/BluePrintIcon';
interface Props {
    videoUrl: string | null;
    blueprint?: string | null;
    pdf?: string | null;
}
const TabMenu: FunctionComponent<Props> = ({ videoUrl, pdf, blueprint }: Props) => {
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
            setTabMenuProperty(prev => ({
                ...prev,
                video: false,
                gallery: true
            }));
            setTabMenu({ // Actualiza el estado del almacén aquí
                video: false,
                gallery: true,
                pdf: false,
                blueprint: false
            });
        } else if (e.currentTarget.id === 'tabVideo') {
            setTabMenuProperty(prev => ({
                ...prev,
                video: true,
                gallery: false,
                pdf: false,
                blueprint: false
            }));
            setTabMenu(
                {
                    video: true,
                    gallery: false,
                    pdf: false,
                    blueprint: false
                }
            );
        } else if (e.currentTarget.id === 'tabPdf') {
            setTabMenuProperty(prev => ({
                ...prev,
                video: false,
                gallery: false,
                pdf: true,
                blueprint: false
            }));
            setTabMenu(
                {
                    video: false,
                    gallery: false,
                    pdf: true,
                    blueprint: false
                }
            );
        } else if (e.currentTarget.id === 'tabBlueprint') {
            setTabMenuProperty(prev => ({
                ...prev,
                video: false,
                gallery: false,
                pdf: false,
                blueprint: true
            }));
            setTabMenu(
                {
                    video: false,
                    gallery: false,
                    pdf: false,
                    blueprint: true
                }
            );
        }
    };

    return (
        <div className={'flex justify-center place-content-center  align-middle items-end self-end gap-1 pb-1 '}>
           
                <Button
                    id="tabGallery"
                    type="button"
                    disabled={tabMenuPropertyStore.get()?.gallery}
                    icon={<TabGalleryIcon h={"24"} w={"28"} addStyles={tabMenuPropertyStore.get()?.gallery ? 'flex self-center items-center animate-fill-forwards animate  transition-all animation-duration-400 hover:fill-primary-msb  fill-primary-msb self-center' : 'fill-secondary-text-msb flex justify-center items-center'} />}
                    onClick={handlerTab}
                    value={tabMenuPropertyStore.get().gallery === true ? 'true' : 'false'}
                    addStyles="h-full flex items-center self-center bg-transparent hover:bg-transparent  p-0 m-0"
                />
        
        
                {videoUrl === null ? null : <Button
                    type="button"
                    disabled={tabMenuPropertyStore.get().video}
                    icon={<TabVideoIcon h={"30"} w={"30"} addStyles={tabMenuPropertyStore.get()?.video ? 'flex self-center items-center animate-fill-forwards animate  transition-all animation-duration-400 hover:fill-primary-msb  fill-primary-msb self-center' : 'fill-secondary-text-msb flex justify-center items-center'} />}
                    id="tabVideo"
                    onClick={handlerTab}
                    value={tabMenuPropertyStore.get().video === true ? 'true' : 'false'}
                    addStyles="flex items-center self-center bg-transparent justify-center hover:bg-transparent  p-0 m-0"
                />
                }
          
                {
                    pdf === null ? null : <Button id="tabPdf"
                        type="button"
                        onClick={handlerTab}
                        value={tabMenuPropertyStore.get().pdf === true ? 'true' : 'false'}
                        addStyles="flex items-center self-center bg-transparent justify-center hover:bg-transparent h-full w-100 p-0 m-0"
                        icon={<DocumentPdfIcon h={"20"} w={"21"} addStyles={tabMenuPropertyStore.get()?.pdf ? 'flex justify-center self-center place-content-center align-middle content-center items-center animate-fill-forwards animate  transition-all animation-duration-400 hover:fill-primary-msb  fill-primary-msb self-center' : 'fill-secondary-text-msb flex justify-center items-center self-center place-content-center align-middle content-center'} />

                        }
                    />
                }
          
                {
                    blueprint === null ? null : <Button id="tabBlueprint"
                        type="button"
                        onClick={handlerTab}
                        value={tabMenuPropertyStore.get().pdf === true ? 'true' : 'false'}
                        addStyles="flex items-center self-center bg-transparent justify-center hover:bg-transparent p-0 m-0"
                        icon={<BluePrintIcon h={"24"}  addStyles={tabMenuPropertyStore.get()?.blueprint ? 'flex justify-center self-center place-content-center align-middle content-center items-center animate-fill-forwards animate  transition-all animation-duration-400 hover:fill-primary-msb  fill-primary-msb self-center pb-1' : 'fill-secondary-text-msb flex justify-center items-center self-center place-content-center align-middle content-center pb-1'} />

                        }
                    />
                }
         


        </div>
    );
};

export default TabMenu;
