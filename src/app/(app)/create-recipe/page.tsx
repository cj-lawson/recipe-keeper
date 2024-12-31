import { redirect } from 'next/navigation';
import { createClient } from '../../../../utils/supabase/server';

export default async function CreateRecipePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    redirect('/login'); // Redirect to login if not authenticated
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a Recipe</h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="cookTime"
            className="block text-sm font-medium text-gray-700"
          >
            Cook Time (minutes)
          </label>
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="servings"
            className="block text-sm font-medium text-gray-700"
          >
            Servings
          </label>
          <input
            type="number"
            id="servings"
            name="servings"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}
