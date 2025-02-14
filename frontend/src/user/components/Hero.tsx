import { ReactNode } from "react";
import { Navbar, NavbarMobile } from "./Navbar";

interface HeroIF {
  children: string;
  subTitle: ReactNode;
}

export function Hero({ children, subTitle }: HeroIF) {
  return (
    <div className="bg-blue px-7 rounded-[10px] relative">
      <Navbar />
      <NavbarMobile />
      <div className="md:max-w-[800px] md:mx-auto lg:max-w-[930px] py-10 md:py-28 lg:py-36 lg:pt-[200px]">
        {subTitle}
        <h1 className="text-h1 text-4xl md:text-5xl md:leading-17 lg:text-[52px] leading-11">
          {children}
        </h1>
      </div>
    </div>
  );
}
