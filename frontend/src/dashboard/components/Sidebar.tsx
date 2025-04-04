import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../slices/sidebarDrawer";
import { NavLink } from "react-router";
import SidebarHomeInactive from '/dashboard/icons/sidebar-home-inactive.svg';
import SidebarHomeActive from '/dashboard/icons/sidebar-home-active.svg';

import SidebarBlogInactive from '/dashboard/icons/sidebar-blog-inactive.svg';
import SidebarBlogActive from '/dashboard/icons/sidebar-blog-active.svg';

import SidebarCategoryInactive from '/dashboard/icons/sidebar-category-inactive.svg';
import SidebarCategoryActive from '/dashboard/icons/sidebar-category-active.svg';

import SidebarLogoutInactive from '/dashboard/icons/sidebar-logout-inactive.svg';


const sidebarMenu: {
  title: string;
  redirect: string;
  svgInactive: React.ReactNode;
  svgActive?: React.ReactNode;
}[] = [
  {
    title: "dashboard",
    redirect: "/dashboard",
    svgInactive: <img className="w-full" src={SidebarHomeInactive} alt="" />,
    svgActive: <img className="w-full" src={SidebarHomeActive} alt="" />,
  },
  {
    title: "Blogs",
    redirect: "/dashboard/blogs",
    svgInactive: <img className="w-full" src={SidebarBlogInactive} alt="" />,
    svgActive: <img className="w-full" src={SidebarBlogActive} alt="" />,
  },
  {
    title: "Categories",
    redirect: "/dashboard/categories",
    svgInactive: <img className="w-full" src={SidebarCategoryInactive} alt="" />,
    svgActive: <img className="w-full" src={SidebarCategoryActive} alt="" />,
  },
  {
    title: "Home",
    redirect: "/",
    svgInactive: <img className="w-full" src={SidebarLogoutInactive} alt="" />,
    svgActive: <img className="w-full" src={SidebarLogoutInactive} alt="" />,
  },
  {
    title: "Logout",
    redirect: "/login",
    svgInactive: <img className="w-full" src={SidebarLogoutInactive} alt="" />,
    svgActive: <img className="w-full" src={SidebarLogoutInactive} alt="" />,
  },
];

function SidebarMenu() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-9 mt-12 xl:gap-10">
      {sidebarMenu.map((menu, index) => (
        <React.Fragment key={index}>
          <NavLink
            onClick={() => {
              dispatch(close());
              if (menu.title === "Logout") {
                localStorage.removeItem("tokenJwt");
              } else {
                return;
              }
            }}
            to={menu.redirect}
            end={menu.redirect === "/dashboard"}
            className={({ isActive }) =>
              `flex gap-5 items-center px-6 relative xl:gap-[26px] xl:px-11 ${
                isActive
                  ? "before:h-[50px] xl:before:h-[60px] before:w-[5px] xl:before:w-[56x] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-[] before:bg-primary-3 before:rounded-tr-[10px] before:rounded-br-[10px]"
                  : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-5 h-5 xl:w-[25px] xl:h-[25px] ${
                    isActive ? "active-svg" : "inactive-svg"
                  }`}
                >
                  {isActive ? menu.svgActive : menu.svgInactive}
                </div>
                <p
                  className={`text-base font-medium capitalize transition-all xl:text-lg ${
                    isActive ? "text-primary-3" : "text-gray-b1"
                  }`}
                >
                  {menu.title}
                </p>
              </>
            )}
          </NavLink>
        </React.Fragment>
      ))}
    </div>
  );
}

export function SidebarDrawer() {
  const dispatch = useDispatch();
  const isOpenSidebar = useSelector((state: any) => state.openSidebarDrawer);

  return (
    <div
      className={`sidebar-drawer fixed top-0 left-0 right-0 bottom-0 w-full bg-white py-6 transition z-10 ${
        isOpenSidebar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-6">
        <img src="/icons/dashboard/logo.svg" alt="" />
        <button onClick={() => dispatch(close())} className="cursor-pointer">
          Close
        </button>
      </div>

      <SidebarMenu />
    </div>
  );
}

export function Sidebar() {
  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 w-[231px] xl:w-[250px] hidden lg:inline-block bg-white border-r-[2px] border-[#E6EFF5]">
        <img
          src="/icons/dashboard/logo.svg"
          alt=""
          className="pt-6 px-6 xl:pt-[31px] xl:px-[38px]"
        />

        <SidebarMenu />
      </div>
    </>
  );
}
