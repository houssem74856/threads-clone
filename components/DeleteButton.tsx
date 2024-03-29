"use client";

import { deletePost } from "@/actions/mutations/post actions/deletePost";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDeleteOutline } from "react-icons/md";

export default function DeleteButton({ id }: any) {
  const queryClient = useQueryClient();

  const { mutate: deletePostMutation, isPending } = useMutation({
    mutationFn: () => deletePost({ post_id: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infinite"] });
    },
  });

  const handleDelete = async () => {
    deletePostMutation();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute bottom-2 right-2">
        <MdDeleteOutline size={25} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want delete this post?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-800 hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
