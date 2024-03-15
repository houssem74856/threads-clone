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

export const insertMessageInGroupe = async ({userId, groupeId, content}: any) => {
  const db = await supabaseServer()
  await db
    .from('messages')
    .insert({
      from: userId,
      groupe_id: groupeId,
      content,
    });
};