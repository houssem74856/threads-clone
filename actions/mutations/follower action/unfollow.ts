'use server'

import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";

export const unfollow = async ({currentUser, user}: any) => {
  const db = await supabaseServer()
  await db
  .from("followers")
  .delete()
    .eq("follower", currentUser)
    .eq("following", user);

  revalidatePath('/profile')
} 