import RoutesSidebar from "./RoutesSidebar";
import { getRecommendedUsers } from "@/actions/queries/user action/getRecommendedUsers";
import { fetchCurrentUser } from "@/actions/queries/user action/fetchUser";
import Link from "next/link";
import { User } from "./User";

async function Sidebar() {
  const { users, error } = await getRecommendedUsers();
  const { currentUser } = await fetchCurrentUser();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="w-[400px] flex flex-col">
      <RoutesSidebar currentUser={currentUser} />
      <div className="bg-neutral-900 p-3 m-2 mt-0 mr-0 rounded-lg h-full">
        <h1>Recommended Users</h1>
        {users.length === 0 ? (
          <div className="mt-4 text-neutral-400">No users found.</div>
        ) : (
          <div className="flex flex-col gap-y-2 mt-4">
            {users.map((user: any) => (
              <Link href={`/profile/${user.id}`} key={user.id}>
                <User user={user}></User>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
