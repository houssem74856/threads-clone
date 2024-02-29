'use server'

import { supabaseServer } from "@/lib/supabaseServer";

export const unsavePost = async ({user_id, post_id}: any) => {
  const db = await supabaseServer()

  await db
  .from('saved_posts')
  .delete()
  .eq('user_id', user_id)
  .eq('post_id', post_id)
};