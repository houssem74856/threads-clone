'use server'

import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { createNotification } from "../notification actions/createNotification";

export const createPost = async ({id, content, parent_id, parentPostOwner}: any) => {

  const db = await supabaseServer()
  await db
    .from('posts')
    .insert({
      user_id: id,
      content: content,
      parent_id
    });

  if(parent_id) {
    await createNotification({currentUser: id, user: parentPostOwner, type: "comment"})
  }
};