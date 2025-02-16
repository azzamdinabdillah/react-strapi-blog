import { ReactNode } from "react";
import { Navbar, NavbarMobile } from "./Navbar";
import { useNavigate } from "react-router";
import { SkeletonHeader } from "./Skeletons";

interface HeroIF {
  children: ReactNode;
  subTitle: ReactNode;
  isBack?: boolean;
  customClassName?: string;
  loading?: boolean;
}

export function Hero({
  children,
  subTitle,
  isBack = false,
  customClassName,
  loading,
}: HeroIF) {
  const navigate = useNavigate();

  return (
    <div className={`bg-blue px-7 rounded-[10px] relative ${customClassName}`}>
      <Navbar />
      <NavbarMobile />
      <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-8 md:max-w-[800px] md:mx-auto lg:max-w-[930px] py-10 md:py-20 lg:py-36 lg:pt-[200px] xl:pt-[250px]">
        {isBack && (
          <img
            src="/icons/back.svg"
            alt=""
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
        )}
        <div className="w-full">
          {loading ? (
            <SkeletonHeader />
          ) : (
            <>
              {subTitle}
              <h1 className="text-h1 text-4xl md:text-5xl md:leading-17 lg:text-[52px] leading-11 capitalize">
                {children}
              </h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function HeroSubTitle({
  isLeftElement = false,
  isRightElement = false,
  leftElement,
  rightElement,
}: {
  isLeftElement?: boolean;
  isRightElement?: boolean;
  leftElement?: string | ReactNode;
  rightElement?: string | ReactNode;
}) {
  return (
    <>
      <div className="flex border-2 border-white rounded-md text-xs md:text-sm uppercase w-fit mb-3">
        {isLeftElement && (
          <div className="py-2 px-3 text-white font-semibold bg-transparent">
            {leftElement}
          </div>
        )}
        {isRightElement && (
          <div className="py-2 px-3 bg-white text-blue font-medium">
            {rightElement}
          </div>
        )}
      </div>
    </>
  );
}
