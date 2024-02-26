import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface Params {
  user_id: string,
  post_id: string
}

export const savePost = async ({user_id, post_id}: Params) => {
  const { error } = await supabase
    .from('saved_posts')
    .insert({
      user_id,
      post_id,
    });

  if (error) {
    toast.error(error.message);
  } else {
    toast.success('Post saved!')
  }
};