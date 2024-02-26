import { supabaseServer } from "@/lib/supabaseServer"

export const getPostsByParentId = async (parentPostId: any) => {
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('posts')
    .select('*, profiles!user_id(id, username, avatar_url)')
    .eq('parent_id',parentPostId)
    .order('created_at', { ascending: false })

  if (error) {
    return {error: {message: error.message}};
  }
    
  return { comments: data }
};