import { Link, useParams } from "react-router";
import { Hero, HeroSubTitle } from "../components/Hero";
import ListBlog from "../layouts/ListBlog";
import { useEffect, useState } from "react";
import { BlogIF } from "../../interface/BlogIF";
import { httpRequest } from "../../helpers/http-request";
import CardBlog from "../components/CardBlog";
import { formatDate } from "../../helpers/format-date";

export default function BlogByCategory() {
  const param = useParams();
  const [blogs, setBlog] = useState<BlogIF[]>([]);

  async function fetchData() {
    const response = await httpRequest({
      type: "get",
      url: `/blogs?filters[category][documentId][$eq]=${param.documentId}&populate=*`,
    });
    setBlog(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper-parent">
      <Hero
        isBack={true}
        subTitle={
          <HeroSubTitle isLeftElement={true} leftElement={param.slug} />
        }
      >
        <p className="capitalize">Blog By Category {param.slug}</p>
      </Hero>

      <ListBlog headerName={`Category : ${param.slug}`}>
        {blogs.map((blog, index) => (
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
        ))}
      </ListBlog>
    </div>
  );
}
