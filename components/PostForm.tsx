"use client";

import Button from "./ui/MyButton";
import toast from "react-hot-toast";
import { createPost } from "@/actions/mutations/post actions/createPost";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function PostForm({ user }: any) {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<FieldValues>();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: (content: string) =>
      createPost({
        id: user.id,
        content,
      }),
  });

  //const textAreaRef = useRef<HTMLTextAreaElement>(null)

  /*useEffect(() => {
    if(textAreaRef.current !== null){
      textAreaRef.current.style.height = "auto"
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  },[content])*/

  const submitPost: SubmitHandler<FieldValues> = ({ content }) => {
    createPostMutation(content);

    toast.success("Post created!");
    resetField("content");
  };

  return (
    <form
      onSubmit={handleSubmit(submitPost)}
      className="bg-neutral-800/50 mt-6 p-2 rounded-md"
    >
      <textarea
        className="p-4 text-lg rounded-md w-full bg-neutral-700 placeholder:text-neutral-400 focus:outline-0 resize-none"
        placeholder="What's up?"
        {...register("content", { required: true })}
      />
      <Button
        type="submit"
        disabled={isPending}
        className="mt-2 text-lg rounded-3xl"
      >
        {isPending ? "Loading..." : "Post"}
      </Button>
    </form>
  );
}
