import { Link } from "react-router";
import { BlogIF } from "../../interface/BlogIF";

function CardBlog({
  category: {
    name: categoryName,
    documentId: categoryDocumentId,
    slug: categorySlug,
  },
  description,
  date,
  image,
  title,
  author,
}: BlogIF) {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:items-center justify-between lg:flex lg:gap-16">
      <div className="gap-3 flex flex-col lg:gap-6 order-2 sm:order-1 md:gap-5 lg:flex-1">
        <div className="top flex gap-3 items-center">
          <Link
            to={`/blog/category/${categoryDocumentId}/${categorySlug}`}
            className="cursor-pointer transition hover:scale-105"
          >
            <div className="badge-category uppercase bg-blue-100 px-3 py-2 rounded-md text-blue text-sm font-semibold">
              {categoryName}
            </div>
          </Link>
          <p className="date uppercase text-blue text-sm font-normal">
            {date},{" "}
            <span className="capitalize hidden lg:inline-block">
              Posted by :{" "}
              <Link
                to={`/blog/author/${author}`}
                className="font-semibold hover:underline cursor-pointer"
              >
                {author}
              </Link>
            </span>
          </p>
        </div>
        <div className="gap-3 flex flex-col md:gap-3">
          <h3 className="text-xl md:text-2xl xl:text-[28px] text-blue font-bold leading-7 md:leading-9 capitalize">
            {title}
          </h3>
          <p className="text-blue font-normal text-sm xl:text-[18px] leading-6 md:text-base md:leading-7 xl:leading-8 line-clamp-3">
            {description}
          </p>
        </div>

        <span className="capitalize lg:hidden">
          Posted by :{" "}
          <Link
            to={`/blog/author/${author}`}
            className="font-semibold hover:underline cursor-pointer"
          >
            {author}
          </Link>
        </span>
      </div>
      <div className="image w-full h-[200px] sm:order-2 md:max-w-[300px] lg:w-full lg:h-[210px] md:justify-self-end">
        <img
          src={image.url}
          alt=""
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
}

export default CardBlog;
