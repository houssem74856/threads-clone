import { getPostById, getPostsByParentId } from "@/access-data/posts";
import { fetchCurrentUser } from "@/access-data/users";

import CommentForm from "@/components/CommentForm";
import MainPost from "@/components/MainPost";
import Post from "@/components/Post";

async function page({ params }: any) {
  const { currentUser } = await fetchCurrentUser();
  const { post } = await getPostById(params.id);
  const { comments, error } = await getPostsByParentId(params.id);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="bg-neutral-900 p-3 m-2 rounded-lg w-full">
      <MainPost
        key={post.id}
        id={post.id}
        content={post.content}
        created_at={post.created_at}
        profiles={post.profiles}
        user={currentUser}
        parentId={post.parent_id}
      />
      <CommentForm
        user={currentUser}
        parentPostId={post.id}
        parentPostOwner={post.profiles.id}
      />
      <div className="mt-2">
        {comments.length === 0 ? (
          <div className="text-neutral-400">No comments yet.</div>
        ) : (
          <div className="flex flex-col gap-y-2">
            {comments.map((comment) => (
              <Post
                key={comment.id}
                id={comment.id}
                content={comment.content}
                created_at={comment.created_at}
                profiles={comment.profiles}
                user={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
