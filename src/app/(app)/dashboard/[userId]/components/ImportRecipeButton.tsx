'use client';

import React, { useState, Fragment } from 'react';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { GlobeAltIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export default function ImportRecipeButton() {
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  let [isOpen, setIsOpen] = useState(false);

  const handleImportClick = async () => {
    // Prompt user for recipe URL
    const recipeUrl = window.prompt('Paste the recipe URL here:');
    if (!recipeUrl) return; // If the user cancels or leaves it blank, do nothing

    setLoading(true);
    setRecipe(null);

    try {
      // Call API route to parse the recipe
      const res = await fetch('/api/import-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: recipeUrl }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // Store the parsed recipe in state
      setRecipe(data.recipe);
    } catch (error: any) {
      alert(`Error importing recipe: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-stone-800 text-white px-5 py-3 rounded-full"
      >
        Add Recipe
      </button>

      {/* Transition Wrapper */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          {/* Overlay */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </TransitionChild>

          {/* Sliding Up Modal */}
          <div className="fixed inset-0 flex items-end justify-center">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-y-full opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-full opacity-0"
            >
              <DialogPanel className="w-full max-w-lg bg-white rounded-t-2xl p-10 shadow-lg">
                <DialogTitle className="font-bold text-center text-lg mb-12">
                  Add New Recipe
                </DialogTitle>

                <div className="flex gap-4 mt-6 mb-4">
                  <button
                    onClick={handleImportClick}
                    disabled={loading}
                    className="w-full bg-green-100 text-green-700 px-5 py-3 rounded-md flex flex-col items-center"
                  >
                    <PencilSquareIcon className="w-8" />
                    {loading ? 'Importing...' : 'Create Recipe'}
                  </button>
                  <button
                    onClick={handleImportClick}
                    disabled={loading}
                    className="w-full bg-green-100 text-green-700 px-5 py-3 rounded-md flex flex-col items-center"
                  >
                    <GlobeAltIcon className="w-8" />
                    {loading ? 'Importing...' : 'Import from Website'}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
