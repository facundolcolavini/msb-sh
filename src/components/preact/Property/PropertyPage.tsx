import type { APIResponsePropertyDetail, ResultPropertyDetails } from "@interfaces/detail.properties.interface";
import he from 'he';
import type { FunctionComponent } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useEffect, useState } from "preact/hooks";


import { tabMenuPropertyStore } from "src/store/tabMenuPropertyStore";
import GalleryProperty from "../Gallery/GalleryProperty";
import PrintIcon from "../Icons/PrintIcon";
import ShareButton from "../ShareButton/ShareButton";
import BreadCrumbSkeleton from "../Skeletons/BreadCrumbSkeleton";
import CardResultSkeleton from "../Skeletons/CardResultSkeleton";
import DetailsPropertySkeleton from "../Skeletons/DetailsPropertySkeleton";
import GalleryPropertySkeleton from "../Skeletons/GalleryPropertySkeleton";
import Button from "../ui/Buttons/Button";
import ContactForm from "./ContactForm";
import Description from "./Description";
import DetailsList from "./DetailsList";
import FeatureList from "./FeatureList";
import TabMenu from "./TabMenu";
import ServiceList from "./ServiceList";


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
        if (window.location.search.includes('fbclid')) {
            // Obtener la URL actual sin el parámetro fbclid
            const urlWithoutFbclid = window.location.href.split('?')[0];

            // Reemplazar la URL actual en el historial sin el parámetro fbclid
            window.history.replaceState({}, document.title, urlWithoutFbclid);
            window.location.reload();
            window.scrollTo(0, 0);
        }
        // Suscribirse a cambios en el almacén y actualizar el estado local
        const unsubscribe = tabMenuPropertyStore.subscribe(setTabMenuProperty);

        fetchResults();
        // Limpiar la suscripción al desmontar
        return () => unsubscribe();
        // Realiza las tareas de inicialización aquí, como la obtención de datos
    }, []);


    // Función para imprimir la página
    const handlePrint = () => {
        window.print();
    };
    const fetchResults = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/property.json?suc=${props.branchCode}&id=${props.propertyCode}&amaira=false`);
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
                    // a veces viene asi https://youtu.be/sA7_jQQ5c84 
                    const videoId = new URL(videoUrl).searchParams.get("v") || videoUrl.split('/').pop(); 
                    console.log(videoId, 'VIDEO URL')
                    if (videoId) {
                        setVideoUrl(videoId);
                    } else {
                        setVideoUrl(null)
                    }
                } else {
                    setVideoUrl(null)
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
   
    return (
        <article className=" px-3 md:px-0 lg:px-0 font-gotham">
            <section className="h-full">
                <header className="container mx-auto lg:flex justify-between items-center px-0 transition-all">
                    {isLoading ? <BreadCrumbSkeleton /> : props.breadCrumbChild}
                    <a target={'_blank'} href={`https://api.whatsapp.com/send?phone=${results?.ficha[0]?.whatsapp ?? results?.ficha[0]?.vendedor_celular}&text=¡Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${encodeURIComponent(window.location.href)}&source=&data=`} className="bg-primary-bg-hover-msb py-3 h-fit rounded-lg px-12 lg:text-lg md:text-md text-white tracking-wide cursor-pointer">Consultar</a>
                </header>
                <div className="container mx-auto pt-5 flex justify-between">
                    <TabMenu videoUrl={videoUrl} unitList={false} pdf={false} blueprint={false} />
                    <Button addStyles="flex bg-transparent text-primary-text-msb hover:bg-transparent sm:text-sm  px-0 md:text-md lg:text-lg  gap-2 justify-center items-center" isFavorite={true}>Favorito</Button>
                </div>
                {isLoading ? <div className="container mx-auto pb-16"><GalleryPropertySkeleton /></div> :
                    tabMenuProperty.gallery  ?
                        (<GalleryProperty addStyles="container mx-auto grid grid-cols pb-16 lg:grid-cols-2 gap-5 animate-fadeIn transition " galleryID={`gallery-property-${results?.datos?.codigo_ficha}`} images={results?.img || []} />)
                        : <div className={'grid pb-16'}>
                            {/*  videoframe  */}
                            {/*   <div className="h-[700px] w-full bg-gray-300 rounded-xl aspect-square"></div> */}
                            {(!videoUrl &&  tabMenuProperty.video)  ?
                                (<div className="h-[700px] w-full bg-gray-300 rounded-xl aspect-square container mx-auto h-100"><span className="flex justify-center items-center h-full font-bold">No disponible</span></div>)
                                : (<iframe className=" container mx-auto" width="100%" height="700" src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&mute=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>)}

                        </div>
                }
            </section>
            {/* Caracteristicas */}
            <section className="bg-[#939B41] py-10 text-white  md:px-0 lg:px-0 ">
                {isLoading ? <DetailsPropertySkeleton />
                    :
                    <div className="container flex flex-col md:flex-col lg:flex-row justify-center w-3/4 lg:w-fit  items-center place-content-center mx-auto h-full">

{   
    results?.ficha[0]?.in_amb?.split('A')[0].length !== 0 && results?.ficha[0]?.moneda ? (
        <div className="border-b-2 border-t-2 lg:border-l-2 lg:border-t-0 lg:border-b-0 md:border-b-2 md:border-t-2  text-center h-[184px] w-full flex justify-center items-center flex-col px-10 md:px-20 lg:px-20 p-5">
            <span className="text-2xl md:text-2xl lg:text-4xl font-cormorant font-semibold tracking-wider flex  items-center h-fit">Valor</span>
            <p className="text-xl md:text-xl lg:text-3xl self-center font-bold tracking-wider flex gap-2">
                {results?.ficha[0]?.precio !== '' && results?.ficha[0]?.precio !== 'Consultar' && (
                    results?.ficha[0]?.moneda === 'U$S' ? `U$S ${results?.ficha[0]?.precio.replace('U$S','')}` :
                    results?.ficha[0]?.moneda === '$' ? `$ ${results?.ficha[0]?.precio.replace('$','')}` :
                    results?.ficha[0]?.moneda === 'Consultar' ? 'Consultar' :
                    ''
                )}
            </p> 
        </div>
    ) : null 
}
                
                        {
                            results?.superficie.dato[3] !== '0.00m2' ? (<div className="border-b-2 lg:border-l-2 lg:border-b-0 md:border-b-2 flex justify-center flex-col  text-center  w-full px-10 md:px-20 lg:px-20 p-5 ">
                                <div className="flex items-center justify-center ">
                                    <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/superficie.png'} alt="superficie" />
                                </div>
                                <span className="text-2xl md:text-2xl lg:text-4xl  h-[56px] font-cormorant font-semibold tracking-wider flex items-center justify-center">Sup.Total</span>
                                <span className={"text-xl md:text-xl self-center lg:text-3xl font-bold tracking-wide "}>{results?.superficie.dato[3]}</span>
                            </div>) : null

                        }
                        {
                            results?.ficha[0]?.in_amb?.split('A')[0].length !== 0 ? (<div className="border-b-2  lg:border-r-2  lg:border-l-2 lg:border-b-0 md:border-b-2 flex justify-center flex-col  text-center  w-full px-10 md:px-20 lg:px-20 p-5">
                                <div className="flex items-center justify-center">

                                    <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/puerta.png'} alt="superficie" />
                                </div>
                                <span className="text-2xl md:text-2xl lg:text-4xl h-[56px] font-cormorant font-semibold tracking-wider flex  items-center justify-center">Ambientes</span>
                                <span className={"text-xl md:text-xl place-content-center self-center lg:text-3xl font-bold tracking-wide "}>{results?.ficha[0]?.in_amb?.split('A')[0] === "0" ? "Monoambiente": results?.ficha[0]?.in_amb?.split('A')[0] }</span>
                            </div>) : null
                        }
                        {
                            results?.ficha[0]?.in_bao ? (<div className="border-b-0 lg:border-l-2 md:border-r-0 lg:border-r-2 lg:border-b-0 md:border-b-2 flex justify-center flex-col  text-center  w-full px-10 md:px-20 lg:px-20 p-5">
                                <div className="flex items-center justify-center">

                                    <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/ducha.png'} alt="superficie" />
                                </div>
                                <span className="text-2xl md:text-2xl lg:text-4xl h-[56px] font-cormorant font-semibold tracking-wider flex  items-center justify-center">Baños</span>
                                <span className={"text-xl md:text-xl lg:text-3xl font-bold tracking-wide "}>{results?.ficha[0]?.in_bao}</span>
                            </div>) : null
                        }

                    </div>
                }
            </section>
            <section className="container mx-auto flex justify-between gap-2 pt-16 pb-5">

                {isLoading ? (<div className="container mx-auto pb-16"><BreadCrumbSkeleton /> </div>) : (
                    <div className="flex items-end gap-1 w-fit">
                        <img src="/images/map.png" alt="marker map" className="object-contain  flex items-center" />
                        <span className="text-sm md:text-md lg:text-lg text-primary-text-msb w-fit text-pretty font-semibold">{he.decode(`${results?.ficha[0]?.direccion}, ${results?.ficha[0]?.in_bar}, ${results?.ficha[0]?.in_loc}`)}</span>
                    </div>)
                }
                <div className={'flex flex-col md:flex-row lg:flex-row  md:justify-center lg:justify-center gap-5'} >
                    <ShareButton />
                    <button onClick={handlePrint} className="flex gap-1 cursor-pointer">
                        <span className={'font-semibold flex gap-1'}>
                            Imprimir <PrintIcon />
                        </span>
                    </button>
                </div>
            </section>
            <section className="container mx-auto grid grid-cols md:grid-cols lg:grid-cols-2 gap-36">
                {/* Google map iframe */}
                {isLoading || !results?.ficha[0]?.direccion
                    ? <div className="h-[350px] w-full bg-gray-300 rounded-xl aspect-square container mx-auto h-100 animate-pulse">
                        <span className="flex justify-center items-center h-full font-bold"></span>
                    </div>
                    : (
                        <div>
                            <div className="h-[400px] w-full md:col-span-1 lg:col-span-1">
                                {/* Agregar el titulo de la direcion en alado del market  */}
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.google.com/maps/embed/v1/place?q=${`${results?.ficha[0]?.latitud}, ${results?.ficha[0]?.longitud}`}&key=${import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY}`}
                                    allowFullScreen>
                                </iframe>
                            </div>
                            <FeatureList
                                sup_cubierta={results?.superficie?.dato[0]}
                                sup_total={results?.superficie?.dato[3]}
                                antiquity={results?.ficha[0]?.in_ant}
                                baths={results?.ficha[0]?.in_bao}
                                environments={results?.ficha[0]?.in_amb?.split('A')[0]}
                                furnished={results?.caracteristicas_generales_personalizadas?.find(
                                    (caracteristica) => caracteristica === 'Amoblado') ?? ''}
                                light={results?.caracteristicas_generales_personalizadas?.find(
                                    (caracteristica) => caracteristica === 'Luz') ?? ''}
                                location={results?.ficha[0]?.ubicacion.toLocaleLowerCase()}
                                pet_accepted={Boolean(results?.ficha[0]?.acepta_mascota?.toLocaleLowerCase()) ?? false}
                            />

                            <hr className={'border-secondary-text-msb '} />
                            <div className={'flex flex-col gap-5 py-5'}>
                                <h2 className={'font-gotham text-base  md:text-xl lg:text-2xl  md:text-start text-start  font-bold text-primary-text-msb'}>Descripción</h2>

                                <Description htmlText={results?.ficha[0]?.in_obs} />
                            </div>
                            <h2 className={'font-gotham text-base  md:text-xl lg:text-2xl  md:text-start text-start  font-bold text-primary-text-msb pt-5'}>Detalle de la propiedad</h2>
                            <hr className={'border-secondary-text-msb my-3'} />
                            <DetailsList
                                operation={results?.ficha[0]?.operacion ?? ''}
                                locationLoc={results?.ficha[0]?.in_loc ?? ''}
                                locationUbi={results?.ficha[0]?.ubicacion ?? ''}
                                neighborhood={results?.ficha[0]?.in_bar ?? ''}
                                address={results?.ficha[0]?.direccion ?? ''}
                                environments={results?.ficha[0]?.ambientes ?? ''}
                                antiquity={results?.ficha[0]?.in_ant ?? ''}
                                year={results?.ficha[0]?.in_anio ?? ''}
                                expenses={`${results?.ficha[0]?.in_exp !== "" ? `${results?.ficha[0]?.moneda_impuesto} ${results?.ficha[0]?.in_exp}` : ''}`}
                                houseType={results?.ficha[0]?.in_tpr ?? ''}
                                dependence={results?.ficha[0]?.in_dep ?? ''}
                                floors={results?.ficha[0]?.in_npi ?? ''}
                                hotWater={results?.ficha[0]?.agua ?? ''}
                                gas={results?.ficha[0]?.in_gas ?? ''}
                                heating={results?.ficha[0]?.in_agu ?? ''}
                                bathrooms={results?.ficha[0]?.in_bao ?? ''}
                                state={results?.ficha[0]?.in_esa ?? ''}
                                garage_parking={results?.ficha[0]?.in_coc ?? ''}
                                garage={results?.ficha[0]?.garage ?? ''}
                                parking={results?.ficha[0]?.in_parking ?? ''}
                                pavement={results?.ficha[0]?.in_pav ?? ''}
                                sewer={results?.ficha[0]?.in_clo ?? ''}
                                telephoneLine={results?.ficha[0]?.in_lin ?? ''}
                            />
                            <h2 className={'font-gotham text-base  md:text-xl lg:text-2xl  md:text-start text-start  font-bold text-primary-text-msb pt-5'}>Medidas</h2>
                            <hr className={'border-secondary-text-msb my-3'} />
                            <ul className="mb-5">
                                {results?.superficie?.dato[3] !== "" ? (<li className="flex gap-2 pb-3">
                                    <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Sup.total: </span>
                                    <p className="text-sm md:text-md lg:text-lg">{he.decode(results?.superficie?.dato[3])}</p>
                                </li>) : null}
                                {results?.superficie?.dato[0] !== "" ? (<li className="flex gap-2">
                                    <span className="text-sm md:text-md lg:text-lg font-bold text-secondary-text-msb">Sup. cubierta: </span>
                                    <span className="text-sm md:text-md lg:text-lg">{he.decode(results?.superficie?.dato[0])}</span>
                                </li>) : null}
                            </ul>
                            <h2 className={'font-gotham text-base  md:text-xl lg:text-2xl  md:text-start text-start  font-bold text-primary-text-msb pt-5'}>Servicios:</h2>
                            <hr className={'border-secondary-text-msb my-3'} />
                            <ServiceList characteristics={results?.caracteristicas_generales_personalizadas} />

                        </div>
                    )}
                <div className={'bg-[#D9D9D9] relative h-fit'}>
                    <ContactForm id={results?.datos?.codigo_ficha ?? ''}  tipo={results?.ficha[0]?.tipo} codsuc={results?.ficha[0]?.codsuc ?? ''} contact_prop={`https://api.whatsapp.com/send?phone=${results?.ficha[0]?.whatsapp ?? results?.ficha[0]?.vendedor_celular}&text=¡Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${encodeURIComponent(window.location.href)}&source=&data=`} />
                </div>
            </section>
            <section className={'container mx-auto  my-30'}>

                <BreadCrumbSkeleton />
                <BreadCrumbSkeleton />
                <div className={'grid grid-cols-4  gap-5  my-10 w-100'}>
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                </div>


            </section>

        </article>
    )
}

export default PropertyPage;
