'use client';

import { useRouter } from 'next/navigation';

export default function CreateRecipeButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/create-recipe');
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
    >
      + Create Recipe
    </button>
  );
}
