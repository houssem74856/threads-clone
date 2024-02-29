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

export const getFollowings = async (userId: any) => { 
  const db = await supabaseServer()
  const { data, error} = await db
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