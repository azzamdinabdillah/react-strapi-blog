import { useParams } from "react-router";
import { Hero } from "../components/Hero";
import { useEffect, useState } from "react";
import { BlogIF } from "../../interface/BlogIF";
import axios from "axios";

export default function SingleBlog() {
  const param = useParams();
  const [blog, setBlog] = useState<BlogIF>();
  const env = import.meta.env;

  async function fetchData() {
    const data = await axios.get(`${env.VITE_API_URL}/blogs/${param.id}`);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
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
      </div>
    </div>
  );
}
