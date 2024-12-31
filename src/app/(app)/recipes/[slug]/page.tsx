import config from "@payload-config";
import { getPayload } from "payload";
import { notFound } from "next/navigation";
import type { Recipe } from "../../../../payload-types";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UserIcon, BookmarkIcon } from "@heroicons/react/24/outline";

export default async function Recipe({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const recipes = await payload.find({
    collection: "recipes",
    where: {
      slug: { equals: slug },
    },
    depth: 2,
  });

  const recipe = recipes.docs[0] as Recipe;



  // Ensure session exists and has a user
  if (!recipe) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen min-w-screen-lg px-3 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <section className="w-full flex flex-col pt-4 gap-12 ml-auto mr-auto max-w-[760px]">
            <div className="basis-1/2 space-y-8 my-auto">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-normal">
                  {recipe.title}
                </h1>
                <ul className="list-none mb-6 flex gap-4">
                  {recipe.tags?.map((tag) => (
                    <li
                      key={tag.id}
                      className="bg-[#f1f6d1] px-3 py-1 rounded-full text-sm text-[#7f9c30] font-semibold"
                    >
                      {tag.tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative w-full">
              {recipe.mainImage &&
                typeof recipe.mainImage !== "string" &&
                recipe.mainImage.url && (
                  <img
                    src={recipe.mainImage.url}
                    alt={recipe.title}
                    className="mb-4 rounded-md object-cover max-h-[428px] w-full"
                  />
                )}
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2 mb-8">
                {recipe.createdBy &&
                  typeof recipe.createdBy !== "string" &&
                  recipe.createdBy.profilePhoto &&
                  typeof recipe.createdBy.profilePhoto !== "string" &&
                  recipe.createdBy.profilePhoto.url && (
                    <>
                      <img
                        src={recipe.createdBy.profilePhoto.url}
                        alt={recipe.createdBy.first_name ?? "Profile Photo"}
                        className="rounded-full w-9 h-9"
                      />
                      <p className="pointer-events-none block text-sm font-medium text-gray-500">
                        {recipe.createdBy.first_name}{" "}
                        {recipe.createdBy.last_name}
                      </p>
                    </>
                  )}
              </div>
              <div>
                <button className="px-3 py-1.5 bg-gray-800 text-white rounded-full flex items-center gap-2">
                  Save
                </button>
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-[760px]">
            <div className="md:flex md:flex-col md:justify-between gap-12">
              <div className="md:basis-1/2">
                <h2 className="text-xl font-semibold mb-2">Chef's notes</h2>
                <p>{recipe.description}</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <div className="flex gap-1">
                  <ClockIcon className="w-4 text-[#132a13] opacity-70" />
                  {
                    recipe.cookTime
                  } minutes
                </div>
                <div className="flex gap-2">
                  <UserIcon className="w-4 text-[#132a13] opacity-70" />
                  {
                    recipe.servings
                  } servings
                </div>
              </div>
              <div className="md:basis-1/2">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-none mb-6 space-y-8">
                  {recipe.ingredients?.map((ing, i) => (
                    <li key={i} className="flex justify-between">
                      <div className="basis-1/2">{ing.ingredient}</div>
                      <div className="text-sm flex gap-1">
                        <p>{ing.amount}</p>
                        <p>{ing.unit}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:basis-1/2 mb-12">
                <h2 className="text-xl font-semibold mb-2">Directions</h2>
                <ol className="space-y-6">
                  {recipe.directions.map((step, i) => (
                    <li
                      key={i}
                      className="mb-2 bg-[#FDFDFD] border border-gray-200 rounded-md py-8 px-6"
                    >
                      {step.instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
