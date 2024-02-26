import { supabaseServer } from "@/lib/supabaseServer"

export const getPostById = async (postId: any) => {
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('posts')
    .select('*, profiles!user_id(id, username, avatar_url)')
    .eq('id', postId)
    .single()

  if (error) {
    return {error: {message: error.message}};
  }
  
  return {post: data};
};