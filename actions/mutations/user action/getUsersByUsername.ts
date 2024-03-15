'use server'

import { supabaseServer } from "@/lib/supabaseServer";

export const getUsersByUsername = async (username: any) => {
  const db = await supabaseServer()
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .ilike('username', `%${username}%`)
    .order('created_at', { ascending: false })
  
    if(error) {
      return {error: error.message}
    }

    return {users: data}
};