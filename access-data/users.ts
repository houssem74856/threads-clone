import { supabaseServer } from "@/lib/supabaseServer"

export const fetchCurrentUser = async () => { 
  const db = await supabaseServer()
  const { data, error } = await db.auth.getSession()

  if (error) {
    return {error: {message: error.message}}
  }      

  return {currentUser: data.session?.user}
}

export const getRecommendedUsers = async () => {
  const db = await supabaseServer()
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return {error: {message: error.message}}
  }

  return {users: data}
};

export const getUserById = async (id: any) => {
  const db = await supabaseServer()
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', id)
    .order('created_at', { ascending: false })
    .single()

  if (error) {
    return {error: {message: error.message}}
  }

  return {user: data}
};