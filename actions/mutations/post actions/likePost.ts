'use server'

import { supabaseServer } from "@/lib/supabaseServer";

interface Params {
  user_id: string
  post_id: string
  postOwner_id: string
}

export const likePost = async ({user_id, post_id, postOwner_id}: Params) => {
  const db = await supabaseServer()

  await db
  .from('liked_posts')
  .insert({
    user_id,
    post_id,
  });
    
  await db
  .from('notifications')
  .insert({
    to: postOwner_id,
    from: user_id,
    type: "like",
    post_id
  });
};