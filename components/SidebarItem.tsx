
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

/*interface SidebarItemProps {
  Icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}*/

const SidebarItem = ({
  Icon,
  label,
  active,
  href
}: any) => {
  return ( 
    <form action={async () => {
      'use server'
      revalidatePath('/', 'layout')}
    }>
    <button >
      <Link 
        href={href}
        className={twMerge(`
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
          )
        }
      >
        {Icon}
        <h1 className="truncate w-100 text-lg">{label}</h1>
      </Link>
    </button>
    </form>
   );
}

export default SidebarItem;