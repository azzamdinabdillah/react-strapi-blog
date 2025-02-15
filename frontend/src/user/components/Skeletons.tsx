export function SkeletonHeader() {
  return (
    <>
      <div className="flex flex-col animate-pulse gap-3 md:gap-5">
        <div className="w-1/2 h-7 md:h-14 bg-white/10 rounded-xl"></div>
        <div className="w-full h-10 md:h-16 bg-white/10 rounded-xl"></div>
      </div>
    </>
  );
}
