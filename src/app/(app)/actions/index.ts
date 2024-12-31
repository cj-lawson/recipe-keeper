"use server";

import { getPayload } from "payload";
import config from "@payload-config";

import { createClient } from "../../../../utils/supabase/server";

/***** Save a recipe to a user's profile ******/
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
  

/***** Create a new recipe ******/
  export async function createRecipe(data: {
    title: string;
    description: string;
    cookTime: number;
    servings: number;
    userId: string;
  }) {
    const payload = await getPayload({ config });
  
    const { title, description, cookTime, servings, userId } = data;
  
    if (!title || !description || !cookTime || !servings || !userId) {
      throw new Error("Missing required fields.");
    }
  
    try {
      const newRecipe = await payload.create({
        collection: "recipes",
        data: {
          title,
          description,
          cookTime,
          servings,
          createdBy: userId,
          directions: []
        },
      });
  
      return newRecipe;
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw new Error("Failed to create recipe.");
    }
  }