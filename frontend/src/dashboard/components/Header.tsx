import { useDispatch } from "react-redux";
import Avatar from "./Avatar";
import { open } from "../slices/sidebarDrawer";
import MenuIcon from '/icons/dashboard/menu.svg';
import SettingsIcon from '/dashboard/icons/settings-header.svg';
import NotifIcon from '/dashboard/icons/notif-header.svg';
import AvatarUrl from '/images/dashboard/avatar.png';

export default function Header({ title }: { title: string }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between w-full lg:w-auto bg-white p-6 border-b-[2px] border-gray-e6 lg:py-7 lg:px-6 xl:px-10 xl:py-[33px]">
      <img
        src={MenuIcon}
        alt=""
        className="cursor-pointer hover:scale-110 transition lg:hidden"
        onClick={() => dispatch(open())}
      />
      <h3 className="text-blue-343 text-xl font-semibold lg:text-2xl xl:text-[28px]">
        {title}
      </h3>
      <div className="flex gap-5 items-center">
        <img
          src={SettingsIcon}
          alt=""
          className="hidden lg:block"
        />
        <img
          src={NotifIcon}
          alt=""
          className="hidden lg:block"
        />
        <Avatar url={AvatarUrl} />
      </div>
    </div>
  );
}
