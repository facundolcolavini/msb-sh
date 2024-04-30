import type { ResultPropertyDetails } from "@/interfaces/detail.properties.interface";
import he from 'he';
import type { FunctionComponent } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useEffect, useState } from "preact/hooks";


import { navigate } from "astro:transitions/client";
import type { Session } from "lucia";
import { tabMenuPropertyStore } from "src/store/tabMenuPropertyStore";
import { capitalize } from '../../../utils/formats';
import GalleryProperty from "../Gallery/GalleryProperty";
import BathIcon from "../Icons/BathIcon";
import MapLocationIcon from "../Icons/MapLocationIcon";
import PrintIcon from "../Icons/PrintIcon";
import WarningAlertIcon from "../Icons/WarningAlertIcon";
import PDFViewer from "../PDFViewer";
import ShareButton from "../ShareButton/ShareButton";
import BreadCrumbSkeleton from "../Skeletons/BreadCrumbSkeleton";
import CardResultSkeleton from "../Skeletons/CardResultSkeleton";
import DetailsPropertySkeleton from "../Skeletons/DetailsPropertySkeleton";
import GalleryPropertySkeleton from "../Skeletons/GalleryPropertySkeleton";
import Button from "../ui/Buttons/Button";
import FavoriteButton from "../ui/Buttons/FavoriteButton";
import { Modal } from "../ui/Modals/Modal";
import { Toast } from "../ui/Toast/Toast";
import ContactForm from "./ContactForm";
import Description from "./Description";
import DetailsList from "./DetailsList";
import FeatureList from "./FeatureList";
import ServiceList from "./ServiceList";
import TabMenu from "./TabMenu";



interface Props {
    branchCode: string;
    propertyCode: string;
    breadCrumbChild?: string;
    session: Session | null;
}

