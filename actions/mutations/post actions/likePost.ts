import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface Params {
  user_id: string
  post_id: string
  postOwner_id: string
  username: string
}

export const likePost = async ({user_id, post_id, postOwner_id, username}: Params) => {
  const { error } = await supabase
    .from('liked_posts')
    .insert({
      user_id,
      post_id,
    });
    
    if (error) {
      toast.error(error.message);
    } else {  
      toast.success('Post liked!')
    }
    
  /*const { error: notificationError } = await supabase
    .from('notifications')
    .insert({
      user_id: postOwner_id,
      body: `${username} liked your post!`,
    });

  if (notificationError) {
    return toast.error(notificationError.message);
  }*/
};