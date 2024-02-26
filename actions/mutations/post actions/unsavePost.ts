import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export const unsavePost = async ({user_id, post_id/*, postOwner_id, username*/}: any) => {
  const { error } = await supabase
    .from('saved_posts')
    .delete()
    .eq('user_id', user_id)
    .eq('post_id', post_id)

  if (error) {
    toast.error(error.message);
  } else {
    toast.success('Post unsaved!')
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