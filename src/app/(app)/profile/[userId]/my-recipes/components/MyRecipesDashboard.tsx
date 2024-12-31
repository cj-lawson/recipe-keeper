'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClockIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import type { Recipe } from '../../../../../../payload-types';

export default function MyRecipesDashboard({
  createdRecipes,
  savedRecipes,
}: {
  createdRecipes: Recipe[];
  savedRecipes: Recipe[];
}) {
  const tabs = [
    { name: 'My Recipes', key: 'created', recipes: createdRecipes },
    { name: 'Saved Recipes', key: 'saved', recipes: savedRecipes },
  ];

  const [activeTab, setActiveTab] = useState('created');

  const currentTab = tabs.find((tab) => tab.key === activeTab);

  return (
    <div className="min-h-screen px-3 pb-20 gap-16">
      <div className="flex flex-col gap-16 items-center sm:items-start">
        {/* Tabs */}
        <section className="w-full flex flex-col pt-4 gap-8 ml-auto mr-auto max-w-[760px]">
          <div>
            {/* Mobile Dropdown */}
            <div className="grid grid-cols-1 sm:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 border border-gray-300 focus:border-indigo-600"
              >
                {tabs.map((tab) => (
                  <option key={tab.key} value={tab.key}>
                    {tab.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500" />
            </div>

            {/* Desktop Tabs */}
            <div className="hidden sm:block">
              <nav aria-label="Tabs" className="flex space-x-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.key
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {/* Recipe List */}
        <section className="w-full flex flex-col pt-4 gap-8 ml-auto mr-auto max-w-[760px]">
          {currentTab?.recipes.length ? (
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
            >
              {currentTab.recipes.map((recipe) => (
                <li key={recipe.id} className="relative">
                  <Link href={`/recipes/${recipe.slug}`}>
                    <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
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
                      <p className="truncate text-md font-medium text-gray-900">
                        {recipe.title}
                      </p>
                      <div className="flex gap-1 items-center">
                        <ClockIcon className="w-4 text-[#132a13] opacity-70" />
                        <p className="text-sm opacity-70">
                          {recipe.cookTime} minutes
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500">
              No recipes found for {currentTab?.name}.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
