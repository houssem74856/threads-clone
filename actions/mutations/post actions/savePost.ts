'use server'

import { supabaseServer } from "@/lib/supabaseServer";

interface Params {
  user_id: string,
  post_id: string
}

export const savePost = async ({user_id, post_id}: Params) => {
  const db = await supabaseServer()
  await db
  .from('saved_posts')
  .insert({
    user_id,
    post_id,
  });
};