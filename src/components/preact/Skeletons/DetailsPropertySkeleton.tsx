 

const DetailsPropertySkeleton = () => {
  return (
<div className="grid lg:grid-cols-4 md:grid-cols-4 gird-cols justify-center w-fit  items-center place-content-center mx-auto h-full animate-pulse transition-all gap-5">
        {[1,2,3,4].map(item =>(
                <>
                <div className="h-[200px] w-full bg-gray-300 opacity-30 rounded-xl aspect-square container mx-auto h-100"> </div>
                </>
        ))}
    </div>
  )
}

export default DetailsPropertySkeleton