"use client";

import Image from "next/image";
import Button from "./ui/MyButton";
import { FaUserAlt } from "react-icons/fa";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function GroupeMessages({
  messages,
  currentUser,
  otherUsers,
  groupe_id,
}: any) {
  const router = useRouter();
  supabase
    .channel("supabase_realtime")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        if (payload.new.groupe_id === groupe_id) {
          router.refresh();
        }
      }
    )
    .subscribe();

  return (
    <div className="flex flex-col gap-y-3">
      {messages?.map((msg: any) => (
        <div key={msg.id}>
          {msg.from !== currentUser?.id ? (
            <div className="flex flex-row gap-x-2">
              {otherUsers.find((user: any) => {
                return user.profiles.id === msg.from;
              })?.profiles.avatar_url ? (
                <Image
                  className="rounded-full hover:cursor-pointer"
                  width={40}
                  height={40}
                  src={
                    otherUsers.find(
                      (user: any) => user.profiles.id === msg.from
                    ).profiles.avatar_url
                  }
                  alt="avatar"
                />
              ) : (
                <Button className="px-3 py-3 hover:opacity-100 hover:cursor-pointer">
                  <FaUserAlt size={14} />
                </Button>
              )}
              <h1 className="bg-red-500 p-2 rounded-full w-fit">
                {msg.content}
              </h1>
            </div>
          ) : (
            <div className="flex flex-row-reverse gap-x-2">
              {currentUser?.user_metadata?.avatar_url ? (
                <Image
                  className="rounded-full hover:cursor-pointer"
                  width={40}
                  height={40}
                  src={currentUser.user_metadata.avatar_url}
                  alt="avatar"
                />
              ) : (
                <Button className="px-3 py-3 hover:opacity-100 hover:cursor-pointer">
                  <FaUserAlt size={14} />
                </Button>
              )}
              <h1 className="bg-blue-500 p-2 rounded-full w-fit">
                {msg.content}
              </h1>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
