import { getPosts } from "@/access-data/posts";
import { fetchCurrentUser } from "@/access-data/users";

import Header from "@/components/Header";
import Post from "@/components/Post";
import PostForm from "@/components/PostForm";

export default async function Home() {
  const { posts, error } = await getPosts();
  const { currentUser } = await fetchCurrentUser();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="bg-neutral-900 p-3 m-2 rounded-lg w-full overflow-auto">
      <Header user={currentUser} />
      <PostForm user={currentUser} />
      <h1 className="text-white text-2xl font-semibold mt-4 mb-1">
        Newest Posts
      </h1>
      {posts.length === 0 ? (
        <div className="text-neutral-400">No posts available.</div>
      ) : (
        <div className="flex flex-col gap-y-2">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              content={post.content}
              created_at={post.created_at}
              profiles={post.profiles}
              user={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
