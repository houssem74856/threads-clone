import { supabaseServer } from "@/lib/supabaseServer";

export const getNotifications = async () => {
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return {error: {message: error.message}};
  }
  
  return {notifications: data};
};