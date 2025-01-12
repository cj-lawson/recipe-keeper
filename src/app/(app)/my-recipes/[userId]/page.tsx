import { redirect } from 'next/navigation';
import { createClient } from '../../../../../utils/supabase/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import MyRecipesDashboard from './components/MyRecipesDashboard';
import type { Recipe } from '../../../../payload-types';

type Params = Promise<{ userId: string }>;

export default async function MyRecipesPage({ params }: { params: Params }) {
  const { userId } = await params;

  // Ensure Supabase client is created
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  // Check if the user is logged in and matches the userId
  if (!data?.session || !data.session.user || data.session.user.id !== userId) {
    redirect('/login');
    return null;
  }

  const payload = await getPayload({ config });

  // Fetch user profile
  const profile = await payload.find({
    collection: 'profiles',
    where: { id: { equals: userId } },
    depth: 2,
  });

  if (!profile.docs.length) {
    redirect('/login');
    return null;
  }

  const savedRecipes = (profile.docs[0].savedRecipes as Recipe[]) || [];
  const createdRecipes = (profile.docs[0].createdRecipes as Recipe[]) || [];

  return (
    <MyRecipesDashboard
      savedRecipes={savedRecipes}
      createdRecipes={createdRecipes}
    />
  );
}
