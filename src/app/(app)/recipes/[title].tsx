import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { notFound } from "next/navigation";
import Link from "next/link";

interface RecipeProps {
  params: {
    title: string;
  };
}

export default async function Recipe({ params }: RecipeProps) {
  const { title } = params;
  const payload = await getPayloadHMR({ config });

  const recipes = await payload.find({
    collection: "recipes",
    where: {
      title: {
        equals: title,
      },
    },
    depth: 2,
  });

  const recipe = recipes.docs[0];

  if (!recipe) {
    notFound();
  }

  return (
    <section className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      {/* {recipe.mainImage?.url && (
        <img src={recipe.mainImage.url} alt={recipe.title} className="mb-4" />
      )}
      <p className="mb-4">{recipe.description}</p>
      <div className="flex items-center gap-2 mb-8">
        {recipe.createdBy?.profilePhoto?.url && (
          <img
            src={recipe.createdBy.profilePhoto.url}
            alt={recipe.createdBy.first_name}
            className="rounded-full w-8 h-8"
          />
        )}
        <p className="text-sm text-gray-500">{recipe.source}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc ml-5 mb-6">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing.ingredient}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Directions</h2>
      <ol className="list-decimal ml-5">
        {recipe.directions.map((step, i) => (
          <li key={i} className="mb-2">
            {step.instruction}
          </li>
        ))}
      </ol> */}
    </section>
  );
}
