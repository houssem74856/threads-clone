import { supabaseServer } from "@/lib/supabaseServer"

/*export interface PostType {
  id: string
  content: string
  created_at: string
  profiles: {
    id: string
    username: string
    avatar_url: string
  }
}*/

export const getPosts = async () => {
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('posts')
    .select('*, profiles!user_id(id, username, avatar_url)')
    .is('parent_id',null)
    .order('created_at', { ascending: false })

  if (error) {
    return {error: {message: error.message}};
  }
  
  return {posts: data};
};