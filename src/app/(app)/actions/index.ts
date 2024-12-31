"use server";

import { getPayload } from "payload";
import config from "@payload-config";

import { createClient } from "../../../../utils/supabase/server";

// Save a recipe to a user's profile
export async function saveRecipe({ recipeId }: { recipeId: string }) {
    const supabase = createClient();
  
    const { data: { user } } = await (await supabase).auth.getUser();
  
    if (!user) {
      throw new Error("User must be logged in to save a recipe.");
    }
  
    const userId = user.id;
    const payload = await getPayload({ config });

  
    // Find the user's profile
    const profile = await payload.find({
      collection: "profiles",
      where: { id: { equals: userId } },
    });
  
    if (!profile.docs.length) {
      throw new Error("Profile not found. Please log in or create an account.");
    }
  
    const existingProfile = profile.docs[0];
    const savedRecipes = Array.isArray(existingProfile.savedRecipes)
    ? existingProfile.savedRecipes
    : [];
      
    // Avoid duplicates
    if (savedRecipes.includes(recipeId)) {
      console.log("Duplicate recipe detected:", recipeId);
      throw new Error("Recipe is already saved.");
    } 
  
     // Add the recipe to savedRecipes
  console.log("Saving recipe:", recipeId);
  await payload.update({
    collection: "profiles",
    id: existingProfile.id,
    data: {
      savedRecipes: [...savedRecipes, recipeId],
    },
  });
  }
  