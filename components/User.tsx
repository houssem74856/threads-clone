import Image from "next/image";
import Button from "./ui/MyButton";
import { FaUserAlt } from "react-icons/fa";

export const User = ({ user }: any) => {
  return (
    <div className="flex gap-x-2 items-center">
      {user.avatar_url ? (
        <Image
          className="rounded-full hover:cursor-pointer"
          width={40}
          height={40}
          src={user.avatar_url}
          alt="avatar"
        />
      ) : (
        <Button className="px-3 py-3 hover:opacity-100 hover:cursor-pointer">
          <FaUserAlt />
        </Button>
      )}
      <h1 className="text-xl font-semibold hover:cursor-pointer">
        {user.username}
      </h1>
    </div>
  );
};
