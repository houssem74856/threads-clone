import { supabaseServer } from "@/lib/supabaseServer"

export const getUserPosts = async (id: string) => { 
  const db = await supabaseServer()
  const { data, error} = await db
    .from('posts')
    .select('*, profiles!user_id(id, username, avatar_url)')
    .is('parent_id',null)
    .eq('user_id', id)
    .order('created_at', { ascending: false })

  if (error) {
    return {error: {message: error.message}};
  }                   

  return {posts: data}
}