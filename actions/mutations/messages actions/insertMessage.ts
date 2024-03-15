'use server'

import { supabaseServer } from "@/lib/supabaseServer";

export const insertMessage = async ({userId, dialogueId, content}: any) => {
  const db = await supabaseServer()
  await db
    .from('messages')
    .insert({
      from: userId,
      dialogue_id: dialogueId,
      content,
    });
};