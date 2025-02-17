import Header from "../components/Header";
import SidebarDrawer from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="dashboard-app">
      <SidebarDrawer />
      <div className="dash-wrapper">
        <Header />
      </div>
    </div>
  );
}
