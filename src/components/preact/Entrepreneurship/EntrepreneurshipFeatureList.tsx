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
                <HomePropertyIcon imgUrl="home-black" addStyles="mx-auto object-contain" h={"32"} w={"32"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{building}</p>
            </div>) : null
            }
            {enviroments !== '' ? (<div className={'flex justify-center flex-col text-center gap-y-2'}>
                <DoorOpen addStyles="mx-auto  object-contain" h={"32"} w={"32"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{enviroments}</p>
            </div>) : null
            }
            {location !== '' ? (<div className={'flex justify-center flex-col text-center w-100 h-100 gap-y-2'}>
                <MapLocationIcon addStyles="h-100 h-100 fill-primary-text-msb self-center" h={"32"} w={"46"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center w-max self-center"}>{location}</p>
            </div>) : null
            }
        </div>
    )
}

export default EntrepreneurshipFeatureList