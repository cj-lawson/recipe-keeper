'use client';

import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteRecipe } from '../../actions/index';

export default function RecipeActions({
  userId,
  recipeId,
}: {
  userId: string;
  recipeId: string;
}) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      await deleteRecipe(recipeId);
      window.location.href = `/my-recipes/${userId}`; // Redirect to user recipes after deletion
    }
  };

  return (
    <div className="flex items-center justify-center bg-white shadow-md border border-slate-200 rounded-full gap-6 fixed bottom-4 px-4 py-3 mx-auto max-w-[400px] left-2 right-2">
      <Link
        href={`/my-recipes/${userId}/edit/${recipeId}`}
        className="flex items-center gap-2 bg-[#F8F8F8] rounded-full px-3 py-3 text-gray-500 hover:text-gray-600 font-medium border border-slate-100 hover:border-slate-200 shadow-sm"
      >
        <PencilSquareIcon className="w-6 text-gray-500 hover:text-gray-600" />
        Edit Recipe
      </Link>
      <button
        onClick={handleDelete}
        className="flex items-center gap-2 bg-[#F8F8F8] rounded-full px-3 py-3 text-rose-500 hover:text-rose-600 font-medium border border-slate-100 hover:border-rose-200 shadow-sm"
      >
        <TrashIcon className="w-6 text-rose-500 hover:text-rose-600" />
        Delete Recipe
      </button>
    </div>
  );
}
