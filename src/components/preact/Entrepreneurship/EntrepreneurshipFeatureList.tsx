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
        <div className={'flex flex-wrap justify-evenly lg:justify-start  w-full gap-10 p-5 items-start'}>

            {building !== '' ? (<div className={'flex justify-center flex-col text-center gap-y-2'}>
                <HomePropertyIcon imgUrl="home-black" addStyles="mx-auto " h={"32"} w={"32"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{building}</p>
            </div>) : null
            }
            {enviroments !== '' ? (<div className={'flex justify-center flex-col text-center gap-y-2'}>
                <DoorOpen addStyles="mx-auto" h={"32"} w={"32"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{enviroments}</p>
            </div>) : null
            }
            {location !== '' ? (<div className={'flex justify-center flex-col text-center gap-y-2'}>
                <MapLocationIcon addStyles="mx-auto" h={"32"} w={"32"} />
                <p className={"text-secondary-text-msb font-medium font-gotham text-sm text-center"}>{location}</p>
            </div>) : null
            }
        </div>
    )
}

export default EntrepreneurshipFeatureList