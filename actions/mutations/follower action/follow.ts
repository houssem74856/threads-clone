'use server'

import { supabaseServer } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { createNotification } from "../notification actions/createNotification";

export const follow = async ({currentUser, user}: any) => {
  const db = await supabaseServer()
  await db
    .from("followers")
    .insert({
      follower: currentUser,
      following: user,
    });

  await createNotification({currentUser, user, type: "follow"})

  revalidatePath('/profile')
} 