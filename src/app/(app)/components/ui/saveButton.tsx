"use client";

import { useState, useTransition } from "react";
import { BookmarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { saveRecipe } from "../../actions/index";

export default function SaveButton({
  recipeId,
  userId,
  initialIsSaved = false,
}: {
  recipeId: string;
  userId: string | null;
  initialIsSaved?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const handleSave = async () => {
    if (!userId) {
      alert("You must be logged in to save recipes.");
      return;
    }

    if (isSaved) {
      console.log("Recipe is already saved.");
      return; // Prevent duplicate saves
    }

    startTransition(async () => {
      try {
        await saveRecipe({ recipeId });
        setIsSaved(true); // Update state to reflect saved status
      } catch (error) {
        console.error("Failed to save recipe:", error);
        alert("Failed to save the recipe. Please try again.");
      }
    });
  };

  return (
    <button
      onClick={handleSave}
      disabled={isPending || isSaved} // Disable button if saving or already saved
      className="px-3 py-1.5 bg-gray-800 text-white rounded-full flex items-center gap-2"
    >
      {isSaved ? (
        <CheckIcon className="w-5 text-green-500" /> // Show CheckIcon if saved
      ) : (
        <BookmarkIcon className="w-5" /> // Show BookmarkIcon otherwise
      )}
      {isPending ? "Saving..." : isSaved ? "Saved" : "Save"}
    </button>
  );
}
