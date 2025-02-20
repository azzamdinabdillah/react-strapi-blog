interface CardStatIF {
  title: string;
  subTitle: string | number;
  image: string;
}

export default function CardStat({image, subTitle, title}: CardStatIF) {
  return (
    <div className="flex items-center gap-2.5 xl:gap-5 bg-white py-6 px-4 rounded-[20px] w-full flex-grow-1 min-w-[230px] justify-center md:min-w-[225px] md:flex-grow md:justify-start">
      <img src={image} alt="" className="xl:w-[70px] xl:h-[70px]"/>
      <div className="flex flex-col gap-[5px]">
        <p className="text-xs text-blue-71 font-normal xl:text-base">{title}</p>
        <h3 className="text-black-23 font-semibold text-base xl:text-2xl">{subTitle}</h3>
      </div>
    </div>
  );
}
