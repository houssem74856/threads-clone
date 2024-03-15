import { supabaseServer } from "@/lib/supabaseServer";

export const getNotificationsByUserId = async ({ userId }: any) => {
  const db = await supabaseServer()
  const{ data, error: error1 } = await db
    .from('notifications')
    .select("*, profiles!from(username)")
    .eq('to', userId)
    .order('created_at', { ascending: false })

  if (error1) {
    return {error: {message: error1.message}};
  }

  const unreadNotif: any[] = []
  const readNotif: any[] = []

  for(let i = 0; i < data.length ; i++) {
    if(data[i].isRead) {
      readNotif.push(data[i])
    } else {
      unreadNotif.push(data[i])
    }
  }
  
  return {readNotif, unreadNotif};
};