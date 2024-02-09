import { useEffect, useState } from "preact/hooks";

import type { APIResponsePropertyDetail, ResultPropertyDetails } from "@interfaces/detail.properties.interface";
import type { FunctionComponent } from "preact";
import type { PropsWithChildren } from "react";
import GalleryProperty from "../Gallery/GalleryProperty";
import GalleryPropertySkeleton from "../Skeletons/GalleryPropertySkeleton";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
interface Props {
    branchCode: string;
    propertyCode: string;
    breadCrumbChild?: string;

}

const PropertyPage: FunctionComponent<PropsWithChildren<Props>> = (props) => {
    const [results, setResults] = useState<ResultPropertyDetails | null>()

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchResults();

    }, [])

    const fetchResults = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/property.json?suc=${props.branchCode}&id=${props.propertyCode}`);
            const data: APIResponsePropertyDetail = await response.json();

            if (data?.hasOwnProperty("error")) {
                setResults(null);
                setIsLoading(false);
                throw data;
            } else if (response.ok) {
                setIsLoading(false);
                setResults(data.resultado);

            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <header class="lg:flex justify-between items-center">
                {!isLoading && props.breadCrumbChild}
                <a href={"https://api.whatsapp.com/send/?phone=5491133927629&text=%C2%A1Hola%21+Me+contacto+por+la+siguiente+propiedad%3A+https%3A%2F%2Fmatiasszpira.com.ar%2Fcasa-en-alquiler-en-terravista-ficha-ms36639&type=phone_number&app_absent=0"} class="bg-primary-bg-hover-msb py-3 h-fit rounded-lg px-12 lg:text-lg md:text-md text-white tracking-wide">Consultar</a>
            </header>
            <div class="pt-5 flex justify-between">
                <div class="">
                    Menu
                </div>
                <Button addStyles="flex bg-transparent text-primary-text-msb hover:bg-transparent  gap-2 justify-center items-center" isFavorite={true}>Favorito</Button>
            </div>
            {isLoading ? <GalleryPropertySkeleton /> : <GalleryProperty addStyles="grid grid-cols  lg:grid-cols-2 gap-5 animate-fadeIn " galleryID={`gallery-property-${results?.datos?.codigo_ficha}`} images={results!?.img || []} />}
            <h1>Detalle de Propiedad</h1>
            <p>Esta es la página de detalle de propiedad</p>
        </>
    )
}

export default PropertyPage