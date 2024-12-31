"use client";

import { useTransition } from "react";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { saveRecipe } from "../../actions/index";

export default function SaveButton({
  recipeId,
  userId,
}: {
  recipeId: string;
  userId: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSave = async () => {
    if (!userId) {
      alert("You must be logged in to save recipes.");
      return;
    }

    startTransition(async () => {
      try {
        await saveRecipe({ recipeId });
        alert("Recipe saved successfully!");
      } catch (error) {
        console.error("Failed to save recipe:", error);
        alert("Failed to save the recipe. Please try again.");
      }
    });
  };

  return (
    <button
      onClick={handleSave}
      disabled={isPending}
      className="px-3 py-1.5 bg-gray-800 text-white rounded-full flex items-center gap-2"
    >
      <BookmarkIcon className="w-5" /> {isPending ? "Saving..." : "Save"}
    </button>
  );
}
