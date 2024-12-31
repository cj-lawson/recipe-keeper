'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../../utils/supabase/server'


// Login
export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: session } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }
  const userId = session.user.id

  // if (session?.user) {
  //   const userId = session.user.id
  //   redirect(`/profile/${userId}`)
  // } else {
  //   redirect('/error')
  // }

  revalidatePath('/', 'layout')
  redirect(`/profile/${userId}/my-recipes`)
}


// Signup
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: session } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  if (session?.user) {
    const userId = session.user.id
    redirect(`/profile/${userId}/my-recipes`)
  } else {
    redirect('/error')
  }
  
  // revalidatePath('/', 'layout')
  // redirect('/')
}


export async function signOut() {
  const supabase = createClient();
  (await supabase).auth.signOut();
  redirect('/login')
}