"use server";

import fs from 'fs';
import path from 'path';
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


  /***** Upload image helper ******/
 export async function uploadImageToPayload(mainImage: File | null): Promise<string | null>{
    if (!mainImage) {
      console.log('NO FILE PROVIDED FOR UPLOAD')
      return null;
    } else {
      console.log('FILE WAS PROVIDED FOR UPLOAD')
    }

    const payload = await getPayload({ config });


    const arrayBuffer = await mainImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadImage = await payload.create({
      collection: 'media',
      data: {
        alt: mainImage.name
      },
      file: {
        data: buffer,
        mimetype: mainImage.type,
        size: mainImage.size,
        name: mainImage.name,
      },
    });
    return uploadImage.id
  }



/***** Create a new recipe ******/
  export async function createRecipe(data: {
    title: string;
    description: string;
    cookTime: number;
    servings: number;
    isPublic: boolean;
    cuisine: "italian" | "mexican" | "chinese" | "japanese" | "indian" | "Asian" | "other";
    customCuisine?: string;
    ingredients: {
      amount: string;
      unit: "custom" | "cups" | "tbsp" | "tsp" | "grams" | "oz" | "lb" | "ml" | "l" | "pieces";
      customUnit?: string;
      ingredient: string;
    }[];
    directions: {
      stepNumber: number;
      instruction: string;
    }[];
    createdBy: string;
    mainImage?: File | null; 
  }) {
    const payload = await getPayload({ config });
  
    const {
      title,
      description,
      cookTime,
      servings,
      isPublic,
      cuisine,
      customCuisine,
      ingredients,
      directions,
      createdBy,
      mainImage,
    } = data;
  
    try {
      
      // Upload the image if provided
      const mainImageId = await uploadImageToPayload(mainImage || null);
    
      // Convert amount to a number
      const processedIngredients = ingredients.map((ingredient) => ({
        ...ingredient,
        amount: ingredient.amount ? Number(ingredient.amount) : null, // Convert to number or null
      }));
  
      // Create the new recipe
      const newRecipe = await payload.create({
        collection: "recipes",
        data: {
          title,
          description,
          cookTime,
          servings,
          isPublic,
          cuisine,
          customCuisine,
          ingredients: processedIngredients,
          directions,
          createdBy,
          mainImage: mainImageId, 
        },
      });
  
      // Retrieve the user's profile
      const userProfile = await payload.findByID({
        collection: "profiles",
        id: createdBy,
      });
  
      // Ensure the current array exists and add the new recipe ID
      const updatedCreatedRecipes = [
        ...(userProfile.createdRecipes || []),
        newRecipe.id,
      ];
  
      // Update the user's profile with the new recipe in `createdRecipes`
      await payload.update({
        collection: "profiles",
        id: createdBy, // Use the user's ID to locate the profile
        data: {
          createdRecipes: updatedCreatedRecipes, // Provide the full updated array
        },
      });
  
      return newRecipe;
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw new Error("Failed to create recipe.");
    }
  }