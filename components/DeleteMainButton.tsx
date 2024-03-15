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
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";

export default function DeleteMainButton({ id, parentId }: any) {
  const router = useRouter();
  const handleDelete = async () => {
    await deletePost({ post_id: id });
    if (parentId) {
      router.push(`/post/${parentId}`);
    } else {
      router.push("/");
    }
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
