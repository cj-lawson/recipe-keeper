import React, { useState } from 'react';

export function IngredientsFieldset({
  ingredients,
  setIngredients,
}: {
  ingredients: {
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
  }[];
  setIngredients: React.Dispatch<
    React.SetStateAction<
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
    >
  >;
}) {
  const handleIngredientChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredients(updatedIngredients);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Ingredients
      </label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-4 mt-2">
          <input
            type="number"
            placeholder="Amount"
            value={ingredient.amount}
            onChange={(e) =>
              handleIngredientChange(index, 'amount', e.target.value)
            }
            className="w-1/4 px-2 py-1 border border-gray-300 rounded"
          />
          <select
            value={ingredient.unit}
            onChange={(e) =>
              handleIngredientChange(index, 'unit', e.target.value)
            }
            className="w-1/4 px-2 py-1 border border-gray-300 rounded"
          >
            <option value="custom">Custom</option>
            <option value="cups">Cups</option>
            <option value="tbsp">Tablespoons</option>
            <option value="tsp">Teaspoons</option>
            <option value="grams">Grams</option>
            <option value="oz">Ounces</option>
            <option value="lb">Pounds</option>
            <option value="ml">Milliliters</option>
            <option value="l">Liters</option>
            <option value="pieces">Pieces</option>
          </select>
          {ingredient.unit === 'custom' && (
            <input
              type="text"
              placeholder="Custom Unit"
              value={ingredient.customUnit}
              onChange={(e) =>
                handleIngredientChange(index, 'customUnit', e.target.value)
              }
              className="w-1/4 px-2 py-1 border border-gray-300 rounded"
            />
          )}
          <input
            type="text"
            placeholder="Ingredient"
            value={ingredient.ingredient}
            onChange={(e) =>
              handleIngredientChange(index, 'ingredient', e.target.value)
            }
            className="w-1/2 px-2 py-1 border border-gray-300 rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setIngredients([
            ...ingredients,
            { amount: '', unit: 'custom', customUnit: '', ingredient: '' },
          ])
        }
        className="mt-2 text-indigo-600 hover:underline"
      >
        Add Ingredient
      </button>
    </div>
  );
}
