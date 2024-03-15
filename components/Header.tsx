"use client";

import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import useModal from "@/hooks/useModalStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2 } from "lucide-react";
import { NewSignInModal } from "./modals/NewSignInModal";

export default function Header({ user }: any) {
  const router = useRouter();
  const { onOpen } = useModal();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-x-4 flex-row-reverse">
      {user ? (
        <>
          {user.user_metadata?.avatar_url ? (
            <Avatar>
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback className="bg-transparent">
                <Loader2 className="h-6 w-6 animate-spin" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Link href={`/profile/${user.id}`}>
              <Button variant="outline" size="icon">
                <FaUserAlt />
              </Button>
            </Link>
          )}
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Button onClick={() => onOpen("signIn")}>Log in</Button>
          <Button
            onClick={() => onOpen("signUp")}
            variant="ghost"
            className="text-base"
          >
            Sign up
          </Button>
        </>
      )}
      <NewSignInModal />
    </div>
  );
}
