//import { didHeLiked, didHeSaved } from "@/access-data/posts";

import Image from "next/image";
import Button from "./ui/MyButton";
import { FaRegComment, FaUserAlt } from "react-icons/fa";
import Link from "next/link";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import DeleteMainButton from "./DeleteMainButton";
import { didHeLike } from "@/actions/mutations/post actions/didHeLike";
import { didHeSave } from "@/actions/mutations/post actions/didHeSave";

export default async function MainPost({
  id,
  content,
  created_at,
  profiles,
  user,
  parentId,
}: any) {
  const liked = await didHeLike({
    user_id: user.id,
    post_id: id,
  });
  const saved = await didHeSave({
    user_id: user.id,
    post_id: id,
  });

  return (
    <div
      className="
        flex 
        flex-col
        gap-y-3
        bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
        relative
      "
      key={id}
    >
      <div className="flex gap-x-2 items-center">
        <Link href={`/profile/${profiles.id}`}>
          {profiles.avatar_url ? (
            <Image
              className="rounded-full hover:cursor-pointer"
              width={35}
              height={35}
              src={profiles.avatar_url}
              alt="avatar"
            />
          ) : (
            <Button className="px-3 py-3 hover:opacity-100 hover:cursor-pointer">
              <FaUserAlt size={12} />
            </Button>
          )}
        </Link>
        <Link href={`/profile/${profiles.id}`}>
          <h1 className="text-base font-medium hover:cursor-pointer opacity-80">
            {profiles.username}
          </h1>
        </Link>
      </div>
      <p className="pl-1 text-xl font-medium">{content}</p>
      <div className="flex gap-3.5">
        <LikeButton id={id} profiles={profiles} user={user} liked={liked} />
        <Link href={`/post/${id}`}>
          <Button className="px-1 py-1 bg-transparent hover:cursor-pointer">
            <FaRegComment color="white" size={20} />
          </Button>
        </Link>
        <SaveButton id={id} user={user} saved={saved} />
      </div>
      {profiles.id === user?.id && (
        <DeleteMainButton id={id} parentId={parentId} />
      )}
    </div>
  );
}
