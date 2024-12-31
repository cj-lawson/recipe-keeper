import { redirect } from 'next/navigation';
import { createClient } from '../../../../../../utils/supabase/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import MyRecipesDashboard from './components/MyRecipesDashboard';
import type { Recipe } from '../../../../../payload-types';

export default async function MyRecipesPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (!data?.session || !data.session.user || data.session.user.id !== userId) {
    redirect('/login');
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
