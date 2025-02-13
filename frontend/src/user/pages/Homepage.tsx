import CardBlog from "../components/CardBlog";
import { Navbar } from "../components/Navbar";

function Homepage() {
  return (
    <div className="wrapper p-2 md:p-4 lg:p-7">
      <div className="bg-blue px-7 rounded-[10px] relative">
        <Navbar />
        <div className="md:max-w-[800px] md:mx-auto lg:max-w-[930px] py-10 md:py-28 lg:py-36 lg:pt-[200px]">
          <p className="text-p text-white mb-5">
            <div className="animate-hello inline-block">👋</div> HELLO
          </p>
          <h1 className="text-h1 text-4xl md:text-5xl md:leading-17 lg:text-[52px] leading-11">
            Insights about my personal and work life, and the in-betweens
          </h1>
        </div>
      </div>

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
              {Array.from({ length: 5 }).map((_, index) => (
                <>
                  <CardBlog
                    image="/public/images/blog-1.png"
                    category={{ name: "Design Tools" }}
                    content="Redefined the user acquisition and redesigned the onboarding
                    experience, all within 3 working weeks."
                    title="10 Hilarious Cartoons That Depict Real-Life Problems of Programmers"
                    date="AUGust 13, 2021 "
                  />
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
