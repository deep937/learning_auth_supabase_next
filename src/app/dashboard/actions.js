"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  console.log("Logging out");
  //Step 1 - create the supabase client
  const supabase = await createClient();
  //Step 2 - sign out the user
  await supabase.auth.signOut();
  //Step 3 - redirect to the login page
  redirect("/login");
}

export async function addNote(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const title = String(formData?.get?.('title') ?? '').trim()
  if (!title) throw new Error('Title is required provide one')

  await supabase.from('notes').insert({
    title,
    user_id: user.id,
  })
}