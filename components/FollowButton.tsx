"use client";

import { supabase } from "@/lib/supabase";
import Button from "./ui/MyButton";
import { useRouter } from "next/navigation";

export default function FollowButton({ user, currentUser, isFollow }: any) {
  const router = useRouter();
  const followOrUnfollow = async () => {
    if (isFollow) {
      const { error } = await supabase
        .from("followers")
        .delete()
        .eq("follower", currentUser.id)
        .eq("following", user.id);

      if (error) {
        console.log(error);
      }
    } else {
      const { error } = await supabase.from("followers").insert({
        follower: currentUser.id,
        following: user.id,
      });

      await supabase.from("notifications").insert({
        to: user.id,
        from: currentUser.id,
        type: "follow",
      });

      if (error) {
        console.log(error);
      }
    }
    router.refresh();
  };

  return (
    <Button onClick={followOrUnfollow}>
      {isFollow ? "Unfollow" : "Follow"}
    </Button>
  );
}
