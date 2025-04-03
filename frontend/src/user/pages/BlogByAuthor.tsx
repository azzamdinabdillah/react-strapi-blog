import { Link, useParams } from "react-router";
import { Hero, HeroSubTitle } from "../components/Hero";
import ListBlog from "../layouts/ListBlog";
import { Fragment, useEffect, useState } from "react";
import { BlogIF } from "../../interface/BlogIF";
import { httpRequest } from "../../helpers/http-request";
import CardBlog from "../components/CardBlog";
import { formatDate } from "../../helpers/format-date";
import { SkeletonCardBlog } from "../components/Skeletons";

export default function BlogByAuthor() {
  const param = useParams();
  const [blogs, setBlog] = useState<BlogIF[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    const response = await httpRequest({
      type: "get",
      url: `/blogs?filters[author][$eq]=${param.author}&populate=*`,
    });
    setBlog(response);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper-parent blog-app">
      <Hero
        loading={loading}
        isBack={true}
        subTitle={
          <HeroSubTitle isLeftElement={true} leftElement={param.author} />
        }
      >
        <p className="capitalize">Blog By Author {param.author}</p>
      </Hero>

      <ListBlog headerName={`Author : ${param.author}`}>
        {loading ? (
          <>
            <SkeletonCardBlog />
            <SkeletonCardBlog />
            <SkeletonCardBlog />
          </>
        ) : (
          blogs.map((blog, index) => (
            <Fragment key={index}>
              <Link className="w-full" to={`/blog/${blog.documentId}/${blog.slug}`}>
                <CardBlog
                  author={blog.author}
                  image={{
                    url: `${import.meta.env.VITE_BE_URL}${blog.image.url}`,
                    id: blog.image.id
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
              {index !== blogs.length - 1 ? <hr className="hr" /> : ""}
            </Fragment>
          ))
        )}
      </ListBlog>
    </div>
  );
}
