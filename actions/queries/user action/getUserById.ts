import { supabaseServer } from "@/lib/supabaseServer";

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