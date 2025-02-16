import CardBlog from "../components/CardBlog";
import { Hero } from "../components/Hero";
import { useEffect, useState } from "react";
import { BlogIF } from "../../interface/BlogIF";
import { formatDate } from "../../helpers/format-date";
import { Link } from "react-router";
import { httpRequest } from "../../helpers/http-request";
import { SkeletonCardBlog } from "../components/Skeletons";

function Homepage() {
  const [blogs, setBlogs] = useState<BlogIF[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const response = await httpRequest({
      type: "get",
      url: "/blogs?populate=*",
    });
    setBlogs(response);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper p-2 md:p-4 lg:p-7">
      <Hero
        key={"hero"}
        subTitle={
          <>
            <div className="text-p text-white mb-5">
              <div className="animate-hello inline-block">👋</div> HELLO
            </div>
          </>
        }
      >
        Insights about my personal and work life, and the in-betweens
      </Hero>

      <div className="mx-3 md:mx-5">
        <div className="my-10 md:max-w-[850px] lg:max-w-[970px] flex justify-center items-center md:mx-auto md:my-14 lg:my-28">
          <div className="flex flex-col gap-7 xl:gap-12 w-full">
            <div className="header">
              <h2 className="text-h2 text-blue text-2xl mb-5 md:text-[32px]">
                Design Tools
              </h2>
              <hr className="hr" />
            </div>

            <div className="gap-7 xl:gap-10 flex flex-col items-center">
              {loading ? (
                <>
                  <SkeletonCardBlog />
                  <SkeletonCardBlog />
                  <SkeletonCardBlog />
                </>
              ) : (
                blogs.map((blog, index) => (
                  <>
                    <Link
                      key={blog.documentId}
                      to={`/blog/${blog.documentId}/${blog.slug}`}
                    >
                      <CardBlog
                        key={blog.documentId}
                        image={{
                          url: `${import.meta.env.VITE_BE_URL}${
                            blog.image.url
                          }`,
                        }}
                        category={{ name: blog.category.name }}
                        description={blog.description}
                        title={blog.title}
                        date={formatDate(blog.createdAt ?? "")}
                      />
                    </Link>
                    {index !== 4 ? <hr className="hr" /> : ""}
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
