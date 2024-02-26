'use server'

import { supabase } from "@/lib/supabase";
import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
//import toast from "react-hot-toast";

interface Params {
  post_id: string,
}

export const deletePost = async ({ post_id }: Params) => {
  const db = await supabaseServer()
  const { error } = await db
    .from('posts')
    .delete()
    .eq('id', post_id)

  if (error) {
    //toast.error(error.message);

  } else{
    revalidatePath('/')
    //toast.success('Post deleted!')
  }
};