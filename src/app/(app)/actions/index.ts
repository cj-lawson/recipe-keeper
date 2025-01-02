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
    isPublic: boolean;
    cuisine: "italian" | "mexican" | "chinese" | "japanese" | "indian" | "Asian" | "other";
    customCuisine?: string;
    ingredients: {
      amount: string; // Received as string
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
      // Handle file upload if `mainImage` is provided
      let mainImageId: string | null = null;
      if (mainImage) {
        const formData = new FormData();
        formData.append("file", mainImage);
  
        // Use Payload's REST API to upload the file
        const response = await fetch(`${process.env.PAYLOAD_API_URL}/media`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`, // Ensure you have an API key
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
  
        const uploadedImage = await response.json();
        mainImageId = uploadedImage.id;
      }
  
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