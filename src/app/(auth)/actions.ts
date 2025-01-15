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
  redirect(`/dashboard/${userId}`);
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

  const { error, data: session } = await supabase.auth.signUp(data);

  if (session?.user) {
    const userId = session.user.id;
    redirect(`/dashboard/${userId}`);
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

// Reset Email
export async function sendResetPasswordEmail(prev: any, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
  };

  const { error, data: session } = await supabase.auth.resetPasswordForEmail(
    data.email,
    {
      redirectTo: "https://www.biteclub.com.co/reset-password",
    },
  );

  if (error) {
    console.log("error", error);

    return {
      success: "",
      error: error.message,
    };
  }

  return {
    success: `We sent a password reset link to ${data.email}`,
    error: "",
  };
}

// update password
export async function updatePassword(prev: any, formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: formData.get("password") as string,
  });

  if (error) {
    console.log("error", error);

    return {
      success: "",
      error: error.message,
    };
  }

  return {
    success: "password updated",
    error: "",
  };
}
