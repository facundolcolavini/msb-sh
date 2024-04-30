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
        <div id={id} class="flex items-center gap-5 p-3 bg-[#ffff] shadow-md justify-start rounded-md">
            <div class="bg-[#D9D9D9] mx-5 flex justify-center items-center  rounded-full px-4 py-3 md:py-2 lg:py-2 md:px-4 lg:px-4">
                <UserIcon
                    class="md:size-12 lg:size-12 size-10 fill-primary-msb mx-auto" />
            </div>

            <div class="flex flex-col gap-0 w-full lg:w-fit md:w-fit text-balance truncate ">
                <h1
                    class="text-base md:text-md lg:text-xl text-balance font-semibold text-primary-text-msb text-left"
                >
                    {userFullName}
                </h1>
                <p
                    class=" text-clip overflow-hidden  italic  lg:text-lg  text-primary-text-msb text-left font-normal font-italic"
                >
                    {review}
                </p>
            </div>
        </div>
    )
}
