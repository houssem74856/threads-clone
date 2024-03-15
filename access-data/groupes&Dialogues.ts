import { supabaseServer } from "@/lib/supabaseServer";

export const getGroupesAndDialogues = async ({ userId }: any) => {
  const db = await supabaseServer()
  const{ data: dialogues, error: error1 } = await db
    .from('dialogues')
    .select("*")
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)

  if (error1) {
    return {error: {message: error1.message}};
  }

  for(let i = 0; i< dialogues.length; i++) {
    const otherUserId = dialogues[i].user1_id === userId ? dialogues[i].user2_id : dialogues[i].user1_id

    const{ data: otherUser } = await db
      .from('profiles')
      .select("username, avatar_url")
      .eq('id',otherUserId)
      .single()

    dialogues[i] = {...dialogues[i], otherUser}
  }

  const{ data: groupes, error: error2 } = await db
    .from('profiles_x_groupes')
    .select("*, groupes(*)")
    .eq('user_id',userId)

  if (error2) {
    return {error: {message: error2.message}};
  }

  for(let i = 0; i < groupes.length; i++ ) {
    groupes[i] = groupes[i].groupes
  }

  const conversations = dialogues.concat(groupes)/*.sort((a,b) => {
    console.log(new Date(b.created_at) - new Date(a.created_at))
    return b.created_at - a.created_at
  })*/
  
  return {conversations: conversations};
};

export const getDialogueById = async ({id, currentUserId}: any) => {
  const db = await supabaseServer()
  const{ data, error: error } = await db
    .from('dialogues')
    .select("*")
    .eq('id', id)
    .single()
    
  if (error) {
    return {error: {message: error.message}};
  }

  const otherUserId = data.user1_id === currentUserId ? data.user2_id : data.user1_id

  const{ data: otherUser } = await db
    .from('profiles')
    .select("username, avatar_url")
    .eq('id',otherUserId)
    .single()

  const dialogue = {...data, otherUser}

  return {dialogue}
}

export const getGroupeById = async ({id}: any) => {
  const db = await supabaseServer()
  const{ data, error: error } = await db
    .from('groupes')
    .select("*")
    .eq('id', id)
    .single()
    
  if (error) {
    return {error: {message: error.message}};
  }

  const{ data: otherUsers } = await db
    .from('profiles_x_groupes')
    .select("profiles(id, username, avatar_url)")
    .eq('groupe_id',id)

  const groupe = {...data, otherUsers}

  return {groupe}
}