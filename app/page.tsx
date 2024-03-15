import { getPosts } from "@/access-data/posts";
import { fetchCurrentUser } from "@/access-data/users";
import { fetchInfinitePosts } from "@/actions/mutations/post actions/fetchInfinitePosts";

import Header from "@/components/Header";
import Post from "@/components/Post";
import PostForm from "@/components/PostForm";
import Posts from "@/components/Posts";

export default async function Home() {
  //const { posts: inf } = await fetchInfinitePosts(1);
  const { currentUser } = await fetchCurrentUser();
  const { posts, error } = await getPosts(currentUser?.id);

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
      <Posts currentUser={currentUser} posts={posts}>
        {/*posts.map((post: any) => (
          <Post
            key={post.id}
            id={post.id}
            content={post.content}
            created_at={post.created_at}
            profiles={post.profiles}
            user={currentUser}
          />
        ))*/}
        {/*inf &&
          inf.map((post: any) => (
            <Post
              key={post.id}
              id={post.id}
              content={post.content}
              created_at={post.created_at}
              profiles={post.profiles}
              user={currentUser}
            />
          ))*/}
      </Posts>
    </div>
  );
}
