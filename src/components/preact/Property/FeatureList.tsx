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
}: Props
) => {

    return (
        <div className={'flex flex-wrap justify-evenly lg:justify-start  w-full gap-10 p-5 items-start'}>

            {sup_cubierta !== '0.00m2' ? (<div className={'flex justify-center flex-col text-center'}>
                <RuleIcon addStyles="mx-auto" h={"24"} w={"24"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{sup_cubierta}</p>
            </div>) : null
            }
            {sup_total !== "" ? (<div className={'flex justify-center flex-col text-center'}>
                <SquareMeterIcon addStyles="mx-auto" h={"24"} w={"24"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{sup_total}</p>
            </div>) : null}

            {environments !== "" ? (<div className={'flex justify-center flex-col text-center'}>
                <DoorOpen addStyles="mx-auto" h={"24"} w={"24"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{environments} dorm.</p>
            </div>) : null}
            {baths !== "" ? (<div className={'flex justify-center flex-col text-center'}>
                <BathIcon addStyles="mx-auto" h={"24"} w={"24"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{baths} baños</p>
            </div>) : null}
            {location !== "" ? (<div className={'flex justify-center flex-col text-center'}>
                <CurtainsIcon addStyles="mx-auto" h={"24"} w={"24"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center capitalize"}>{location}</p>
            </div>) : null}
            {light !== "" ? (
                <div className={'flex justify-center flex-col text-center'}>
                    <SunIcon addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{light === 'Luz' && 'Luminoso'}</p>
                </div>) : null}

            {(antiquity !== "") ? (
                <div className={'flex justify-center flex-col text-center'}>
                    <CalendarIcon addStyles="mx-auto" h={"24"} w={"24"} />
                    <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{antiquity} años</p>
                </div>
            ) : null}

            <div className={'flex justify-center flex-col text-center'}>
                <PawIcon addStyles="mx-auto" h={"24"} w={"24"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{pet_accepted ? 'Apto Mascotas' : 'No Apto'}</p>
            </div>
            {furnished !== "" ? (<div className={'flex justify-center flex-col text-center'}>
                <FurnitureIcon addStyles="mx-auto" h={"24"} w={"24"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{furnished}</p>
            </div>) : null}
        </div>
    )
}

export default FeatureList