import { supabaseServer } from "@/lib/supabaseServer";

export const didHeSaved = async ({user_id, post_id}: any) => {
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('saved_posts')
    .select()
    .eq('user_id', user_id)
    .eq('post_id', post_id)

  if(error) {
    return {error : {message: error.message}}
  }
    
  if(data.length > 0) return true
  return false
};