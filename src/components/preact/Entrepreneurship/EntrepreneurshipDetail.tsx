import he from 'he';
import type { FunctionComponent } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useEffect, useState } from "preact/hooks";


import type { APIResponseDetailEntrepreneurShip, APIResponseEntrepreneurShipUnit, DetailEntrepreneurship, ResultEntrePreneurShipUnit } from "@/interfaces/entrepreneurship.interfaces";
import { capitalize } from '@/utils/formats';
import { tabMenuPropertyStore } from "src/store/tabMenuPropertyStore";
import GalleryProperty from "../Gallery/GalleryProperty";
import MapLocationIcon from '../Icons/MapLocationIcon';
import PrintIcon from "../Icons/PrintIcon";
import PropertyBuildIcon from '../Icons/PropertyBuildIcon';
import PDFViewer from '../PDFViewer';
import ContactForm from '../Property/ContactForm';
import Description from '../Property/Description';
import TabMenu from '../Property/TabMenu';
import ShareButton from "../ShareButton/ShareButton";
import BreadCrumbSkeleton from "../Skeletons/BreadCrumbSkeleton";
import CardResultSkeleton from "../Skeletons/CardResultSkeleton";
import DetailsPropertySkeleton from "../Skeletons/DetailsPropertySkeleton";
import GalleryPropertySkeleton from "../Skeletons/GalleryPropertySkeleton";
import Button from "../ui/Buttons/Button";
import { Modal } from '../ui/Modals/Modal';
import EntrepreneurshipDetailList from './EntrepreneurshipDetailList';
import EntrepreneurshipFeatureList from './EntrepreneurshipFeatureList';
import UnitAvailableTable from './UnitAvailableTable';
import FavoriteButton from '../ui/Buttons/FavoriteButton';
import WarningAlertIcon from '../Icons/WarningAlertIcon';
import { Toast } from '../ui/Toast/Toast';
import type { Session } from 'lucia';




interface Props {
    branchCode: string;
    propertyCode: string;
    breadCrumbChild?: string;
    session: Session | null;
}

