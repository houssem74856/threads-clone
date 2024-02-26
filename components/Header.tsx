'use client'

import { useRouter } from "next/navigation"
import { FaUserAlt } from "react-icons/fa";
import Button from "@/components/ui/Button";
import useSignInModal from "@/hooks/useSignInModal";
import useSignUpModal from "@/hooks/useSignUpModal";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

function Header({ user }: any) {
  const router = useRouter()
  const SignInModal = useSignInModal();
  const SignUpModal = useSignUpModal();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    }

    router.refresh()
  }

  return (
    <div className="flex items-center gap-x-4 flex-row-reverse">
          {user ? (
            <>
              <div>
              {user.user_metadata?.avatar_url ? ( 
                <Image
                  className="rounded-full"
                  width={40}
                  height={40}
                  src={user.user_metadata.avatar_url}
                  alt="avatar"
                />
                ) : ( 
                <Link 
                  href={`/profile/${user.id}`}
                >
                  <Button 
                    className="px-3 py-3"
                  >
                    <FaUserAlt />
                  </Button>
                </Link>
                )}
              </div>
              <div>
                <Button 
                  onClick={handleLogout} 
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Button 
                  onClick={SignInModal.onOpen} 
                >
                  Log in
                </Button>
              </div>
              <div>
                <Button 
                  onClick={SignUpModal.onOpen} 
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
            </>
          )}
        </div>
  )
}

export default Header