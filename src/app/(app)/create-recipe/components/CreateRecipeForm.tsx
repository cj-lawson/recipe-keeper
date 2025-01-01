'use client';

import { useState } from 'react';
import { createRecipe } from '../../actions/index';

// components
import { IngredientsFieldset } from './IngredientsFieldset';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';

export default function CreateRecipeForm({ userId }: { userId: string }) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookTime: '',
    servings: '',
    isPublic: false,
    cuisine: '',
    customCuisine: '',
    ingredients: [],
    directions: [],
  });

  const [ingredients, setIngredients] = useState<
    {
      amount: string;
      unit:
        | 'custom'
        | 'cups'
        | 'tbsp'
        | 'tsp'
        | 'grams'
        | 'oz'
        | 'lb'
        | 'ml'
        | 'l'
        | 'pieces';
      customUnit?: string;
      ingredient: string;
    }[]
  >([{ amount: '', unit: 'cups', customUnit: '', ingredient: '' }]);
  const [directions, setDirections] = useState([{ instruction: '' }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      // Ensure `cuisine` is typed correctly
      const cuisineValue = formData.cuisine as
        | 'italian'
        | 'mexican'
        | 'chinese'
        | 'japanese'
        | 'indian'
        | 'Asian'
        | 'other';

      await createRecipe({
        ...formData,
        cuisine: cuisineValue, // Pass the validated value
        cookTime: Number(formData.cookTime),
        servings: Number(formData.servings),
        ingredients,
        directions: directions.map((direction, index) => ({
          ...direction,
          stepNumber: index + 1,
        })),
        createdBy: userId,
      });
      alert('Recipe created successfully!');
      setFormData({
        title: '',
        description: '',
        cookTime: '',
        servings: '',
        isPublic: false,
        cuisine: '',
        customCuisine: '',
        ingredients: [],
        directions: [],
      });
      setIngredients([
        { amount: '', unit: 'custom', customUnit: '', ingredient: '' },
      ]);
      setDirections([{ instruction: '' }]);
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create the recipe. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  const handleIngredientChange = (
    index: number,
    field: keyof (typeof ingredients)[number],
    value: string,
  ) => {
    const updatedIngredients = [...ingredients];

    if (field === 'unit') {
      // Cast value to the correct type for `unit`
      updatedIngredients[index][field] = value as
        | 'custom'
        | 'cups'
        | 'tbsp'
        | 'tsp'
        | 'grams'
        | 'oz'
        | 'lb'
        | 'ml'
        | 'l'
        | 'pieces';
    } else {
      updatedIngredients[index][field] = value;
    }

    setIngredients(updatedIngredients);
  };

  const handleDirectionChange = (index: number, value: string) => {
    const updatedDirections = [...directions];
    updatedDirections[index].instruction = value;
    setDirections(updatedDirections);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Recipe Title"
        id="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <TextareaField
        label="Description"
        id="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <InputField
        label="Cook Time (minutes)"
        id="cookTime"
        type="number"
        value={formData.cookTime}
        onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
      />
      <InputField
        label="Servings"
        id="servings"
        type="number"
        value={formData.servings}
        onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cuisine
        </label>
        <select
          value={formData.cuisine}
          onChange={(e) =>
            setFormData({ ...formData, cuisine: e.target.value })
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Cuisine</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="chinese">Chinese</option>
          <option value="japanese">Japanese</option>
          <option value="indian">Indian</option>
          <option value="Asian">Asian</option>
          <option value="other">Other</option>
        </select>

        {formData.cuisine === 'other' && (
          <div className="mt-4">
            <label
              htmlFor="customCuisine"
              className="block text-sm font-medium text-gray-700"
            >
              Custom Cuisine
            </label>
            <input
              type="text"
              id="customCuisine"
              value={formData.customCuisine}
              onChange={(e) =>
                setFormData({ ...formData, customCuisine: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}
      </div>
      {/* Ingredient field */}
      <IngredientsFieldset
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Directions
        </label>
        {directions.map((direction, index) => (
          <div key={index} className="flex gap-4 mt-2">
            <textarea
              placeholder={`Step ${index + 1}`}
              value={direction.instruction}
              onChange={(e) => handleDirectionChange(index, e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setDirections([...directions, { instruction: '' }])}
          className="mt-2 text-indigo-600 hover:underline"
        >
          Add Step
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Make Public
        </label>
        <input
          type="checkbox"
          checked={formData.isPublic}
          onChange={(e) =>
            setFormData({ ...formData, isPublic: e.target.checked })
          }
          className="mt-1"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        {isPending ? 'Submitting...' : 'Create Recipe'}
      </button>
    </form>
  );
}