const EntrepreneurshipDetail: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const [results, setResults] = useState<DetailEntrepreneurship | null>()
    const [resultsUnit, setResultsUnit] = useState<ResultEntrePreneurShipUnit | null>()
    const [isFavorited, setIsFavorited] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tabMenuProperty, setTabMenuProperty] = useState(
        tabMenuPropertyStore.get() 
    );
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

        Promise.all([fetchResults(), fetchUnits()])
            .then(() => {
                /* console.log('Load  completed'); */
            })
            .catch((error) => {
                console.error('Error in fetches: ', error);
            });
        // Limpiar la suscripción al desmontar
        return () => unsubscribe();
        
    }, []);


    const handlePrint = () => {
        window.print();
    };

    const fetchResults = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/emprendimientosById.json?id=${props.propertyCode}`);
            const data: APIResponseDetailEntrepreneurShip = await response.json();

            if (data?.hasOwnProperty("error")) {
                setResults(null);
                setIsLoading(false);
                throw data;
            } else if (response?.ok) {
                setIsLoading(false);
                setResults(data?.resultado);
            }
        } catch (error) {
            console.log(error, 'ERROR');
        }
    };

    const fetchUnits = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/emprendimientosUnidades.json?id_empre=${props.propertyCode}`);
            const data: APIResponseEntrepreneurShipUnit = await response.json();
            if (data?.hasOwnProperty("error")) {
                setResultsUnit(null);
                setIsLoading(false);
                throw data;
            } else if (response?.ok) {
                setIsLoading(false);
                setResultsUnit(data?.resultado as ResultEntrePreneurShipUnit);
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
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setToastMessage(data.message);
                    setToastVisible(true);
                    setTimeout(() => setToastVisible(false), 3000);
                }
                await fetchFavorites();
            }
        } catch (error) {
            console.error(error);
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
                    isEntrepreneurshipPublic: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setToastMessage(data.message);
                    setToastVisible(true);
                    setTimeout(() => setToastVisible(false), 3000);
                }
                await fetchFavorites();
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <article className=" px-3 md:px-0 font-gotham">

            <section className="h-full md:px-5 lg:px-10">
                <header className="container mx-auto lg:flex justify-between items-center px-0 transition-all">
                    {isLoading ? <BreadCrumbSkeleton /> : props.breadCrumbChild}
                    <Button onClick={toggleModal} /* target={'_blank'} href={`https://api.whatsapp.com/send?phone=${results?.ficha[0]?.whatsapp ?? results?.ficha[0]?.vendedor_celular}&text=¡Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${encodeURIComponent(window.location.href)}&source=&data=`} */ addStyles="flex justify-end  items-end relative inset-0 bg-primary-bg-hover-msb py-3 h-fit rounded-lg px-12 lg:text-lg md:text-md text-white tracking-wide cursor-pointer">Consultar</Button>
                </header>
                {modalState.isOpen && (
                    <Modal
                        header=""
                        footer=""
                        onHeaderCloseClick={toggleModal}
                        onBackdropClick={toggleModal}
                    >
                        <div className={'bg-[#D9D9D9]  h-fit w-100  lg:col-start-7 lg-col-end-12 sticky inset-0 transition-all '}>
                            <ContactForm id={results?.emprendimiento[0]?.ed_idl ?? ''} tipo={results?.emprendimiento[0].tipo} codsuc={results?.datos?.codemp ?? ''} contact_prop={results?.emprendimiento[0]?.celular ? `https://api.whatsapp.com/send?phone=${123}&text=¡Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${encodeURIComponent(window.location.href)}&source=&data=` : ''} />
                        </div>
                    </Modal>
                )}
                <div className="container mx-auto pt-5 flex justify-between ">
                    {isLoading ? <BreadCrumbSkeleton /> : <TabMenu videoUrl={null} unitData={resultsUnit?.unidadesDisponibles.length} unitList={resultsUnit?.unidadesDisponibles ? true : false} pdf={(results?.pdf?.length ?? 0) > 0 && !isLoading} blueprint={(resultsUnit?.unidadesDisponibles?.map(emp => emp.img_princ) ?? []).length > 0 && !isLoading} />}
                    {isLoading ? <BreadCrumbSkeleton /> :   <FavoriteButton toggleFavorite={isFavorited ? removeFavorite : addFavorite} initialIsFavorited={isFavorited} addStyles="flex bg-transparent text-primary-text-msb hover:bg-transparent sm:text-sm  px-0 md:text-md lg:text-lg  gap-2 justify-center items-center"><span className={'font-semibold'}>Favorito</span></FavoriteButton>}
                </div>
                {isLoading ? <div className="container mx-auto pb-16  md:px-5 lg:px-0"><GalleryPropertySkeleton /></div> : (
                    <div className={'grid pb-16 container mx-auto'}>
                        {tabMenuProperty.gallery ?
                            (<GalleryProperty addStyles="container mx-auto grid grid-cols pb-16 lg:grid-cols-2 gap-5 animate-fadeIn transition" galleryID={`gallery-property-${results?.emprendimiento[0]?.codsuc}`} images={results?.img[0]?.flat() || []} />) :

                            tabMenuProperty.blueprint ? <GalleryProperty addStyles="container mx-auto grid grid-cols pb-16 lg:grid-cols-2 gap-5 animate-fade animate-duration-500  transition-all" galleryID={`gallery-blueprint-${results?.datos?.codemp}-${results?.datos?.codsuc}`} images={results?.imgP.flat() || []} />
                                : tabMenuProperty.pdf && (results?.pdf?.length ?? 0) > 0 ? (
                                    <PDFViewer file={`${results?.pdf[0]?.pdf_name}`} />
                                ) : tabMenuProperty.unitList && resultsUnit?.unidadesDisponibles ? (<div className="h-fit w-full bg-gray-300 container"><span className="flex justify-start items-start overflow-hidden h-fit font-bold"><UnitAvailableTable unitAvailable={resultsUnit} /></span></div>) : (
                                    <div className="h-[700px] w-full bg-gray-300 rounded-xl aspect-square container mx-auto h-100"><span className="flex justify-center items-center h-full font-bold">No disponible</span></div>)
                        }
                    </div>
                )
                }
            </section>
            {/* Caracteristicas */}
            <section className="bg-[#939B41] py-10 text-white  md:px-0 lg:px-0">
                {isLoading ? <DetailsPropertySkeleton />
                    :
                    <div className="container flex flex-col divide-y-2 md:divide-y-2 lg:divide-x-2 lg:divide-y-0  md:flex-col lg:flex-row justify-center  w-max lg:w-fit  items-center place-content-center mx-auto h-full">

                        {
                            (results?.emprendimiento[0]?.valor_desde !== "0" && results?.emprendimiento[0]?.valor_desde !== "") ? (
                                <div className="text-center  w-full flex justify-center items-center flex-col md:px-20 lg:px-14 p-5">
                                    <span className="text-2xl md:text-2xl lg:text-4xl  font-cormorant font-base flex  w-max">Valor desde</span>
                                    <p className="text-xl md:text-xl lg:text-3xl self-center font-semibold tracking-wide w-max">U$S {results?.emprendimiento[0]?.valor_desde}</p>
                                </div>) : null}
                        {
                            results?.emprendimiento[0]?.tipo !== '' ? (<div className=" flex justify-center flex-col  text-center  w-full px-10 md:px-20 lg:px-20 p-5 ">
                                <div className="flex items-center justify-center ">
                                    <PropertyBuildIcon addStyles="fill-white pb-1" h={"56"} w={"64"} />
                                    {/*     <img className="w-[56px] h-[56px]  " src={'/images/home-property.png'} alt="home property" /> */}
                                </div>
                                <span className="text-2xl md:text-2xl lg:text-4xl font-cormorant font-base tracking-wide flex items-center justify-center">Tipo</span>
                                <span className={"text-xl md:text-xl lg:text-3xl self-center font-semibold tracking-wide "}>{results?.emprendimiento[0]?.tipo}</span>
                            </div>) : null

                        }
                        {
                            results?.emprendimiento[0]?.ed_amb?.split('A')[0].length !== 0 ? (<div className="flex justify-center flex-col  text-center  w-full px-10 md:px-20 lg:px-20 p-5">
                                <div className="flex items-center justify-center">

                                    <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/puerta.png'} alt="superficie" />
                                </div>
                                <span className="text-2xl md:text-2xl lg:text-4xl font-cormorant font-base tracking-wide flex  items-center justify-center">Ambientes</span>
                                <span className={"text-xl md:text-xl place-content-center self-center lg:text-3xl font-semibold tracking-wide w-max "}>{results?.emprendimiento[0]?.ed_amb?.split('A')[0] === "0" ? "Monoambiente" : results?.emprendimiento[0]?.ed_amb?.split('A')[0]}</span>
                            </div>) : null
                        }
                        {
                            results?.emprendimiento[0]?.ed_bar !== "" ? (
                                <div className=" flex justify-center flex-col  text-center  w-full px-10 md:px-20 lg:px-20 p-5 ">
                                    <div className="flex items-center justify-center w-100">

                                        <MapLocationIcon addStyles="fill-white" h={"56"} w={"56"} />
                                    </div>
                                    <span className="text-2xl md:text-2xl lg:text-4xl   font-cormorant font-base tracking-wide flex items-center justify-center">Barrio</span>
                                    <span className={"text-xl md:text-xl lg:text-3xl self-center font-semibold tracking-wide w-max "}>{he.decode(results?.emprendimiento[0]?.ed_bar || '')}</span>
                                </div>) : null
                        }

                    </div>
                }
            </section>
            <section className="container mx-auto flex justify-between gap-2 pt-16 pb-5 relative md:px-5 lg:px-10">

                {isLoading ? (<div className="container mx-auto pb-16"><BreadCrumbSkeleton /> </div>) : (
                    <div className="flex items-end gap-1 w-fit">
                        <MapLocationIcon />
                        <span className="text-sm md:text-md lg:text-lg text-primary-text-msb w-fit text-pretty font-semibold capitalize">{capitalize(he.decode(`${results?.emprendimiento[0]?.ed_nom}, ${results?.emprendimiento[0]?.ed_loc}`))}</span>
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
                    {isLoading || !results?.emprendimiento[0]?.ed_coo
                        ? <div className="h-[208px] w-full bg-gray-300 rounded-xl aspect-square container mx-auto h-100 animate-pulse">
                            <span className="flex justify-center items-center h-full font-bold"></span>
                        </div>
                        : (
                            <div>
                                <div className="h-[400px] w-full md:col-span-1 lg:col-span-1">
                                    {/* Agregar el titulo de la direcion en alado del market  */}
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.google.com/maps/embed/v1/place?q=${`${results?.emprendimiento[0]?.ed_coo.split(',')[0]}, ${results?.emprendimiento[0]?.ed_coo.split(',')[1]}`}&key=${import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY}`}
                                        allowFullScreen>

                                    </iframe>
                                </div>
                                <EntrepreneurshipFeatureList building={results?.emprendimiento[0]?.tipo} enviroments={results?.emprendimiento[0]?.ed_amb?.split('A')[0] === "0" ? "Monoambiente" : `${results?.emprendimiento[0]?.ed_amb?.split('A')[0]}`} location={he.decode(results?.emprendimiento[0]?.ed_loc)} />
                                <hr className={'border-secondary-text-msb '} />
                                <div className={'flex flex-col gap-5 py-5'}>
                                    <h2 className={'font-gotham text-base text-start  font-bold text-primary-text-msb'}>Descripción</h2>

                                    <Description htmlText={results?.emprendimiento[0]?.ed_pre} />
                                    <Description htmlText={results?.emprendimiento[0]?.ed_cue} />
                                </div>
                                <h2 className={'font-gotham text-base   md:text-start text-start  font-bold text-primary-text-msb pt-5'}>Detalle del Edificio | Emprendimiento {results?.emprendimiento[0]?.ed_est !== '' ? `${results?.emprendimiento[0]?.ed_est.includes('En') ? `${capitalize(he.decode(results?.emprendimiento[0]?.ed_est)).replace('En', 'en')}` : ` ${capitalize(results?.emprendimiento[0]?.ed_est)}`}` : ''}</h2>
                                <hr className={'border-secondary-text-msb my-3'} />
                                <EntrepreneurshipDetailList
                                    name={he.decode(results?.emprendimiento[0]?.ed_nom)}
                                    buildingType={he.decode(results?.emprendimiento[0]?.tipo)}
                                    location={he.decode(results?.emprendimiento[0]?.ed_loc)}
                                    neighborhood={he.decode(results?.emprendimiento[0]?.ed_bar)}
                                    address={he.decode(results?.emprendimiento[0]?.ed_dir)}
                                    category={he.decode(results?.emprendimiento[0]?.ed_cat)}
                                    state={he.decode(results?.emprendimiento[0]?.ed_est)}
                                    possessionAndDelivery={
                                        results?.emprendimiento[0]?.ed_po1
                                            ? `${he.decode(results?.emprendimiento[0]?.ed_po1.split("/")[0])}/${he.decode(results?.emprendimiento[0]?.ed_po1.split("/")[1])}`
                                            : `${new Date(results?.emprendimiento[0]?.fechaac).getMonth() + 1}/${new Date(results?.emprendimiento[0]?.fechaac).getFullYear()}`
                                    }
                                    architect={he.decode(results?.emprendimiento[0]?.ed_arq)}
                                    enviroments={he.decode(results?.emprendimiento[0]?.ed_amb)}
                                />

                            </div>
                        )}
                </div>
                <div className={'bg-[#D9D9D9]  h-fit w-100  lg:col-start-7 lg-col-end-12 relative  lg:sticky lg:inset-0'}>
                    <ContactForm id={results?.emprendimiento[0]?.ed_idl ?? ''} tipo={results?.emprendimiento[0].tipo} codsuc={results?.datos?.codemp ?? ''} contact_prop={results?.emprendimiento[0]?.celular ? `https://api.whatsapp.com/send?phone=${123}&text=¡Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${encodeURIComponent(window.location.href)}&source=&data=` : ''} />
                </div>
            </section>
            <section className={'container mx-auto  my-30 md:px-5 lg:px-10'}>
                <BreadCrumbSkeleton />
                <BreadCrumbSkeleton />
                <div className={'grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-5 my-10 w-100'}>
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                </div>
            </section>
            <Toast message={toastMessage} icon={<WarningAlertIcon />} isVisible={toastVisible} customStyles="flex gap-2 border  border-primary-msb  bg-[#EFF0F2]" />
        </article>
    )
}

export default EntrepreneurshipDetail;