const PropertyPage: FunctionComponent<PropsWithChildren<Props>> = (props) => {

    const [results, setResults] = useState<ResultPropertyDetails | null>()
    const [isFavorited, setIsFavorited] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tabMenuProperty, setTabMenuProperty] = useState(
        tabMenuPropertyStore.get() // Estado local para el valor del almacén
    ); // Estado local para el valor del almacén
    const [videoUrl, setVideoUrl] = useState<string | null>(null); // Estado local para la URL del video
    const [modalState, setModalState] = useState({ isOpen: false });

    const toggleModal = () => {
        setModalState((prevState) => ({ isOpen: !prevState.isOpen }));
    };

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
    }, []);


    // Función para imprimir la página
    const handlePrint = () => {
        window.print();
    };
    const fetchResults = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/property.json?suc=${props.branchCode}&id=${props.propertyCode}&amaira=false${window.location.pathname.includes('emprendimiento') ? '&emprendimiento=True' : ''}`);
            const data = await response.json();

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
                    const videoId = new URL(videoUrl)?.searchParams.get("v") || videoUrl?.split('/').pop();
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

    // Fetch Favprotes from API server
    const fetchFavorites = async () => {
        try {
            const response = await fetch(`/api/favorites/${props?.session?.userId}`);
            const data = await response.json();
            if (response.ok) {
                /* setFavorites(data); */
                // Check if the current property is in the favorites list
                const isFavorited = data.data.some((favorite: { publicationId: string }) => favorite.publicationId === props.propertyCode);
                setIsFavorited(isFavorited);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchFavorites();
    }, [props.propertyCode]);

    // Remove the favorite from the list  API SERVER
    const removeFavorite = async () => {
        try {
            const response = await fetch(`/api/favorites/${props?.session?.userId}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    ids: props.propertyCode
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw response;
            } else {

                if (data.success) {
                    setToastMessage(data.message);
                    setToastVisible(true);
                    setTimeout(() => setToastVisible(false), 3000);
                } else {
                    setToastMessage(data.message);
                    setToastVisible(true);
                    setTimeout(() => setToastVisible(false), 3000);
                }
                await fetchFavorites();
            }
        } catch (error) {
            console.error(error);
            setToastMessage((error as Error).message);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000);
        }
    }

    // Add the favorite to the list API SERVER
    const addFavorite = async () => {
        try {
            const response = await fetch(`/api/favorites/addToFavorite`, {
                method: 'POST',
                body: JSON.stringify({
                    userId: props?.session?.userId,
                    publicationId: props.propertyCode,
                    publicationSuc: props.branchCode,
                    isEntrepreneurshipPublic: false
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            if (data.success) {
                setToastMessage(data.message);
                setToastVisible(true);
                setTimeout(() => setToastVisible(false), 3000);
            } else {
                setToastMessage(data.message);
                setToastVisible(true);
                setIsFavorited(true);
                setTimeout(() => {
                    setToastVisible(false)
                    setIsFavorited(false);
                }, 3000);

            }
            await fetchFavorites();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <article className=" px-3 md:px-0 lg:px-0 font-gotham">
            <section className="h-full md:px-5 lg:px-10">
                <header className="container mx-auto lg:flex justify-between items-center px-0 transition-all">
                    {isLoading ? <BreadCrumbSkeleton /> : props.breadCrumbChild}
                    <Button onClick={toggleModal} addStyles="bg-primary-bg-hover-msb py-3 w-100 rounded-lg px-12 lg:text-lg md:text-md text-white tracking-wide cursor-pointer">Consultar</Button>
                </header>
                {modalState.isOpen && (
                    <Modal
                        header=""
                        footer=""
                        onHeaderCloseClick={toggleModal}
                        onBackdropClick={toggleModal}
                    >
                        <div className={'bg-[#D9D9D9] h-full w-full relative'}>
                            <ContactForm toggleModal={toggleModal} id={results?.datos?.codigo_ficha ?? ''} tipo={results?.ficha[0]?.tipo} codsuc={results?.ficha[0]?.codsuc ?? ''} contact_prop={`https://api.whatsapp.com/send?phone=${results?.ficha[0]?.whatsapp ?? results?.ficha[0]?.vendedor_celular}&text=¡Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${encodeURIComponent(window.location.href)}&source=&data=`} />
                        </div>
                    </Modal>
                )}

                <div className="container mx-auto pt-5 flex justify-between">
                    <TabMenu videoUrl={videoUrl} unitRedirect={window.location.pathname.includes('unidad-disponible') ? 'Edificio' : 'Unidades disponibles'} unitList={results!?.emprendimiento ? true : false} pdf={results?.emprendimiento && results?.emprendimiento?.ed_pdf !== "" && results?.emprendimiento?.ed_pdf !== null ? true : false} blueprint={results!?.plano !== null && !isLoading} />
                    <FavoriteButton toggleFavorite={isFavorited ? removeFavorite : addFavorite} initialIsFavorited={isFavorited} addStyles="flex bg-transparent text-primary-text-msb hover:bg-transparent sm:text-sm  px-0 md:text-md lg:text-lg  gap-2 justify-center items-center"><span className={'font-semibold'}>Favorito</span></FavoriteButton>
                </div>
                {isLoading ? <div className="container mx-auto pb-16 md:px-5 lg:px-0"><GalleryPropertySkeleton /></div> :
                    tabMenuProperty.gallery ?
                        (<GalleryProperty addStyles="container mx-auto grid grid-cols pb-16 lg:grid-cols-2 gap-5 animate-fadeIn transition " galleryID={`gallery-property-${results?.datos?.codigo_ficha}`} images={results?.img || []} />)
                        : <div className={'grid pb-16'}>
                            {/*  videoframe  */}
                            {/*   <div className="h-[700px] w-full bg-gray-300 rounded-xl aspect-square"></div> */}
                            {(videoUrl && tabMenuProperty.video) ?

                                (<iframe className=" container mx-auto" width="100%" height="700" src={`https://www.youtube.com/embed/${videoUrl ?? ''}?autoplay=1&mute=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>) :
                                tabMenuProperty.blueprint ? <GalleryProperty addStyles="container mx-auto grid grid-cols pb-16 lg:grid-cols-2 gap-5 animate-fade animate-duration-500  transition-all" galleryID={`gallery-blueprint-${results?.datos?.codemp}-${results?.datos?.codigo_ficha}`} images={results!?.plano !== "" && results!?.plano !== "null" ? [results!?.plano] : []} />
                                    : tabMenuProperty.pdf && (results?.emprendimiento?.ed_pdf !== "null" && results?.emprendimiento?.ed_pdf !== "") ? (
                                        <PDFViewer file={`https://ficha.amaira.com.ar/view_pdf.php?file=emprendimientos/pdf/${results?.emprendimiento?.ed_pdf}`} />
                                    ) : tabMenuProperty.unitList && results!?.emprendimiento ? (navigate(`/emprendimientos/${results?.emprendimiento?.ed_est}/${he.decode(results?.emprendimiento!?.ed_loc)}/${he.decode(results?.emprendimiento!?.ed_nom)}/${results?.emprendimiento?.codsuc}-${results?.emprendimiento?.ed_idl}`)) : (
                                        <div className="h-[700px] w-full bg-gray-300 rounded-xl aspect-square container mx-auto h-100"><span className="flex justify-center items-center h-full font-bold">No disponible</span></div>)


                            }
                        </div>
                }
            </section>
            {/* Caracteristicas */}
            <section className="bg-[#939B41] py-10 text-white md:px-0 lg:px-0 ">
                {isLoading ? <DetailsPropertySkeleton />
                    :
                    <div className="container flex flex-col divide-y-2  lg:border-l-2 lg:border-r-2 md:divide-y-2  lg:divide-x-2 lg:divide-y-0 divide-white md:flex-col lg:flex-row justify-center  w-max lg:w-fit  items-center place-content-center mx-auto h-full">

                        {
                            results?.ficha[0]?.in_amb?.split('A')[0].length !== 0 && results?.ficha[0]?.moneda ? (
                                <div className="text-center  w-full flex justify-center items-center flex-col md:px-20 lg:px-14 p-5">
                                    <span className="text-2xl md:text-2xl lg:text-4xl  font-cormorant font-base flex  w-max ">Valor</span>
                                    <p className="text-xl md:text-xl lg:text-3xl self-center font-semibold tracking-wide w-max">
                                        {results?.ficha[0]?.precio !== '' && results?.ficha[0]?.precio !== 'Consultar' && (
                                            results?.ficha[0]?.moneda === 'U$S' ? `U$S ${results?.ficha[0]?.precio.replace('U$S', '')}` :
                                                results?.ficha[0]?.moneda === '$' ? `$ ${results?.ficha[0]?.precio.replace('$', '')}` :
                                                    results?.ficha[0]?.moneda === 'Consultar' ? 'Consultar' :
                                                        ''
                                        )}
                                    </p>
                                </div>
                            ) : null
                        }

                        {
                            results?.superficie.dato[3] !== '0.00m2' ? (
                                <div className="text-center  w-full flex justify-center items-center flex-col md:px-20 lg:px-14 p-5">
                                    <div className="flex items-center justify-center ">
                                        <img className="  object-contain aspect-square" src={'/images/superficie.png'} alt="superficie" />
                                    </div>
                                    <span className="text-2xl md:text-2xl lg:text-4xl  font-cormorant font-base flex w-max ">Sup.Total</span>
                                    <span className={"text-xl md:text-xl lg:text-3xl self-center font-semibold tracking-wide "}>{results?.superficie.dato[3].replaceAll(".00", "")}</span>
                                </div>) : null

                        }
                        {
                            results?.ficha[0]?.in_amb?.split('A')[0].length !== 0 ? (
                                <div className="text-center  w-full flex justify-center items-center flex-col md:px-20 lg:px-14 p-5">
                                    <div className="flex items-center justify-center">
                                        <img className="object-contain aspect-square" src={'/images/puerta.png'} alt="superficie" />
                                    </div>
                                    <span className="text-2xl md:text-2xl lg:text-4xl  font-cormorant font-base flex w-max ">Ambientes</span>
                                    <span className={"text-xl md:text-xl lg:text-3xl self-center font-semibold tracking-wide "}>{results?.ficha[0]?.in_amb?.split('A')[0] === "0" ? "Monoambiente" : results?.ficha[0]?.in_amb?.split('A')[0]}</span>
                                </div>) : null
                        }
                        {
                            results?.ficha[0]?.in_bao ? (
                                <div className="text-center  w-full flex justify-center items-center flex-col md:px-20 lg:px-14 p-5">
                                    <BathIcon h="56" w="56" addStyles="object-contain flex items-center justify-center" />
                                    <span className="text-2xl md:text-2xl lg:text-4xl  font-cormorant font-base flex w-max ">Baños</span>
                                    <span className={"text-xl md:text-xl lg:text-3xl self-center font-semibold tracking-wide "}>{results?.ficha[0]?.in_bao}</span>
                                </div>) : null
                        }

                    </div>
                }
            </section>
            <section className="container mx-auto flex justify-between gap-2 pt-16 pb-5 md:px-5 lg:px-10">

                {isLoading ? (<div className="container mx-auto pb-16"><BreadCrumbSkeleton /> </div>) : (
                    <div className="flex items-end gap-1 w-fit">
                        <MapLocationIcon />
                        <span className="text-sm md:text-md lg:text-lg text-primary-text-msb w-fit text-pretty font-semibold">{capitalize(he.decode(`${results?.ficha[0]?.direccion}, ${results?.ficha[0]?.in_bar}, ${results?.ficha[0]?.in_loc}`))}</span>
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
            <section className="container mx-auto grid grid-cols md:gap-5 lg:gap-7 md:px-5 lg:px-10">
                {/* Google map iframe */}
                <div className={'col-start-1 cold-end-7'}>
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
                                {results?.caracteristicas_generales_personalizadas && (
                                    <>
                                        <h2 className={'font-gotham text-base  md:text-xl lg:text-2xl  md:text-start text-start  font-bold text-primary-text-msb pt-5'}>Servicios:</h2>
                                        <hr className={'border-secondary-text-msb my-3'} />
                                        <ServiceList characteristics={results?.caracteristicas_generales_personalizadas} />
                                    </>)}
                            </div>
                        )}
                </div>
                <div className={'bg-[#D9D9D9]  h-fit w-100  lg:col-start-7 lg-col-end-12 relative lg:sticky lg:inset-0'}>
                    <ContactForm id={results?.datos?.codigo_ficha ?? ''} tipo={results?.ficha[0]?.tipo} codsuc={results?.ficha[0]?.codsuc ?? ''} contact_prop={`https://api.whatsapp.com/send?phone=${results?.ficha[0]?.whatsapp ?? results?.ficha[0]?.vendedor_celular}&text=¡Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${encodeURIComponent(window.location.href)}&source=&data=`} />
                </div>

            </section>
            <section className={'container mx-auto  my-30 md:px-5 lg:px-10'}>

                <BreadCrumbSkeleton />
                <BreadCrumbSkeleton />
                <div className={'grid grid-cols-2 md:grid-cols-2  gap-5  my-10 w-100'}>
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                </div>
            </section>
            <Toast message={toastMessage} icon={<WarningAlertIcon />} isVisible={toastVisible} customStyles="flex gap-2 border  border-primary-msb  bg-[#EFF0F2]" duration={3000} />


        </article>
    )
}

export default PropertyPage;
