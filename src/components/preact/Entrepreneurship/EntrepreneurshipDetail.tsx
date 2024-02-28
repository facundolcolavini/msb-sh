import he from 'he';
import type { FunctionComponent } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useEffect, useState } from "preact/hooks";


import type { APIResponseDetailEntrepreneurShip, APIResponseEntrepreneurShipUnit, DetailEntrepreneurship, ResultEntrePreneurShipUnit } from "@interfaces/entrepreneurship.interfaces";
import { tabMenuPropertyStore } from "src/store/tabMenuPropertyStore";
import GalleryProperty from "../Gallery/GalleryProperty";
import PrintIcon from "../Icons/PrintIcon";
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
import EntrepreneurshipDetailList from './EntrepreneurshipDetailList';
import EntrepreneurshipFeatureList from './EntrepreneurshipFeatureList';




interface Props {
    branchCode: string;
    propertyCode: string;
    breadCrumbChild?: string;
}

const EntrepreneurshipDetail: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const [results, setResults] = useState<DetailEntrepreneurship | null>()
    const [resultsUnit, setResultsUnit] = useState<ResultEntrePreneurShipUnit | null>()
    const closeModal = () => {
        setTabMenuProperty(prevState => ({ ...prevState, pdf: false }));
    };
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tabMenuProperty, setTabMenuProperty] = useState(
        tabMenuPropertyStore.get() // Estado local para el valor del almacén
    );

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
        // Realiza las tareas de inicialización aquí, como la obtención de datos
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
                setResultsUnit(data?.resultado);
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
                    {results?.emprendimiento[0]?.celular && <a target={'_blank'} href={`https://api.whatsapp.com/send?phone=${results?.emprendimiento[0]?.celular}&text=¡Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${encodeURIComponent(window.location.href)}&source=&data=`} className="bg-primary-bg-hover-msb py-3 h-fit rounded-lg px-12 lg:text-lg md:text-md text-white tracking-wide cursor-pointer">Consultar</a>}
                </header>
                <div className="container mx-auto pt-5 flex justify-between">
                    {isLoading ? <BreadCrumbSkeleton /> : <TabMenu videoUrl={null} unitList={true} pdf={(results?.pdf?.length ?? 0) > 0} blueprint={(resultsUnit?.unidadesDisponibles?.map(emp => emp.img_princ) ?? []).length > 0 && !isLoading} />}
                    {isLoading ? <BreadCrumbSkeleton /> : <Button addStyles="flex bg-transparent text-primary-text-msb hover:bg-transparent sm:text-sm  px-0 md:text-md lg:text-lg  gap-2 justify-center items-center" isFavorite={true}>Favorito</Button>}
                </div>
                {isLoading ? <div className="container mx-auto pb-16"><GalleryPropertySkeleton /></div> : (
                    <div className={'grid pb-16 container mx-auto'}>
                        {tabMenuProperty.gallery ?
                            (<GalleryProperty addStyles="container mx-auto grid grid-cols pb-16 lg:grid-cols-2 gap-5 animate-fadeIn transition" galleryID={`gallery-property-${results?.emprendimiento[0]?.codsuc}`} images={results?.img[0]?.flat() || []} />) :

                            tabMenuProperty.blueprint ? <GalleryProperty addStyles="container mx-auto grid grid-cols pb-16 lg:grid-cols-2 gap-5 animate-fade animate-duration-500  transition-all" galleryID={`gallery-blueprint-${resultsUnit?.datos?.codemp}-${resultsUnit?.datos?.nombre_emprendimiento}`} images={resultsUnit?.unidadesDisponibles.map(emp => emp.img_princ) || []} />
                                : tabMenuProperty.pdf && (results?.pdf?.length ?? 0) > 0 ? (
                                    <PDFViewer file={`${results?.pdf[0]?.pdf_name}`} />
                                ) : tabMenuProperty.unitList && resultsUnit?.unidadesDisponibles ? (<></>) : (
                                    <div className="h-[700px] w-full bg-gray-300 rounded-xl aspect-square container mx-auto h-100"><span className="flex justify-center items-center h-full font-bold">No disponible</span></div>)
                        }
                    </div>
                )
                }
            </section>
            {/* Caracteristicas */}
            <section className="bg-[#939B41] py-10 text-white  md:px-0 lg:px-0 ">
                {isLoading ? <DetailsPropertySkeleton />
                    :
                    <div className="container flex flex-col md:flex-col lg:flex-row justify-center w-3/4 lg:w-fit  items-center place-content-center mx-auto h-full">

                        {
                            (results?.emprendimiento[0]?.valor_desde !== "0" && results?.emprendimiento[0]?.valor_desde !== "") ? (<div className="border-b-2 border-t-2 lg:border-l-2 lg:border-t-0 lg:border-b-0 md:border-b-2 md:border-t-2  text-center h-[184px] w-full flex justify-center items-center flex-col md:px-20 lg:px-20 p-5">
                                <span className="text-2xl md:text-2xl lg:text-4xl font-cormorant flex flex-col font-semibold">Valor desde</span>
                                <p className="text-xl md:text-xl lg:text-3xl self-center font-bold tracking-wider block gap-2">{results?.emprendimiento[0]?.valor_desde}</p>
                            </div>) : null}
                        {
                            results?.emprendimiento[0]?.tipo !== '' ? (<div className="border-b-2 lg:border-l-2 lg:border-b-0 md:border-b-2 flex justify-center flex-col  text-center  w-full px-10 md:px-20 lg:px-20 p-5 ">
                                <div className="flex items-center justify-center ">
                                    <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/home-property.png'} alt="home property" />
                                </div>
                                <span className="text-2xl md:text-2xl lg:text-4xl  h-[56px] font-cormorant font-semibold tracking-wider flex items-center justify-center">Tipo</span>
                                <span className={"text-xl md:text-xl lg:text-3xl self-center font-bold tracking-wide "}>{results?.emprendimiento[0]?.tipo}</span>
                            </div>) : null

                        }
                        {
                            results?.emprendimiento[0]?.ed_amb?.split('A')[0].length !== 0 ? (<div className="border-b-2  lg:border-r-2  lg:border-l-2 lg:border-b-0 md:border-b-2 flex justify-center flex-col  text-center  w-full px-10 md:px-20 lg:px-20 p-5">
                                <div className="flex items-center justify-center">

                                    <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/puerta.png'} alt="superficie" />
                                </div>
                                <span className="text-2xl md:text-2xl lg:text-4xl h-[56px] font-cormorant font-semibold tracking-wider flex  items-center justify-center">Ambientes</span>
                                <span className={"text-xl md:text-xl place-content-center self-center lg:text-3xl font-bold tracking-wide "}>{results?.emprendimiento[0]?.ed_amb?.split('A')[0] === "0" ? "Monoambiente" : results?.emprendimiento[0]?.ed_amb?.split('A')[0]}</span>
                            </div>) : null
                        }
                        {
                            results?.emprendimiento[0]?.ed_bar !== "" ? (<div className={`border-b-0 ${results?.emprendimiento[0]?.ed_bar !== "" ? "lg:border-l-2" : "lg:border-l-0"} md:border-r-0 lg:border-r-2 lg:border-b-0 md:border-b-2 flex justify-center flex-col  text-center  w-full px-10 md:px-20 lg:px-20 p-5`}>
                                <div className="flex items-center justify-center pb-4">

                                    <img className="w-[56px] h-[56px]  object-fill aspect-square" src={'/images/map-mark.png'} alt="map-mark" />
                                </div>

                                <span className={"text-xl md:text-xl lg:text-3xl self-center  font-bold tracking-wide "}>{he.decode(results?.emprendimiento[0]?.ed_bar || '')}</span>
                            </div>) : null
                        }

                    </div>
                }
            </section>
            <section className="container mx-auto flex justify-between gap-2 pt-16 pb-5">

                {isLoading ? (<div className="container mx-auto pb-16"><BreadCrumbSkeleton /> </div>) : (
                    <div className="flex items-end gap-1 w-fit">
                        <img src="/images/map.png" alt="marker map" className="object-contain  flex items-center" />
                        <span className="text-sm md:text-md lg:text-lg text-primary-text-msb w-fit text-pretty font-semibold">{he.decode(`${results?.emprendimiento[0]?.ed_nom}, ${results?.emprendimiento[0]?.ed_loc}`)}</span>
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
                {isLoading || !results?.emprendimiento[0]?.ed_coo
                    ? <div className="h-[350px] w-full bg-gray-300 rounded-xl aspect-square container mx-auto h-100 animate-pulse">
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
                                <h2 className={'font-gotham text-base  md:text-xl lg:text-2xl  md:text-start text-start  font-bold text-primary-text-msb'}>Descripción</h2>

                                <Description htmlText={results?.emprendimiento[0]?.ed_pre} />
                                <Description htmlText={results?.emprendimiento[0]?.ed_cue} />
                            </div>
                            <h2 className={'font-gotham text-base  md:text-xl lg:text-2xl  md:text-start text-start  font-bold text-primary-text-msb pt-5'}>Detalle del Edificio | Emprendimiento en Pozo</h2>
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
                <div className={'bg-[#D9D9D9] relative h-fit'}>
                    <ContactForm id={results?.emprendimiento[0]?.ed_idl ?? ''} tipo={results?.emprendimiento[0].tipo} codsuc={results?.datos?.codemp ?? ''} contact_prop={results?.emprendimiento[0]?.celular ? `https://api.whatsapp.com/send?phone=${123}&text=¡Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+${encodeURIComponent(window.location.href)}&source=&data=` : ''} />
                </div>
            </section>
            <section className={'container mx-auto  my-30'}>
                <BreadCrumbSkeleton />
                <BreadCrumbSkeleton />
                <div className={'grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-5 my-10 w-100'}>
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                    <CardResultSkeleton />
                </div>
            </section>

        </article>
    )
}

export default EntrepreneurshipDetail;
