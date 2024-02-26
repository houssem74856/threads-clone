import { supabaseServer } from "@/lib/supabaseServer";

export const getSavedPosts = async () => {
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('saved_posts')
    .select('posts!post_id(*, profiles!user_id(id, username, avatar_url))')
    .order('created_at', { ascending: false })

  if (error) {
    return {error: {message: error.message}};
  }
  
  return { savedPosts: data }
};