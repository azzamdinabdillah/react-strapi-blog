import Header from "../components/Header";
import { Sidebar, SidebarDrawer } from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="dashboard-app">
      <SidebarDrawer />
      <Sidebar />
      <div className="dash-wrapper">
        <Header />

        <div className="main-content bg-[#F5F7FA] py-5 px-6 w-full">asdasd</div>
      </div>
    </div>
  );
}
