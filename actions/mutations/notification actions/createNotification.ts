'use server'

import { supabaseServer } from "@/lib/supabaseServer";

export const createNotification = async ({currentUser, user, type}: any) => {
  const db = await supabaseServer()
  const {error} = await db
    .from('notifications')
    .insert({
      to: user,
      from: currentUser,
      type: type,
    });

  if(error) {
    console.log(error)
  }
};