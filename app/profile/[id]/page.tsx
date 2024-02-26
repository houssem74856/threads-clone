import { isFollowing } from "@/actions/queries/follower action/isFollowing"
import { getUserPosts } from "@/actions/queries/post actions/getuserPosts"
import { fetchCurrentUser } from "@/actions/queries/user action/fetchUser"
import { getUserById } from "@/actions/queries/user action/getUserById"
import Button from "@/components/ui/Button"
import FollowButton from "@/components/FollowButton"
import Post from "@/components/Post"
import Image from "next/image"
import { FaUserAlt } from "react-icons/fa"
import { getFollowers } from "@/actions/queries/follower action/getFollowers"
import { getFollowings } from "@/actions/queries/follower action/getFollowings"

async function page({params}: any) {
  const { posts, error } = await getUserPosts(params.id)
  const { user } = await getUserById(params.id)
  const { currentUser } = await fetchCurrentUser()
  const { follow } = await isFollowing(params.id, currentUser?.id)
  const { followers } = await getFollowers(params.id)
  const { followings } = await getFollowings(params.id)

  if(error) {
    return (
      <div>{error.message}</div>
    )
  }

  return (
    <div className="bg-neutral-900 p-3 m-2 rounded-lg w-full">
      <div className="flex items-center gap-x-2 mb-2">
        {user.avatar_url ? ( 
          <Image
            className="rounded-full hover:cursor-pointer"
            width={35}
            height={35}
            src={user.avatar_url}
            alt="avatar"
          />
          ) : ( 
          <Button
            className="px-3 py-3 hover:opacity-100 hover:cursor-pointer"
          >
            <FaUserAlt size={12}/>
          </Button>
        )}
        <h1 className="text-base font-medium hover:cursor-pointer opacity-80">
          Posts: {posts.length}
        </h1>
        <h1 className="text-base font-medium hover:cursor-pointer opacity-80">
          Followers: {followers?.length}
        </h1>
        <h1 className="text-base font-medium hover:cursor-pointer opacity-80">
          Following: {followings?.length}
        </h1>
      </div>
      {currentUser?.id !== user.id && <FollowButton user={user} currentUser={currentUser} isFollow={follow}/>}
      <div className="mt-2">
        { posts?.length === 0 ? (
          <div className="text-neutral-400">
            No posts available.
          </div>
        ) : (
          <div
            className="flex flex-col gap-y-2" 
          >
            {posts.map((post) => (
              <Post key={post.id} id={post.id} content={post.content} created_at={post.created_at} profiles={post.profiles} user={currentUser}/>
            ))}
          </div>
            )}
      </div>
    </div>
  )
}

export default page