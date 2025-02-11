import { create } from "domain";
import { buildPayloadRecipeData, extractRecipeFromURL } from "./recipeParser";
import { createRecipe } from "@/app/(app)/actions";

export async function scrapeAndCreateRecipe(url: string, userId: string) {
    // 1) Scrape
    const extracted = await extractRecipeFromURL(url);
    if (!extracted) {
        throw new Error("No recipe data found in JSON-LD");
    }

    // 2) Transform
    const payloadRecipe = buildPayloadRecipeData(extracted, userId);

    // 3) Create
    const newRecipe = await createRecipe(payloadRecipe);

    return newRecipe;
}
