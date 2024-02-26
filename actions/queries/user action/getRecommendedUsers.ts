import { supabaseServer } from "@/lib/supabaseServer";

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