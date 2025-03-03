import { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router";

function NavbarMenu() {
  return (
    <>
      <div className="text-white text-[18px] font-medium gap-10 flex items-center">
        <a href="/dashboard">Dashboard</a>
        <a href="">Daily Updates</a>
        <a href="">Tutorials</a>
        <a href="">Library</a>
      </div>
      <Button variants="white-100">Subscribe</Button>
    </>
  );
}

export function Navbar() {
  return (
    <div className="hidden lg:flex justify-between items-center lg:py-10 lg:max-w-[925px] xl:py-14 xl:max-w-[1260px] mx-auto absolute top-0 left-0 right-0 xl:px-20">
      <Link to={"/"}>
        <img src="/public/icons/brand.svg" alt="" />
      </Link>
      <NavbarMenu />
    </div>
  );
}

export function NavbarMobile() {
  const [navbarDrawerOpen, setNavbarDrawerOpen] = useState<boolean>(false);

  return (
    <div className="md:max-w-[800px] md:mx-auto">
      <div className="flex justify-between items-center lg:hidden pt-4 md:pt-10">
        <img src="/public/icons/brand.svg" alt="" />
        <div
          className="p-3 bg-white/10 rounded w-13 h-13 cursor-pointer"
          onClick={() => setNavbarDrawerOpen(true)}
        >
          <img
            src="/public/icons/hamburger-menu.svg"
            alt=""
            className="w-full"
          />
        </div>
      </div>

      <div
        className={`drawer h-screen w-screen fixed top-0 left-0 bottom-0 right-0 bg-black/30 z-10 flex justify-end transition-all ${
          !navbarDrawerOpen ? "invisible opacity-0" : "visible opacity-100"
        }`}
        onClick={() => setNavbarDrawerOpen(false)}
      >
        <div
          className={`bg-white h-screen w-fit transition-all delay-200 ${
            !navbarDrawerOpen ? "translate-x-full" : "translate-x-0"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col gap-10 p-10 items-end">
            <div
              className="p-3 bg-blue-100 rounded w-13 h-13 cursor-pointer"
              onClick={() => setNavbarDrawerOpen(false)}
            >
              <img src="/public/icons/close.svg" alt="" className="w-full" />
            </div>
            <div className="text-black text-[20px] font-medium gap-10 flex flex-col items-end">
              <a href="/dashboard">Dashboard</a>
              <a href="">Daily Updates</a>
              <a href="">Tutorials</a>
              <a href="">Library</a>
            </div>
            <Button variants="blue-100" classNameCustom="w-fit">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
