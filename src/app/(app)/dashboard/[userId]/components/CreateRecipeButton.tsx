'use client';

import { useRouter } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/20/solid';

export default function CreateRecipeButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/create-recipe');
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-4 bg-stone-800 text-white font-semibold rounded-full hover:bg-stone-950 flex flex-row items-center gap-2"
    >
      <PlusCircleIcon className="w-5 h-5" /> Add Recipe
    </button>
  );
}
