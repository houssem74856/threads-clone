import { supabaseServer } from "@/lib/supabaseServer"

export const isFollowing = async (userId: any,currentUserId: any) => { 
  const db = await supabaseServer()
  const { data, error} = await db
    .from('followers')
    .select('*')
    .eq('follower', currentUserId)
    .eq('following', userId)
    .single()

  if (error) {
    return {error: {message: error.message}}
  }      

  if (data) {
    return {follow: true}
  }

  return {follow: false}
}