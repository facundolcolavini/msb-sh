import type { APIResponsePropertyDetail, ResultPropertyDetails } from "@interfaces/detail.properties.interface";
import type { FunctionComponent } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

import he from "he";
import { tabMenuPropertyStore } from "src/store/tabMenuPropertyStore";
import GalleryProperty from "../Gallery/GalleryProperty";
import BreadCrumbSkeleton from "../Skeletons/BreadCrumbSkeleton";
import DetailsPropertySkeleton from "../Skeletons/DetailsPropertySkeleton";
import GalleryPropertySkeleton from "../Skeletons/GalleryPropertySkeleton";
import Button from "../ui/Buttons/Button";
import ContactForm from "./ContactForm";
import TabMenu from "./TabMenu";

interface Props {
    branchCode: string;
    propertyCode: string;
    breadCrumbChild?: string;
}

const PropertyPage: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const [results, setResults] = useState<ResultPropertyDetails | null>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tabMenuProperty, setTabMenuProperty] = useState(
        tabMenuPropertyStore.get() // Estado local para el valor del almacén
    ); // Estado local para el valor del almacén
    const [videoUrl, setVideoUrl] = useState<string | null>(null); // Estado local para la URL del video

    useEffect(() => {
        // Suscribirse a cambios en el almacén y actualizar el estado local
        const unsubscribe = tabMenuPropertyStore.subscribe(setTabMenuProperty);
        fetchResults();
        // Limpiar la suscripción al desmontar
        return () => unsubscribe();
        // Realiza las tareas de inicialización aquí, como la obtención de datos



    }, []);

    useEffect(() => {
        // Verificar si la página se cargó desde Facebook y si tiene el parámetro fbclid
        if (window.location.search.includes('fbclid')) {
            // Obtener la URL actual sin el parámetro fbclid
            const urlWithoutFbclid = window.location.href.split('?')[0];
    
            // Reemplazar la URL actual en el historial sin el parámetro fbclid
            window.history.replaceState({}, document.title, urlWithoutFbclid);
        }
    }, []); // Sin dependencias para que se ejecute solo una vez al cargar la página
    
    const fetchResults = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/property.json?suc=${props.branchCode}&id=${props.propertyCode}`);
            const data: APIResponsePropertyDetail = await response.json();

            if (data?.hasOwnProperty("error")) {
                setResults(null);
                setIsLoading(false);
                throw data;
            } else if (response?.ok) {
                setIsLoading(false);
                setResults(data?.resultado);
                if (data.resultado?.ficha[0]?.in_vid) {
                    // Obtener el valor del parámetro 'v' de la URL del video
                    const videoUrl = data.resultado?.ficha[0]?.in_vid;
                    const videoId = new URL(videoUrl).searchParams.get("v");
                    setVideoUrl(videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1` : null);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <article className=" px-3 md:px-0 lg:px-0">
            <section className="h-full">
                <header className="container mx-auto lg:flex justify-between items-center px-0 transition-all">
                    {isLoading ? <BreadCrumbSkeleton /> : props.breadCrumbChild}
                    <a target={'_blank'} href={`https://api.whatsapp.com/send/?phone=5491133927629&text=%C2%A1Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${he.decode(`https://msb-sh.vercel.app/resultados-de-busqueda/${results?.ficha[0]?.operacion}/${results?.ficha[0]?.in_loc}/${results?.ficha[0]?.direccion}/${results?.ficha[0]?.in_suc}-${results?.ficha[0]?.in_num}`)}&type=phone_number&app_absent=0`} className="bg-primary-bg-hover-msb py-3 h-fit rounded-lg px-12 lg:text-lg md:text-md text-white tracking-wide">Consultar</a>
                </header>
                <div className="container mx-auto pt-5 flex justify-between">
                    <TabMenu />
                    <Button addStyles="flex bg-transparent text-primary-text-msb hover:bg-transparent sm:text-sm  px-0 md:text-md lg:text-lg  gap-2 justify-center items-center" isFavorite={true}>Favorito</Button>
                </div>
                {isLoading ? <div className="container mx-auto pb-16"><GalleryPropertySkeleton /></div> :
                    tabMenuProperty.gallery === true && !tabMenuProperty.video ?
                        (<GalleryProperty addStyles="container mx-auto grid grid-cols pb-16 lg:grid-cols-2 gap-5 animate-fadeIn transition " galleryID={`gallery-property-${results?.datos?.codigo_ficha}`} images={results?.img || []} />)
                        : <div className={'grid pb-16'}>
                            {/*  videoframe  */}
                            {/*   <div className="h-[700px] w-full bg-gray-300 rounded-xl aspect-square"></div> */}
                            {!videoUrl ?
                                (<div className="h-[700px] w-full bg-gray-300 rounded-xl aspect-square container mx-auto h-100"><span className="flex justify-center items-center h-full font-bold">No disponible</span></div>)
                                : (<iframe className=" container mx-auto" width="100%" height="700" src={videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>)}

                        </div>
                }
            </section>
            <section className="bg-[#939B41] py-10 text-white  md:px-0 lg:px-0 ">
                {isLoading ? <DetailsPropertySkeleton />
                    :
                    <div className="grid lg:grid-cols-4 md:grid-cols-4 gird-cols justify-center w-fit  items-center place-content-center mx-auto h-full">
                        {/* Caracteristicas */}
                        <div className="border-b-2 lg:border-l-2 lg:border-b-0 md:border-l-0 md:border-b-0  text-center h-full w-full flex justify-center items-center flex-col  p-5">
                            <span className="text-2xl md:text-2xl lg:text-3xl h-[56px] font-cormorant font-semibold tracking-wider flex  items-center">Valor</span>
                            <span className="text-xl md:text-xl lg:text-2xl font-semibold tracking-wide ">{results?.ficha[0]?.precio}</span>
                        </div>
                        <div className="border-b-2 lg:border-l-2 lg:border-b-0 md:border-l-2 md:border-b-0 flex justify-center flex-col  text-center  w-full p-5">
                            <div className="flex items-center justify-center ">
                                <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/superficie.png'} alt="superficie" />
                            </div>
                            <span className="text-2xl md:text-2xl lg:text-3xl h-[56px] font-cormorant font-semibold tracking-wider flex  items-center justify-center">Sup.Total</span>
                            <span className={"text-xl md:text-xl lg:text-2xl font-semibold tracking-wide "}>{results?.ficha[0]?.in_sut}m²</span>
                        </div>
                        <div className="border-b-2  lg:border-l-2 lg:border-b-0 md:border-l-2 md:border-b-0 flex justify-center flex-col  text-center  w-full p-5">
                            <div className="flex items-center justify-center">

                                <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/puerta.png'} alt="superficie" />
                            </div>
                            <span className="text-2xl md:text-2xl lg:text-3xl h-[56px] font-cormorant font-semibold tracking-wider flex  items-center justify-center">Ambientes</span>
                            <span className={"text-xl md:text-xl lg:text-2xl font-semibold tracking-wide "}>{results?.ficha[0]?.in_amb?.split('A')[0]}</span> {/* Eliminar 7A => 7 */}
                        </div>
                        <div className="border-b-0 lg:border-l-2 lg:border-r-2 md:border-r-0  lg:border-b-0 md:border-l-2 md:border-b-0 flex justify-center flex-col  text-center  w-full p-5">
                            <div className="flex items-center justify-center">

                                <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/ducha.png'} alt="superficie" />
                            </div>
                            <span className="text-2xl md:text-2xl lg:text-3xl h-[56px] font-cormorant font-semibold tracking-wider flex  items-center justify-center">Baños</span>
                            <span className={"text-xl md:text-xl lg:text-2xl font-semibold tracking-wide "}>{results?.ficha[0]?.in_bao}</span>
                        </div>
                    </div>
                }
            </section>
            <section className="container mx-auto flex gap-2 pt-16 pb-5">
                {isLoading ? (<div className="container mx-auto pb-16"><BreadCrumbSkeleton /> </div>) : (
                    <>
                        <img src="/images/map.png" alt="marker map" className="object-contain" />
                        <span className="text-sm md:text-md lg:text-lg text-primary-text-msb font-semibold">{he.decode(`${results?.ficha[0]?.direccion}, ${results?.ficha[0]?.in_bar}, ${results?.ficha[0]?.in_loc}`)}</span>
                    </>)
                }
            </section>
            <section className="container mx-auto grid grid-cols md:grid-cols lg:grid-cols-2 gap-36">
                {/* Google map iframe */}
                {isLoading || !results?.ficha[0]?.direccion ? <div className="h-[350px] w-full bg-gray-300 rounded-xl aspect-square container mx-auto h-100 animate-pulse"><span className="flex justify-center items-center h-full font-bold"></span></div> : (<div className="h-[400px] w-full md:col-span-1 lg:col-span-1">
                    {/* Agregar el titulo de la direcion en alado del market  */}

                    <iframe className="w-full h-full" src={`https://www.google.com/maps/embed/v1/place?q=${`${results?.ficha[0]?.latitud}, ${results?.ficha[0]?.longitud}`}&key=${import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY}
                    
                    `} allowFullScreen aria-placeholder={'asd'}></iframe>
                </div>)}
                <div className={'bg-[#D9D9D9]'}>
                    <ContactForm id={results?.datos?.codigo_ficha ?? ''} codsuc={results?.ficha[0]?.codsuc ?? ''} />
                </div>
            </section>
        </article>
    )
}

export default PropertyPage;
