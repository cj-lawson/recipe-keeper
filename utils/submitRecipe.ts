// utils/submitRecipe.ts
import { createRecipe } from "../src/app/(app)/actions/index";

export async function submitRecipe({
  formData,
  ingredients,
  directions,
  userId,
}: {
  formData: {
    mainImage: File | null;
    title: string;
    description: string;
    cookTime: string;
    servings: string;
    isPublic: boolean;
    cuisine: string;
    customCuisine: string;
  };
  ingredients: any[];
  directions: {
    instruction: string;
  }[];
  userId: string;
}) {
  // Pass the raw File object to `createRecipe`
  console.log('From submitRecipe Util')
  console.log(formData.mainImage)
  await createRecipe({
    title: formData.title,
    description: formData.description,
    cookTime: Number(formData.cookTime),
    servings: Number(formData.servings),
    isPublic: formData.isPublic,
    cuisine: formData.cuisine as
      | "italian"
      | "mexican"
      | "chinese"
      | "japanese"
      | "indian"
      | "Asian"
      | "other",
    customCuisine: formData.customCuisine,
    ingredients,
    directions: directions.map((direction, index) => ({
      stepNumber: index + 1,
      instruction: direction.instruction,
    })),
    createdBy: userId,
    mainImage: formData.mainImage, // Pass the File object directly
  });
}

