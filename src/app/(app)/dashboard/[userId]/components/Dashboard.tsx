'use client';

import { useState } from 'react';
import Tabs from './Tabs';
import RecipeCard from './RecipeCard';
import type { Recipe } from '../../../../../payload-types';

export default function MyRecipesDashboard({
  createdRecipes,
  savedRecipes,
}: {
  createdRecipes: Recipe[];
  savedRecipes: Recipe[];
}) {
  // Combine saved and created recipes for "My Recipes" tab
  const combinedRecipes = Array.from(
    new Map(
      [...createdRecipes, ...savedRecipes].map((recipe) => [recipe.id, recipe]),
    ).values(),
  );

  const tabs = [
    { name: 'All Recipes', key: 'all', recipes: combinedRecipes },
    { name: 'Saved Recipes', key: 'saved', recipes: savedRecipes },
    { name: 'Created Recipes', key: 'created', recipes: createdRecipes },
  ];

  const [activeTab, setActiveTab] = useState('all'); // Default to "My Recipes"

  // Add fallback in case `find` does not match a tab
  const currentTab = tabs.find((tab) => tab.key === activeTab) || tabs[0]; // Default to the first tab

  return (
    <div className="min-h-screen pb-20 pt-16 max-w-screen-lg mx-auto font-[family-name:var(--font-geist-sans)]">
      {/* Tabs Navigation */}
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Recipe List or Empty State */}
      <div className="grid grid-cols-3 gap-x-8 mt-8 gap-y-16">
        {currentTab.recipes.length > 0 ? (
          currentTab.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No recipes found in &quot;{currentTab.name}&quot;</p>
            {currentTab.key === 'created' && (
              <p>
                <a
                  href="/create-recipe"
                  className="text-indigo-600 hover:underline"
                >
                  Click here
                </a>{' '}
                to create your first recipe!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
