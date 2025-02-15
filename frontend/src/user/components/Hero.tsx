import { ReactNode } from "react";
import { Navbar, NavbarMobile } from "./Navbar";
import { useNavigate } from "react-router";

interface HeroIF {
  children: ReactNode;
  subTitle: ReactNode;
  isBack?: boolean;
  customClassName?: string;
}

export function Hero({ children, subTitle, isBack = false, customClassName }: HeroIF) {
  const navigate = useNavigate();

  return (
    <div className={`bg-blue px-7 rounded-[10px] relative ${customClassName}`}>
      <Navbar />
      <NavbarMobile />
      <div className="flex flex-col items-start gap-3 md:max-w-[800px] md:mx-auto lg:max-w-[930px] py-10 md:py-28 lg:py-36 lg:pt-[200px]">
        {isBack ? (
          <img src="/icons/back.svg" alt="" onClick={() => navigate(-1)} className="cursor-pointer"/>
        ) : (
          ""
        )}
        <div className="">
          {subTitle}
          <h1 className="text-h1 text-4xl md:text-5xl md:leading-17 lg:text-[52px] leading-11 capitalize">
            {children}
          </h1>
        </div>
      </div>
    </div>
  );
}
