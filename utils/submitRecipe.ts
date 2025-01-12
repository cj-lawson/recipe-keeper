import { createRecipe, updateRecipe } from "../src/app/(app)/actions/index";

export async function submitRecipe({
  formData,
  ingredients,
  directions,
  userId,
  recipeId, // Optional for distinguishing between create and edit
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
  recipeId?: string; // Add this field to determine if editing
}) {
  const payload = {
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
  };

  if (recipeId) {
    // Edit an existing recipe
    console.log("Editing Recipe:", recipeId);
    await updateRecipe({ recipeId, data: payload });
  } else {
    // Create a new recipe
    console.log("Creating New Recipe");
    await createRecipe(payload);
  }
}
