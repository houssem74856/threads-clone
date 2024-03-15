import { getGroupesAndDialogues } from "@/access-data/groupes&Dialogues";
import { fetchCurrentUser } from "@/access-data/users";
import Button from "@/components/ui/MyButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = await fetchCurrentUser();
  const { conversations } = await getGroupesAndDialogues({
    userId: currentUser?.id,
  });

  return (
    <div className="flex w-full">
      <div className="w-[250px] bg-neutral-900 p-2 m-2 rounded-lg flex flex-col gap-y-2">
        <h1 className="text-white text-xl font-semibold mt-2 mb-2">
          Conversations
        </h1>
        {conversations?.map((conversation: any) => (
          <div key={conversation.id}>
            {conversation.otherUser ? (
              <Link href={`/messages/${conversation.id}`}>
                <div className="px-2 py-2 hover:bg-neutral-700 rounded-lg hover:cursor-pointer flex items-center gap-x-2">
                  {conversation.otherUser?.avatar_url ? (
                    <Image
                      className="rounded-full hover:cursor-pointer"
                      width={35}
                      height={35}
                      src={conversation.otherUser.avatar_url}
                      alt="avatar"
                    />
                  ) : (
                    <Button className="px-3 py-3 hover:opacity-100 hover:cursor-pointer">
                      <FaUserAlt size={12} />
                    </Button>
                  )}
                  <h1>{conversation.otherUser.username}</h1>
                </div>
              </Link>
            ) : (
              <Link href={`/messages/groupe/${conversation.id}`}>
                <div className="px-2 py-2 hover:bg-neutral-700 rounded-lg hover:cursor-pointer flex items-center gap-x-2">
                  {conversation.image_url ? (
                    <Image
                      className="rounded-full hover:cursor-pointer"
                      width={35}
                      height={35}
                      src={conversation.image_url}
                      alt="avatar"
                    />
                  ) : (
                    <Button className="px-3 py-3 hover:opacity-100 hover:cursor-pointer">
                      <FaUserAlt size={12} />
                    </Button>
                  )}
                  <h1>{conversation.name}</h1>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="bg-neutral-900 p-3 m-2 ml-0 rounded-lg w-full">
        {children}
      </div>
    </div>
  );
}
