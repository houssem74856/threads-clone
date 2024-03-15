import { getRecommendedUsers, fetchCurrentUser } from "@/access-data/users";

import Routes from "./Routes";
import Link from "next/link";
import { User } from "./User";
import { ModeToggle } from "./modeToggle";

async function Sidebar() {
  const { users } = await getRecommendedUsers();
  const { currentUser } = await fetchCurrentUser();

  return (
    <div className="w-[400px] flex flex-col">
      <Routes currentUser={currentUser} />
      <div className="bg-neutral-900 p-3 m-2 mt-0 mr-0 rounded-lg h-full">
        <h1>Recommended Users</h1>
        {users?.length === 0 ? (
          <div className="mt-4 text-neutral-400">No users found.</div>
        ) : (
          <div className="flex flex-col gap-y-2 mt-4">
            {users?.map((user: any) => (
              <Link href={`/profile/${user.id}`} key={user.id}>
                <User user={user} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="absolute bottom-3 left-3">
        <ModeToggle />
      </div>
    </div>
  );
}

export default Sidebar;
