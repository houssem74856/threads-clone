import Button from "./ui/MyButton";
import { revalidatePath } from "next/cache";
import { createPost } from "@/actions/mutations/post actions/createPost";

export default function CommentForm({
  user,
  parentPostId,
  parentPostOwner,
}: any) {
  const submitPost = async (formData: FormData) => {
    "use server";

    const content = formData.get("content") as string;

    await createPost({
      id: user.id,
      content,
      parent_id: parentPostId,
      parentPostOwner,
    });

    revalidatePath(`/post/${parentPostId}`);
  };

  return (
    <form action={submitPost} className="bg-neutral-800/50 mt-6 p-2 rounded-md">
      <textarea
        className="p-4 text-lg rounded-md w-full bg-neutral-700 placeholder:text-neutral-400 focus:outline-0 resize-none"
        placeholder="What's up?"
        name="content"
      />
      <Button type="submit" className="mt-2 text-lg rounded-3xl">
        Comment
      </Button>
    </form>
  );
}
