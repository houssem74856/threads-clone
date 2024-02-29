"use client";

import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import useModal from "@/hooks/useModalStore";

interface SidebarItemProps {
  Icon: React.ReactNode;
  label: string;
  href: string;
  currentUser: any;
}

const SidebarItem = ({ Icon, label, href, currentUser }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const active = href === pathname;
  const { onOpen } = useModal();

  const handleClick = () => {
    if (href !== "/" && !currentUser) {
      onOpen("signIn");
    } else {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={twMerge(
        `
        flex 
          flex-row 
          h-auto 
          items-center 
          w-full 
          gap-x-4 
          text-md 
          font-medium
          cursor-pointer
          hover:text-white
          transition
          text-neutral-400
          py-1`,
        active && "text-white"
      )}
    >
      {Icon}
      <h1 className="truncate w-100 text-lg">{label}</h1>
    </button>
  );
};

export default SidebarItem;
