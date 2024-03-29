import { didHeLike } from "@/actions/mutations/post actions/didHeLike";
import { didHeSave } from "@/actions/mutations/post actions/didHeSave";
import { supabaseServer } from "@/lib/supabaseServer";

export const getPosts = async (id: any) => {
  const db = await supabaseServer()
  const { data, error } = await db
    .from('posts')
    .select('*, profiles!user_id(id, username, avatar_url)')
    .is('parent_id',null)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    return {error: {message: error.message}};
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
  
  return {posts: data};
};

export const getPostById = async (postId: any) => {
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('posts')
    .select('*, profiles!user_id(id, username, avatar_url)')
    .eq('id', postId)
    .single()

  if (error) {
    return {error: {message: error.message}};
  }
  
  return {post: data};
};

export const getPostsByParentId = async (parentPostId: any) => {
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('posts')
    .select('*, profiles!user_id(id, username, avatar_url)')
    .eq('parent_id',parentPostId)
    .order('created_at', { ascending: false })

  if (error) {
    return {error: {message: error.message}};
  }
    
  return { comments: data }
};

export const getSavedPosts = async () => {
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('saved_posts')
    .select('posts!post_id(*, profiles!user_id(id, username, avatar_url))')
    .order('created_at', { ascending: false })

  if (error) {
    return {error: {message: error.message}};
  }
  
  return { savedPosts: data }
};

export const getUserPosts = async (id: string) => { 
  const db = await supabaseServer()
  const { data, error} = await db
    .from('posts')
    .select('*, profiles!user_id(id, username, avatar_url)')
    .is('parent_id',null)
    .eq('user_id', id)
    .order('created_at', { ascending: false })

  if (error) {
    return {error: {message: error.message}};
  }                   

  return {posts: data}
}

/*export const didHeLike = async ({user_id, post_id}: any) => {
  if(!user_id) return false
  
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('liked_posts')
    .select()
    .eq('user_id', user_id)
    .eq('post_id', post_id)

  if(error) {
    return {error : {message: error.message}}
  }
    
  if(data.length > 0) return true
  return false
};

export const didHeSave = async ({user_id, post_id}: any) => {
  if(!user_id) return false
  
  const db = await supabaseServer()
  const{ data, error } = await db
    .from('saved_posts')
    .select()
    .eq('user_id', user_id)
    .eq('post_id', post_id)

  if(error) {
    return {error : {message: error.message}}
  }
    
  if(data.length > 0) return true
  return false
};*/