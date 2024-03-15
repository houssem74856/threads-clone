import { HiHome } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import SidebarItem from "./SidebarItem";
import SearchSidebarItem from "./SearchSidebarItem";
import { MessageCircle } from "lucide-react";

export default function Routes({ currentUser }: any) {
  const routes = [
    {
      Icon: <HiHome size={22} />,
      label: "Home",
      href: "/",
    },
    {
      Icon: <IoNotifications size={22} />,
      label: "Notifications",
      href: "/notifications",
    },
    {
      Icon: <HiBookmark size={22} />,
      label: "Saved",
      href: "/saved",
    },
    {
      Icon: <MdAccountCircle size={22} />,
      label: "Profile",
      href: `/profile/${currentUser?.id}`,
    },
    {
      Icon: <MessageCircle size={22} />,
      label: "Messages",
      href: `/messages`,
    },
  ];

  return (
    <div className="flex flex-col gap-y-4 px-5 bg-neutral-900 p-3 m-2 mr-0 rounded-lg">
      {routes.map((item) => (
        <SidebarItem key={item.label} {...item} currentUser={currentUser} />
      ))}
      <SearchSidebarItem />
    </div>
  );
}
