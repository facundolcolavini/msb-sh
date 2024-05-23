import type { Reviews } from "@/data/reviews"
import UserIcon from "../../Icons/UserIcon"

interface Props extends Reviews {

}

export const CardReview = ({
    userFullName,
    review,
    id
}: Props
) => {
    return (
        <div id={id} class="grid grid-cols-[auto,1fr] justify-center items-center gap-5 p-3 bg-[#ffff] shadow-md  rounded-md">
            <div className="bg-[#D9D9D9] p-4 rounded-full">
               {/*  <img src={'/images/user-experiece.png'} className={' h-[28.44px]'} style={{ width: '28.44px', height: '26.67px' }}></img> */}
               <UserIcon  class="fill-primary-msb" style={{ width: '28.44px', height: '28px' }}/>
            </div>
            <div className="grid h-full text-pretty place-content-center self-center  gap-y-1">
            <h1
                    class="text-base md:text-md lg:text-lg place-content-center self-center text-balance text-primary-text-msb text-left font-gothamMedium font-bold"
                >
                    {userFullName}
                </h1>
                    
                <p class="text-clip overflow-hidden italic w-full lg:text-xs text-primary-text-msb text-left font-normal font-italic " style={{ overflow: 'hidden' }}>
                    {review}
                </p>
            </div>
        </div>
    )
}
