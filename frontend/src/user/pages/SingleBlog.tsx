import { useParams } from "react-router";
import { Hero } from "../components/Hero";
import { useEffect, useState } from "react";
import { BlogIF } from "../../interface/BlogIF";
import { httpRequest } from "../../helpers/http-request";
import { formatDate } from "../../helpers/format-date";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { SkeletonSingleBlog } from "../components/Skeletons";

export default function SingleBlog() {
  const param = useParams();
  const [blog, setBlog] = useState<BlogIF>();
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const data = await httpRequest({
      type: "get",
      url: `/blogs/${param.id}?populate=*`,
    });
    setBlog(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="wrapper p-2 md:p-4 lg:p-7">
        <Hero
          loading={loading}
          customClassName="rounded-b-none"
          isBack={true}
          subTitle={
            <div className="flex border-2 border-white rounded-md text-xs md:text-sm uppercase w-fit mb-3">
              <div className="py-2 px-3 text-white font-semibold bg-transparent">
                {blog?.category.name}
              </div>
              <div className="py-2 px-3 bg-white text-blue font-medium">
                {formatDate(blog?.createdAt ?? "")}
              </div>
            </div>
          }
        >
          <p>{blog?.title}</p>
        </Hero>
        {loading ? (
          <SkeletonSingleBlog />
        ) : (
          <div className="">
            <img
              src={`${import.meta.env.VITE_BE_URL}${blog?.image.url}`}
              alt=""
              className="h-70 w-full object-cover rounded-[10px] rounded-t-none md:h-[400px] lg:h-[500px] xl:h-[700px]"
            />

            <div className="md:max-w-[850px] lg:max-w-[970px] w-full rich-text px-3 py-5 mx-auto md:py-10 lg:py-16 xl:py-28">
              <BlocksRenderer content={(blog?.content as []) ?? []} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
