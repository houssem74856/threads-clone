'use client'

import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { deletePost } from "@/actions/mutations/post actions/deletePost";
import { MdDeleteOutline } from "react-icons/md";
import { Input } from "./ui/Input";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

export default function DeleteButton({id}: any) {
  const handleDelete = async () => {
    await deletePost({post_id: id})
  }
  
  return (
    <Button
      type="submit"
      onClick={handleDelete}   
      className="px-1 py-1 bg-red-800 hover:cursor-pointer absolute right-2 bottom-2"    
    >
      <MdDeleteOutline size={22}/>
    </Button>
  )
}
