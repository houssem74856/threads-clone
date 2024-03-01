import { getNotificationsByUserId } from "@/access-data/notifications";
import { fetchCurrentUser } from "@/access-data/users";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { markAsRead } from "@/actions/mutations/notification actions/markAsRead";

async function page() {
  const { currentUser } = await fetchCurrentUser();
  const { readNotif, unreadNotif, error } = await getNotificationsByUserId({
    userId: currentUser?.id,
  });

  if (error) {
    return <div>somthing went wrong : {error.message}</div>;
  }

  return (
    <div className="bg-neutral-900 p-3 m-2 rounded-lg w-full">
      <Header user={currentUser} />
      <h1 className="text-white text-2xl font-semibold mt-4 mb-1">
        Notifications
      </h1>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Unread">Unread</TabsTrigger>
          <TabsTrigger value="Read">Read</TabsTrigger>
        </TabsList>
        <TabsContent value="Unread">
          {unreadNotif.length === 0 ? (
            <div className="text-neutral-400">No new notifications.</div>
          ) : (
            <div className="flex flex-col gap-y-2">
              {unreadNotif.map((notif) => (
                <div
                  className="
                flex 
                flex-col
                gap-y-3
                bg-neutral-800/50 
                w-full 
                p-2 
                rounded-md
              "
                  key={notif.id}
                >
                  <p className="pl-1 text-xl font-medium">
                    {notif.type == "like"
                      ? `${notif.profiles.username} liked your post`
                      : notif.type == "comment"
                      ? `${notif.profiles.username} commented your post`
                      : `${notif.profiles.username} followed you`}
                  </p>
                  <form
                    action={async () => {
                      "use server";

                      await markAsRead({ id: notif.id });
                    }}
                  >
                    <Button>mark as read</Button>
                  </form>
                  <Link
                    href={
                      notif.post_id
                        ? `/post/${notif.post_id}`
                        : `/profile/${notif.from}`
                    }
                  >
                    <Button>view</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="Read">
          {readNotif.length === 0 ? (
            <div className="text-neutral-400">No notifications.</div>
          ) : (
            <div className="flex flex-col gap-y-2">
              {readNotif.map((notif) => (
                <div
                  className="
                flex 
                flex-col
                gap-y-3
                bg-neutral-800/50 
                w-full 
                p-2 
                rounded-md
              "
                  key={notif.id}
                >
                  <p className="pl-1 text-xl font-medium">
                    {notif.type == "like"
                      ? `${notif.profiles.username} liked your post`
                      : notif.type == "comment"
                      ? `${notif.profiles.username} commented your post`
                      : `${notif.profiles.username} followed you`}
                  </p>
                  <Link
                    href={
                      notif.post_id
                        ? `/post/${notif.post_id}`
                        : `/profile/${notif.from}`
                    }
                  >
                    <Button>view</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
