import { BlogIF } from "../../interface/BlogIF";

function CardBlog({ category, content, date, image, title }: BlogIF) {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:items-center justify-between md:flex lg:gap-16">
      <div className="gap-3 flex flex-col lg:gap-6 order-2 sm:order-1 md:gap-5">
        <div className="top flex gap-3 items-center">
          <div className="badge-category uppercase bg-blue-100 px-3 py-2 rounded-md text-blue text-sm font-semibold">
            {category.name}
          </div>
          <p className="date uppercase text-blue text-sm font-normal">{date}</p>
        </div>
        <div className="gap-3 flex flex-col md:gap-3">
          <h3 className="text-xl md:text-2xl xl:text-[28px] text-blue font-bold leading-7 md:leading-9 capitalize">
            {title}
          </h3>
          <p className="text-blue font-normal text-sm xl:text-[18px] leading-6 md:text-base md:leading-7 xl:leading-8">
            {content}
          </p>
        </div>
      </div>
      <div className="image sm:order-2 md:max-w-[300px]">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default CardBlog;
