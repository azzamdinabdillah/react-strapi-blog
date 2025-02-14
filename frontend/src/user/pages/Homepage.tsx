import axios from "axios";
import CardBlog from "../components/CardBlog";
import { Hero } from "../components/Hero";
import { useEffect, useState } from "react";
import { BlogIF } from "../../interface/BlogIF";
import { formatDate } from "../../helpers/format-date";
import { Link } from "react-router";

function Homepage() {
  const [blogs, setBlogs] = useState<BlogIF[]>([]);
  const env = import.meta.env;

  async function fetchBlog() {
    const response = await axios.get(`${env.VITE_API_URL}/blogs?populate=*`);
    console.log(response.data.data);

    setBlogs(response.data.data);
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="wrapper p-2 md:p-4 lg:p-7">
      <Hero
        subTitle={
          <>
            <p className="text-p text-white mb-5">
              <div className="animate-hello inline-block">👋</div> HELLO
            </p>
          </>
        }
      >
        Insights about my personal and work life, and the in-betweens
      </Hero>

      <div className="mx-3 md:mx-5">
        <div className="my-10 md:max-w-[850px] lg:max-w-[970px] flex justify-center items-center md:mx-auto md:my-14 lg:my-28">
          <div className="flex flex-col gap-7 xl:gap-12">
            <div className="header">
              <h2 className="text-h2 text-blue text-2xl mb-5 md:text-[32px]">
                Design Tools
              </h2>
              <hr className="hr" />
            </div>

            <div className="gap-7 xl:gap-10 flex flex-col items-center">
              {blogs.map((blog, index) => (
                <>
                  <Link to={`/blog/${blog.documentId}/${blog.slug}`}>
                    <CardBlog
                      image="/public/images/blog-1.png"
                      category={{ name: blog.category.name }}
                      content={blog.description}
                      title={blog.title}
                      date={formatDate(blog.createdAt ?? "")}
                    />
                  </Link>
                  {index !== 4 ? <hr className="hr" /> : ""}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
