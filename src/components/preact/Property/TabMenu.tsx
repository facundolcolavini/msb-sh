import { useEffect } from 'preact/hooks';
import { resetTabMenu, setTabMenu, tabMenuPropertyStore } from '../../../store/tabMenuPropertyStore';

import type { FunctionComponent, JSX } from 'preact';
import BluePrintIcon from '../Icons/BluePrintIcon';
import DocumentPdfIcon from '../Icons/DocumentPdfIcon';
import TabGalleryIcon from '../Icons/TabGalleryIcon';
import TabVideoIcon from "../Icons/TabVideoIcon";
import Button from "../ui/Buttons/Button";
import PropertyBuildIcon from '../Icons/PropertyBuildIcon';
interface Props {
    videoUrl: string | null;
    blueprint?: boolean;
    pdf?: boolean;
    unitList?: boolean;
    unitData?: number;
    unitRedirect?:string;
}
const TabMenu: FunctionComponent<Props> = ({ videoUrl, pdf, blueprint, unitList,unitData, unitRedirect="Unidades disponibles" }: Props) => {

    const $tabmenu = tabMenuPropertyStore.get()


    useEffect(() => {
        resetTabMenu();
    }, [])

    const handlerTab = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        // El que está en true no se puede volver a clickear
        if (e.currentTarget.id === 'tabGallery') {
            setTabMenu({ // Actualiza el estado del almacén aquí
                video: false,
                gallery: true,
                pdf: false,
                blueprint: false,
                unitList: false
            });
        } else if (e.currentTarget.id === 'tabVideo') {
            setTabMenu(
                {
                    video: true,
                    gallery: false,
                    pdf: false,
                    blueprint: false,
                    unitList: false
                }
            );
        } else if (e.currentTarget.id === 'tabPdf') {
            setTabMenu(
                {
                    video: false,
                    gallery: false,
                    pdf: true,
                    blueprint: false,
                    unitList: false
                }
            );
        } else if (e.currentTarget.id === 'tabBlueprint') {
            setTabMenu(
                {
                    video: false,
                    gallery: false,
                    pdf: false,
                    blueprint: true,
                    unitList: false
                }
            );
        } else if (e.currentTarget.id === 'tabUnitList') {
            setTabMenu(
                {
                    video: false,
                    gallery: false,
                    pdf: false,
                    blueprint: false,
                    unitList: true
                }
            );
        }
    };

    return (
        <div className={'flex justify-center place-content-center  align-middle items-end self-end space-x-2 pb-1 '}>

            <Button
                id="tabGallery"
                type="button"
                disabled={$tabmenu?.gallery}
                icon={<TabGalleryIcon h={"24"} w={"28"} addStyles={$tabmenu?.gallery ? 'flex self-center items-center animate-fill-forwards animate  transition-all animation-duration-400 hover:fill-primary-msb  fill-primary-msb self-center' : 'fill-secondary-text-msb flex justify-center items-center'} />}
                onClick={handlerTab}
                value={$tabmenu.gallery === true ? 'true' : 'false'}
                addStyles="h-full flex items-center self-center bg-transparent hover:bg-transparent  p-0 m-0"
            >
                <span className={$tabmenu.gallery ? ` px-1 text-primary-msb text-xs font-medium  hidden md:flex lg:flex` : ` hidden md:flex lg:flex text-xs font-medium text-secondary-text-msb transition-all px-1`}>Fotos</span>

            </Button>


            {videoUrl === null ? null : (

                <Button
                    type="button"
                    disabled={$tabmenu.video}
                    icon={<TabVideoIcon h={"24"} w={"30"} addStyles={$tabmenu?.video ? 'flex self-center items-center animate-fill-forwards animate  transition-all animation-duration-400 hover:fill-primary-msb  fill-primary-msb self-center' : 'fill-secondary-text-msb flex justify-center items-center'} />}
                    id="tabVideo"
                    onClick={handlerTab}
                    value={$tabmenu.video === true ? 'true' : 'false'}
                    addStyles="flex items-center self-center bg-transparent justify-center hover:bg-transparent  p-0 m-0"
                >
                    <span className={$tabmenu.video ? ` px-1 text-primary-msb text-xs font-medium  hidden md:flex lg:flex` : ` hidden md:flex lg:flex text-xs font-medium text-secondary-text-msb transition-all px-1`}>Video</span>
                </Button>
            )
            }
            
            {
                blueprint && (
                    <Button id="tabBlueprint"
                        type="button"
                        onClick={handlerTab}
                        value={$tabmenu.blueprint === true ? 'true' : 'false'}
                        addStyles="flex items-center self-center bg-transparent justify-center hover:bg-transparent p-0 m-0"
                        icon={<BluePrintIcon h={"24"}  w={"23"} addStyles={$tabmenu?.blueprint ? 'flex justify-center self-center place-content-center align-middle content-center items-center animate-fill-forwards animate  transition-all animation-duration-400 hover:fill-primary-msb  fill-primary-msb self-center pb-1' : 'fill-secondary-text-msb flex justify-center items-center self-center place-content-center align-middle content-center pb-1'} />
                        }
                    >
                        <span className={$tabmenu.blueprint ? ` px-1 text-primary-msb text-xs font-medium  hidden md:flex lg:flex` : ` hidden md:flex lg:flex text-xs font-medium text-secondary-text-msb transition-all px-1`}>Planos</span>
                    </Button>
                )
            }
            {
                pdf && (

                    <Button id="tabPdf"
                        type="button"
                        onClick={handlerTab}
                        value={$tabmenu.pdf === true ? 'true' : 'false'}
                        addStyles="flex items-center self-center bg-transparent justify-center hover:bg-transparent h-full w-100 p-0 m-0"
                        icon={<DocumentPdfIcon h={"22"} w={"22"} addStyles={$tabmenu?.pdf ? 'flex justify-center self-center place-content-center align-middle content-center items-center animate-fill-forwards animate  transition-all animation-duration-400 hover:fill-primary-msb  fill-primary-msb self-center' : 'fill-secondary-text-msb flex justify-center items-center self-center place-content-center align-middle content-center'} />

                        }
                    >
                        <span className={$tabmenu.pdf ? ` px-1 text-primary-msb text-xs font-medium  hidden md:flex lg:flex` : ` hidden md:flex lg:flex text-xs font-medium text-secondary-text-msb transition-all px-1`}>PDF</span>
                    </Button>
                )
            }


            {
                unitList && (

                    <Button id="tabUnitList"
                        type="button"
                        onClick={handlerTab}
                        value={$tabmenu.unitList === true ? 'true' : 'false'}
                        addStyles="flex items-center self-center bg-transparent justify-center hover:bg-transparent h-full w-100 p-0 m-0"
                        icon={<PropertyBuildIcon h={"24"} w={"26"} addStyles={$tabmenu?.unitList ? 'flex justify-center self-center place-content-center align-middle content-center items-center animate-fill-forwards animate  transition-all animation-duration-400 hover:fill-primary-msb  fill-primary-msb self-center pb-1' : 'fill-secondary-text-msb flex justify-center items-center self-center place-content-center align-middle content-center pb-1'} />
                        }
                    >
                        <span className={$tabmenu.unitList ? ` px-1 text-primary-msb text-xs font-medium  hidden md:flex lg:flex` : ` hidden md:flex lg:flex text-xs font-medium text-secondary-text-msb transition-all px-1`}>{unitData} {unitRedirect}</span>
                    </Button>
                )
            }



        </div>
    );
};

export default TabMenu;
