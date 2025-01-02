'use client';

import Link from 'next/link';
import { ClockIcon } from '@heroicons/react/24/outline';
import type { Recipe } from '../../../../../payload-types';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="relative group">
      <Link href={`/recipes/${recipe.slug}`}>
        <div className="overflow-hidden rounded-lg bg-gray-100">
          {recipe.mainImage &&
            typeof recipe.mainImage !== 'string' &&
            recipe.mainImage.url && (
              <img
                alt={recipe.title}
                src={recipe.mainImage.url}
                className="aspect-[10/7] object-cover group-hover:opacity-75"
              />
            )}
        </div>
        <div className="mt-2">
          <p className="truncate text-md font-medium">{recipe.title}</p>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 text-gray-500" />
            <p className="text-sm text-gray-500">{recipe.cookTime} minutes</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
