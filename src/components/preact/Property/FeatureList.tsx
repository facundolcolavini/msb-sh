import BathIcon from "../Icons/BathIcon"
import CalendarIcon from "../Icons/CalendarIcon"
import { CurtainsIcon } from "../Icons/CurtainsIcon"
import DoorOpen from "../Icons/DoorOpen"
import FurnitureIcon from "../Icons/FurnitureIcon"
import PawIcon from "../Icons/PawIcon"
import RuleIcon from "../Icons/RuleIcon"
import SquareMeterIcon from "../Icons/SquareMeterIcon"
import { SunIcon } from "../Icons/SunIcon"

interface Props {
    sup_total: string;
    sup_cubierta: string;
    environments: string;
    baths: string;
    location: string;
    furnished: string;
    light: string;
    pet_accepted: boolean;
    antiquity: string;
}

const FeatureList = ({
    sup_total,
    sup_cubierta,
    environments,
    baths,
    location,
    furnished,
    light,
    pet_accepted,
    antiquity
}: Props) => {

    return (
        <div className={'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 p-3'}>
            {sup_cubierta !== '0.00m2' && (
                <div className={'flex justify-center flex-col text-center'}>
                    <RuleIcon addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{sup_cubierta}</p>
                </div>
            )}
            {sup_total !== "" && (
                <div className={'flex justify-center flex-col text-center'}>
                    <SquareMeterIcon addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{sup_total}</p>
                </div>
            )}
            {environments !== "" && (
                <div className={'flex justify-center flex-col text-center'}>
                    <DoorOpen addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{environments} dorm.</p>
                </div>
            )}
            {baths !== "" && (
                <div className={'flex justify-center flex-col text-center'}>
                    <BathIcon addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{baths} baños</p>
                </div>
            )}
            {location !== "" && (
                <div className={'flex justify-center flex-col text-center'}>
                    <CurtainsIcon addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center capitalize"}>{location}</p>
                </div>
            )}
            {light !== "" && (
                <div className={'flex justify-center flex-col text-center'}>
                    <SunIcon addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{light === 'Luz' && 'Luminoso'}</p>
                </div>
            )}
            {antiquity !== "" && (
                <div className={'flex justify-center flex-col text-center'}>
                    <CalendarIcon addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{antiquity} años</p>
                </div>
            )}
            <div className={'flex justify-center flex-col text-center'}>
                <PawIcon addStyles="mx-auto" h={"24"} w={"24"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{pet_accepted ? 'Apto Mascotas' : 'No Apto'}</p>
            </div>
            {furnished !== "" && (
                <div className={'flex justify-center flex-col text-center'}>
                    <FurnitureIcon addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{furnished}</p>
                </div>
            )}
        </div>
    )
}
export default FeatureList