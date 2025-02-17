import { useDispatch } from "react-redux";
import Avatar from "./Avatar";
import { open } from "../slices/sidebarDrawer";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between">
      <img
        src="/icons/dashboard/menu.svg"
        alt=""
        className="cursor-pointer hover:scale-110 transition"
        onClick={() => dispatch(open())}
      />
      <h3 className="text-blue-343 text-xl font-semibold">Overview</h3>
      <Avatar url="/images/dashboard/avatar.png" />
    </div>
  );
}
