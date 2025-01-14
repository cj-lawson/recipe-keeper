"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";

import { createClient } from "../../../utils/supabase/server";
import { signUpSchema } from "../../../utils/zodSchemas";

// Login
export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: session } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }
  const userId = session.user.id;

  revalidatePath("/", "layout");
  redirect(`/my-recipes/${userId}`);
}

// Signup
export async function signup(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  const submission = parseWithZod(formData, {
    schema: signUpSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // if (!data.email || !data.password) {
  //   redirect("/error?message=Email and password are required");
  // }

  const { error, data: session } = await supabase.auth.signUp(data);

  // if (error) {
  //   redirect(`/error?message=${encodeURIComponent(error.message)}`);
  // }

  if (session?.user) {
    const userId = session.user.id;
    redirect(`/my-recipes/${userId}`);
  } else {
    redirect("/error?message=an uknown error has occured");
  }
}

// Sign out
export async function signOut() {
  const supabase = createClient();
  (await supabase).auth.signOut();
  redirect("/login");
}
