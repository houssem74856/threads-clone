"use client";

import { Button } from "./ui/button";
import { unfollow } from "@/actions/mutations/follower action/unfollow";
import { follow } from "@/actions/mutations/follower action/follow";

export default function FollowButton({ user, currentUser, isFollow }: any) {
  const followOrUnfollow = async () => {
    if (isFollow) {
      await unfollow({ currentUser: currentUser.id, user: user.id });
    } else {
      await follow({ currentUser: currentUser.id, user: user.id });
    }
  };

  return (
    <Button onClick={followOrUnfollow}>
      {isFollow ? "Unfollow" : "Follow"}
    </Button>
  );
}
