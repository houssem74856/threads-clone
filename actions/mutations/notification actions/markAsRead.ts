'use server'

import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

export const markAsRead = async ({id}: any) => {
  const db = await supabaseServer()
  const { error } = await db
    .from('notifications')
    .update({isRead : true})
    .eq("id", id)

  if (error) {
    throw new Error('something went wrong')
  }else {
    revalidatePath('/notifications')
  }
};