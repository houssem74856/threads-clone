'use server'

import { supabaseServer } from "@/lib/supabaseServer";
import { didHeLike } from "./didHeLike";
import { didHeSave } from "./didHeSave";

export const fetchInfinitePosts = async ({id, pageParam}: any) => {
  const from = pageParam * 5
  const to = ((pageParam + 1) * 5) - 1 

  const db = await supabaseServer()
  const{ data, error } = await db
    .from('posts')
    .select('*, profiles!user_id(id, username, avatar_url)')
    .is('parent_id',null)
    .range(from, to)
    .order('created_at', { ascending: false })

  if(error) {
    return error.message
  }

  for(let i = 0; i < data.length; i++) {
    const liked = await didHeLike({
      user_id: id,
      post_id: data[i].id,
    });
    const saved = await didHeSave({
      user_id: id,
      post_id: data[i].id,
    });
    
    data[i] = {...data[i], liked: liked, saved: saved}
  }
  
  return data;
}
