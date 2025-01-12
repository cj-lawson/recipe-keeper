import { getPayload } from 'payload';
import config from '@payload-config';

import EditRecipeForm from './EditRecipeForm';

export default async function EditRecipePage({
  params,
}: {
  params: { userId: string; recipeId: string };
}) {
  const { recipeId } = await params;
  const { userId } = await params;

  const payload = await getPayload({ config });

  // Fetch the recipe details
  const recipe = await payload.findByID({
    collection: 'recipes',
    id: recipeId,
  });

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold">Edit Recipe</h1>
      <EditRecipeForm recipe={recipe} userId={userId} recipeId={recipeId} />
    </div>
  );
}
