import { supabaseServer } from "@/lib/supabaseServer"

export const fetchCurrentUser = async () => { 
  const db = await supabaseServer()
  const { data, error } = await db.auth.getSession()

  if (error) {
    return {error: {message: error.message}}
  }      

  return {currentUser: data.session?.user}
}