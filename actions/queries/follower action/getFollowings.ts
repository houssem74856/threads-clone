import { supabaseServer } from "@/lib/supabaseServer"

export const getFollowings = async (userId: any) => { 
  const db = await supabaseServer()
  const { data, error} =await db
  .from('followers')
  .select('*')
  .eq('follower', userId)

  if (error) {
    return {error: {message: error.message}}
  }      

  if (data) {
    return {followings: data}
  }

  return {followings: data}
}