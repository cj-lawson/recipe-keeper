// utils/submitRecipe.ts
import { createRecipe } from "../src/app/(app)/actions/index";

export async function submitRecipe({
  formData,
  ingredients,
  directions,
  userId,
}: {
  formData: any;
  ingredients: any[];
  directions: any[];
  userId: string;
}) {
  const cuisineValue = formData.cuisine as
    | "italian"
    | "mexican"
    | "chinese"
    | "japanese"
    | "indian"
    | "Asian"
    | "other";

  await createRecipe({
    ...formData,
    cuisine: cuisineValue,
    cookTime: Number(formData.cookTime),
    servings: Number(formData.servings),
    ingredients,
    directions: directions.map((direction, index) => ({
      ...direction,
      stepNumber: index + 1,
    })),
    createdBy: userId,
  });
}
