//'use client'

import { HiHome } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md"
import { IoNotifications } from "react-icons/io5";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { headers } from "next/headers";

export default function RoutesSidebar({currentUser, params}: any) {
  //const pathname = usePathname()
  const pathname = headers().get("x-pathname")
  //const pathname = headersList.get()

  const routes = [
    {
      Icon: <HiHome size={22}/>,
      label: 'Home',
      active: pathname === '/',
      href: '/'
    },   
    {
      Icon: <IoNotifications size={22}/>,
      label: 'Notification',
      href: '/notification',
      active: pathname === '/notification'
    },
    {
      Icon: <HiBookmark size={22}/>,
      label: 'Saved',
      href: '/saved',
      active: pathname === '/saved'
    },
    {
      Icon: <MdAccountCircle size={22}/>,
      label: 'Profile',
      href: `/profile/${currentUser?.id}`,
      active: pathname == `/profile/${currentUser?.id}`
    },
  ]

  return (
    <div className="flex flex-col gap-y-4 px-5 bg-neutral-900 p-3 m-2 mr-0 rounded-lg">
        {routes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>
  )
}
