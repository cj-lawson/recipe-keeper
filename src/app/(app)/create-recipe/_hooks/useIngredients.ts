import { useState } from "react";

export function useIngredients(recipe: { ingredients?: any[] }) {
  const [ingredients, setIngredients] = useState<
    {
      amount: string;
      unit:
        | "custom"
        | "cups"
        | "tbsp"
        | "tsp"
        | "grams"
        | "oz"
        | "lb"
        | "ml"
        | "l"
        | "pieces";
      customUnit?: string;
      ingredient: string;
    }[]
  >(() =>
    recipe.ingredients && recipe.ingredients.length > 0
      ? recipe.ingredients
      : [{ amount: "", unit: "cups", customUnit: "", ingredient: "" }]
  );

  const handleIngredientChange = (
    index: number,
    field: "amount" | "unit" | "customUnit" | "ingredient",
    value: string,
  ) => {
    const updatedIngredients = [...ingredients];

    if (field === "unit") {
      updatedIngredients[index][field] = value as
        | "custom"
        | "cups"
        | "tbsp"
        | "tsp"
        | "grams"
        | "oz"
        | "lb"
        | "ml"
        | "l"
        | "pieces";
    } else {
      updatedIngredients[index][field] = value;
    }

    setIngredients(updatedIngredients);
  };

  return { ingredients, setIngredients, handleIngredientChange };
}
