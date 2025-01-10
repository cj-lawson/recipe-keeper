'use client';

import { useState } from 'react';

// Hooks
import { useIngredients } from '../_hooks/useIngredients';
import { useDirections } from '../_hooks/useDirections';

// utils
import { submitRecipe } from '../../../../../utils/submitRecipe';

// components
import { ImageUploadField } from './ImageUploadField';
import { IngredientsFieldset } from './IngredientsFieldset';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';
import { SelectField } from './SelectField';
import { DirectionsField } from './DirectionsField';
import { CheckboxField } from './CheckboxField';
import { CustomCuisineField } from './CustomCuisineField';

export default function CreateRecipeForm({ userId }: { userId: string }) {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    mainImage: null as File | null,
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

  const { ingredients, setIngredients } = useIngredients();
  const { directions, setDirections } = useDirections();

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, mainImage: file };
      console.log(updatedFormData); // Log the updated state
      return updatedFormData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      await submitRecipe({ formData, ingredients, directions, userId });
      alert('Recipe created successfully!');
      setFormData({
        mainImage: null as File | null,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ImageUploadField
        label="Cover Photo"
        id="mainImage"
        onChange={handleImageChange}
      />
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
      <SelectField
        label="Cuisine (optional)"
        id="cuisine"
        value={formData.cuisine}
        options={[
          { label: 'Select Cuisine', value: '' },
          { label: 'Italian', value: 'italian' },
          { label: 'Mexican', value: 'mexican' },
          { label: 'Chinese', value: 'chinese' },
          { label: 'Japanese', value: 'japanese' },
          { label: 'Indian', value: 'indian' },
          { label: 'Asian', value: 'Asian' },
          { label: 'Other', value: 'other' },
        ]}
        onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
      />
      <CustomCuisineField
        show={formData.cuisine === 'other'}
        value={formData.customCuisine}
        onChange={(e) =>
          setFormData({ ...formData, customCuisine: e.target.value })
        }
      />
      <IngredientsFieldset
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <DirectionsField directions={directions} setDirections={setDirections} />
      <CheckboxField
        label="Make Public"
        id="make-public"
        checked={formData.isPublic}
        onChange={(checked) => setFormData({ ...formData, isPublic: checked })}
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
      >
        {isPending ? 'Submitting...' : 'Create Recipe'}
      </button>
    </form>
  );
}
