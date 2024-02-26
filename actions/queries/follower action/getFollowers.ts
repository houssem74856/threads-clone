import { supabaseServer } from "@/lib/supabaseServer"

export const getFollowers = async (userId: any) => { 
  const db = await supabaseServer()
  const { data, error} = await db
  .from('followers')
  .select('*')
  .eq('following', userId)

  if (error) {
    return {error: {message: error.message}}
  }      

  if (data) {
    return {followers: data}
  }

  return {followers: data}
}