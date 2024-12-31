import config from "@payload-config";
import { getPayload } from "payload";
import type { Recipe } from "../../../../../payload-types";
import Link from "next/link";

export default async function FeaturedRecipes() {
  const payload = await getPayload({
    config,
  });

  const result = await payload.find({
    collection: "recipes",
    depth: 2,
  });

  // Assert that result.docs is a Recipe array
  const recipes = result.docs as Recipe[];

  return (
    <section className="pt-6 max-w-screen-xl w-full flex flex-col gap-4 ml-auto mr-auto">
      <h2 className="text-2xl font-bold tracking-tight sm:text-2xl lg:text-2xl">
        <span className="block">Featured Recipes</span>
      </h2>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {recipes.map((doc) => (
          <li key={doc.id} className="relative">
            <Link href={`/recipes/${doc.slug}`}>
              <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                {doc.mainImage &&
                  typeof doc.mainImage !== "string" &&
                  doc.mainImage.url && (
                    <img
                      alt={doc.title}
                      src={doc.mainImage.url}
                      className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
                    />
                  )}
                <button
                  type="button"
                  className="absolute inset-0 focus:outline-none"
                >
                  <span className="sr-only">View details for {doc.title}</span>
                </button>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-md font-medium text-gray-900">
                {doc.title}
              </p>

              <div className="flex gap-2 items-center pt-4">
                {doc.createdBy &&
                  typeof doc.createdBy !== "string" &&
                  doc.createdBy.profilePhoto &&
                  typeof doc.createdBy.profilePhoto !== "string" &&
                  doc.createdBy.profilePhoto.url && (
                    <img
                      src={doc.createdBy.profilePhoto.url}
                      alt={doc.createdBy.first_name ?? "Profile Photo"}
                      className="rounded-full w-6 h-6"
                    />
                  )}
                
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
