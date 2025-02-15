import { useParams } from "react-router";
import { Hero } from "../components/Hero";
import { useEffect, useState } from "react";
import { BlogIF } from "../../interface/BlogIF";
import { httpRequest } from "../../helpers/http-request";
import { formatDate } from "../../helpers/format-date";
import { SkeletonHeader } from "../components/Skeletons";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

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
          customClassName="rounded-b-none"
          isBack={true}
          subTitle={
            <>
              {loading ? (
                <SkeletonHeader />
              ) : (
                <div className="flex border-2 border-white rounded-md text-xs md:text-sm uppercase w-fit mb-3">
                  <div className="py-2 px-3 text-white font-semibold bg-transparent">
                    {blog?.category.name}
                  </div>
                  <div className="py-2 px-3 bg-white text-blue font-medium">
                    {formatDate(blog?.createdAt ?? "")}
                  </div>
                </div>
              )}
            </>
          }
        >
          <p>{blog?.title}</p>
        </Hero>
        <div className="">
          <img
            src={`${import.meta.env.VITE_BE_URL}${blog?.image.url}`}
            alt=""
            className="h-70 w-full object-cover rounded-[10px] rounded-t-none"
          />

          <div className="md:max-w-[680px] w-full rich-text px-3 py-5">
            <BlocksRenderer content={(blog?.content as []) ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
