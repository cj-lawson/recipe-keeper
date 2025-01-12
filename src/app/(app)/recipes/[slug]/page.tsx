import config from '@payload-config';
import { getPayload } from 'payload';
import { notFound } from 'next/navigation';
import { createClient } from '../../../../../utils/supabase/server';
import type { Recipe } from '../../../../payload-types';
import {
  UserIcon,
  ClockIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import SaveButton from '../../components/ui/saveButton';
import Link from 'next/link';
import DeleteRecipeAction from './DeleteRecipeAction';

type Params = Promise<{ slug: string[] }>;

export default async function Recipe({ params }: { params: Params }) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const recipes = await payload.find({
    collection: 'recipes',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
  });

  const recipe = recipes.docs[0] as Recipe;

  if (!recipe) {
    notFound();
  }

  // Check if user is logged in (server-side)
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();
  const userId = (user?.id as string) || null;

  let isSaved = false;

  if (userId) {
    const profile = await payload.find({
      collection: 'profiles',
      where: { id: { equals: userId } },
    });

    const existingProfile = profile.docs[0];

    // Ensure savedRecipes is an array of IDs
    const savedRecipes = Array.isArray(existingProfile.savedRecipes)
      ? existingProfile.savedRecipes
      : [];

    isSaved = savedRecipes.includes(recipe.id); // Check if recipe ID is saved
  }

  return (
    <>
      <div className="min-h-screen min-w-screen-lg px-3 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {/* Edit bar */}
          {typeof recipe.createdBy !== 'string' &&
            user?.id === recipe.createdBy?.id && (
              <div className="z-50 flex items-center justify-center bg-white shadow-md border border-slate-200 rounded-full gap-6 fixed bottom-4 px-4 py-3 mx-auto max-w-[400px] left-2 right-2">
                <Link
                  href={`/my-recipes/${user?.id}/edit/${recipe.id}`}
                  className="flex items-center gap-2 bg-[#F8F8F8] rounded-full px-3 py-3 text-gray-500 hover:text-gray-600 font-medium border border-slate-100 hover:border-slate-200 shadow-sm"
                >
                  <PencilSquareIcon className="w-6 text-gray-500 hover:text-gray-600" />
                  Edit Recipe
                </Link>
                <DeleteRecipeAction userId={user.id} recipeId={recipe.id} />
              </div>
            )}
          <section className="w-full flex flex-col pt-4 gap-12 ml-auto mr-auto max-w-[760px]">
            <div className="basis-1/2 space-y-8 my-auto">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-normal">
                  {recipe.title}
                </h1>
                <ul className="list-none mb-6 flex gap-4">
                  {recipe.tags?.map((tag) => (
                    <li
                      key={tag.id}
                      className="bg-[#f1f6d1] px-3 py-1 rounded-full text-sm text-[#7f9c30] font-semibold"
                    >
                      {tag.tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative w-full">
              {recipe.mainImage &&
                typeof recipe.mainImage !== 'string' &&
                recipe.mainImage.url && (
                  <img
                    src={recipe.mainImage.url}
                    alt={recipe.title}
                    className="mb-4 rounded-md object-cover max-h-[428px] w-full"
                  />
                )}
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2 mb-8">
                {recipe.createdBy &&
                  typeof recipe.createdBy !== 'string' &&
                  recipe.createdBy.profilePhoto &&
                  typeof recipe.createdBy.profilePhoto !== 'string' &&
                  recipe.createdBy.profilePhoto.url && (
                    <>
                      <img
                        src={recipe.createdBy.profilePhoto.url}
                        alt={recipe.createdBy.first_name ?? 'Profile Photo'}
                        className="rounded-full w-9 h-9"
                      />
                      <p className="pointer-events-none block text-sm font-medium text-gray-500">
                        {recipe.createdBy.first_name}{' '}
                        {recipe.createdBy.last_name}
                      </p>
                    </>
                  )}
              </div>
              <div>
                <SaveButton
                  recipeId={recipe.id}
                  userId={userId}
                  initialIsSaved={isSaved}
                />
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-[760px] w-full">
            <div className="md:flex md:flex-col md:justify-between gap-12">
              <div className="md:basis-1/2">
                <h2 className="text-xl font-semibold mb-2">Chef's notes</h2>
                <p>{recipe.description}</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <div className="flex gap-1">
                  <ClockIcon className="w-4 text-[#132a13] opacity-70" />
                  {recipe.cookTime} minutes
                </div>
                <div className="flex gap-2">
                  <UserIcon className="w-4 text-[#132a13] opacity-70" />
                  {recipe.servings} servings
                </div>
              </div>
              <div className="md:basis-1/2">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-none mb-6 space-y-8">
                  {recipe.ingredients?.map((ing, i) => (
                    <li key={i} className="flex justify-between">
                      <div className="basis-1/2">{ing.ingredient}</div>
                      <div className="text-sm flex gap-1">
                        <p>{ing.amount}</p>
                        <p>{ing.unit}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:basis-1/2 mb-12">
                <h2 className="text-xl font-semibold mb-2">Directions</h2>
                <ol className="space-y-6">
                  {recipe.directions.map((step, i) => (
                    <li
                      key={i}
                      className="mb-2 bg-[#FDFDFD] border border-gray-200 rounded-md py-8 px-6"
                    >
                      {step.instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
