import { supabaseServer } from "@/lib/supabaseServer";

export const getDialogueMessages = async (dialogueId: any) => {
  const db = await supabaseServer()
  const{ data: messages, error } = await db
    .from('messages')
    .select("*")
    .eq('dialogue_id', dialogueId)
    .order('created_at', { ascending: true })

  if (error) {
    return {error: {message: error.message}};
  }
  
  return { messages };
};

export const getGroupeMessages = async (groupeId: any) => {
  const db = await supabaseServer()
  const{ data: messages, error } = await db
    .from('messages')
    .select("*")
    .eq('groupe_id', groupeId)
    .order('created_at', { ascending: true })

  if (error) {
    return {error: {message: error.message}};
  }
  
  return { messages };
};