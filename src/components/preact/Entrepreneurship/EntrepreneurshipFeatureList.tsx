import DoorOpen from "../Icons/DoorOpen";
import HomePropertyIcon from "../Icons/HomePropertyIcon";
import MapLocationIcon from "../Icons/MapLocationIcon";

interface Props {
    enviroments: string;
    location: string;
    building: string;
}
const EntrepreneurshipFeatureList = ({ enviroments, location, building }: Props) => {
    return (
        <div className={'grid grid-cols-autofil grid-flow-col justify-evenly lg:justify-start  w-full gap-10 p-5 items-start'}>

            {building !== '' ? (<div className={'flex justify-center flex-col text-center gap-y-2'}>
                <HomePropertyIcon className="mx-auto object-contain h-[32px] w-[32px]" />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{building}</p>
            </div>) : null
            }
            {enviroments !== '' ? (<div className={'flex justify-center flex-col text-center w-100 h-100 gap-y-2'}>
                <DoorOpen className="mx-auto  h-[32px] w-[32px] object-contain" />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{enviroments}</p>
            </div>) : null
            }
            {location !== '' ? (<div className={'flex justify-center flex-col text-center w-100 h-100 gap-y-2'}>
                <MapLocationIcon className="h-[32px] w-[46px] fill-primary-text-msb self-center" />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{location}</p>
            </div>) : null
            }
        </div>
    )
}

export default EntrepreneurshipFeatureList