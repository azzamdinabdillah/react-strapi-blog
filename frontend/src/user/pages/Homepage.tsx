import CardBlog from "../components/CardBlog";
import { Hero } from "../components/Hero";
import { useEffect, useState } from "react";
import { BlogIF } from "../../interface/BlogIF";
import { formatDate } from "../../helpers/format-date";
import { Link } from "react-router";
import { httpRequest } from "../../helpers/http-request";
import { SkeletonCardBlog } from "../components/Skeletons";
import ListBlog from "../layouts/ListBlog";

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
    <div className="wrapper-parent">
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

      <ListBlog headerName="All Category">
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
                    url: `${import.meta.env.VITE_BE_URL}${blog.image.url}`,
                  }}
                  category={{
                    name: blog.category.name,
                    documentId: blog.category.documentId,
                    slug: blog.category.slug,
                  }}
                  description={blog.description}
                  title={blog.title}
                  date={formatDate(blog.createdAt ?? "")}
                />
              </Link>
              {index !== 4 ? <hr className="hr" /> : ""}
            </>
          ))
        )}
      </ListBlog>
    </div>
  );
}

export default Homepage;
