'use server'

import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

interface Params {
  id: string,
  content: string
}

export const createPost = async ({id, content}: Params) => {
  const db = await supabaseServer()
  const { error } = await db
    .from('posts')
    .insert({
      user_id: id,
      content: content,
    });

  if (error) {
    throw new Error('something went wrong')
  }else {
    revalidatePath('/')
  }
};