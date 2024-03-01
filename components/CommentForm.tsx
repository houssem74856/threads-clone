import Button from "./ui/MyButton";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabaseServer";

function CommentForm({ user, parentPostId, parentPostOwner }: any) {
  const submitPost = async (formData: FormData) => {
    "use server";

    if (user) {
      const content = formData.get("content") as string;

      const db = await supabaseServer();
      const { error } = await db.from("posts").insert({
        user_id: user?.id,
        content,
        parent_id: parentPostId,
      });

      await db.from("notifications").insert({
        to: parentPostOwner,
        from: user.id,
        type: "comment",
        post_id: parentPostId,
      });

      if (error) {
        return toast.error(error.message);
      }

      revalidatePath(`/post/${parentPostId}`);
    }
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

export default CommentForm;
