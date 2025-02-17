import { ReactNode } from "react";
import Header from "../components/Header";
import { Sidebar, SidebarDrawer } from "../components/Sidebar";

export default function BaseSidebarHeader({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="dashboard-app">
      <SidebarDrawer />
      <Sidebar />
      <div className="dash-wrapper lg:w-[calc(100% - 231px)] xl:w-[calc(100% - 250px)] lg:ml-[231px] xl:ml-[250px]">
        <Header title={title} />

        <div className="main-content bg-[#F5F7FA] py-5 px-6 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
