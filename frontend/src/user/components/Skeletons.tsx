export function SkeletonHeader() {
  return (
    <>
      <div className="flex flex-col animate-pulse gap-3 md:gap-5 w-full">
        <div className="w-1/2 h-7 md:h-14 bg-white/10 rounded-xl"></div>
        <div className="w-full h-10 md:h-16 bg-white/10 rounded-xl"></div>
      </div>
    </>
  );
}

export function SkeletonCardBlog() {
  return (
    <>
      <div className="flex flex-col gap-3 animate-pulse w-full md:grid grid-cols-3 md:gap-20 md:items-center">
        <div className="flex flex-col gap-3 order-2 md:order-1 col-span-2">
          <div className="flex gap-3 items-center w-1/2">
            <div className="w-32 h-6 bg-blue/15 rounded-xl"></div>
            <div className="w-32 h-6 bg-blue/15 rounded-xl"></div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-[70%] h-7 bg-blue/15 rounded-xl"></div>
            <div className="w-full h-11 md:h-20 bg-blue/15 rounded-xl"></div>
          </div>
        </div>
        <div className="h-40 w-full bg-blue/15 rounded-xl order-1 md:order-2"></div>
      </div>
    </>
  );
}

export function SkeletonSingleBlog() {
  return (
    <>
      <div className="flex flex-col gap-3 animate-pulse">
        <div className="h-72 w-full bg-blue/15 rounded-xl"></div>

        <div className="flex flex-col gap-2 md:max-w-[850px] lg:max-w-[970px] w-full mx-auto">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              className={`bg-blue/15 rounded-xl h-7 ${`w-${(index + 1) * 10}`}`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
