

const CardResultSkeleton = () => {
    return (
        <div class="shadow-lg rounded-lg overflow-hidden relative bottom-0 ">

            <div class="w-full h-48 bg-gray-300 animate-pulse" style="aspect-ratio: 16/9;"></div>

            <div class="p-4 bg-gray-500">
                <div class="h-100 flex flex-col space-y-2">

                    <div class="h-100 bg-gray-400 animate-pulse text-lg font-semibold rounded"></div>
                    <div class="h-100 bg-gray-400 animate-pulse text-sm rounded"></div>
                    <div class="h-100 bg-gray-400 animate-pulse text-sm rounded"></div>

                    <div class="flex justify-between items-center">

                        <span class="h-8 bg-slate-400 animate-pulse rounded"></span>
                        <div>
                            <span class="h-8 bg-slate-400 animate-pulse rounded"></span>
                            <span class="h-8 bg-slate-400 animate-pulse rounded"></span>
                        </div>
                    </div>
                </div>

                <div class="flex justify-between items-end mt-3">
                    <div class="flex gap-1">

                        <span class="h-8 bg-red-400 animate-pulse rounded"></span>
                    </div>

                    <span class="h-8 bg-red-400 animate-pulse rounded"></span>
                </div>
            </div>
        </div>

    )
}

export default CardResultSkeleton



