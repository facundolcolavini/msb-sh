
const GalleryPropertySkeleton = () => {
    const imagesSkeletonData = ['1', '2', '3', '4', '5']
    return (
        <div class="grid grid-cols lg:grid-cols-2 gap-5 animate-pulse" id="gallery"  >
            {
                imagesSkeletonData[0] && (
                    <div class="col-span-1 h-100">
                        <div
                            class="group rounded-xl transition-all relative aspect-squeare"

                            data-cropped="true"
                            data-pswp-width="2000"
                            data-pswp-height="1600"
                        >
                            <div class="h-full bg-gray-300 rounded-xl aspect-square"></div>

                        </div>
                    </div>
                )
            }

            <div class="grid grid-cols-2 gap-5">
                {
                    imagesSkeletonData[1] && (
                        <div class="col-span-1">
                            <div
                                class="group rounded-xl transition-all relative aspect-squeare"
                                target="_blank"
                                href={imagesSkeletonData[1]}
                                data-cropped="true"
                                data-pswp-width="2000"
                                data-pswp-height="1600"
                            >
                                <div class=" bg-gray-300 rounded-xl aspect-square"></div>
                            </div>
                        </div>
                    )
                }
                {
                    imagesSkeletonData[2] && (
                        <div class="col-span-1">

                            <div
                                class="group rounded-xl transition-all relative aspect-squeare"
                                target="_blank"
                                href={imagesSkeletonData[2]}
                                data-cropped="true"
                                data-pswp-width="2000"
                                data-pswp-height="1600"
                            >
                                <div class=" bg-gray-300 rounded-xl aspect-square"></div>
                            </div>

                        </div>
                    )
                }
                {
                    imagesSkeletonData[3] && (
                        <div class="col-span-1">
                            <div
                                class="group rounded-xl transition-all relative aspect-squeare"
                                target="_blank"
                                href={imagesSkeletonData[3]}
                                data-cropped="true"
                                data-pswp-width="2000"
                                data-pswp-height="1600"
                            >
                                <div class=" bg-gray-300 rounded-xl aspect-square"></div>
                            </div>
                        </div>
                    )
                }

                {
                    imagesSkeletonData[4] && (
                        <div class="col-span-1">
                            <div
                                class="group rounded-xl transition-all relative aspect-squeare"
                                target="_blank"
                                href={imagesSkeletonData[4]}
                                data-cropped="true"
                                data-pswp-width="2000"
                                data-pswp-height="1600"
                            >
                                <div class=" bg-gray-300 rounded-xl aspect-square"></div>
                            </div>
                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default GalleryPropertySkeleton