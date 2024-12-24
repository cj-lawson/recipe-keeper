import { createClient } from "../../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import type { Recipe, Profile } from "../../../../payload-types";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const userId = (await params).userId;
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  // Ensure session exists and has a user
  if (!data?.session || !data.session.user || data.session.user.id !== userId) {
    redirect("/login");
  }

  const payload = await getPayloadHMR({
    config,
  });

  const result = await payload.find({
    collection: "profiles",
    where: {
      id: {
        equals: userId,
      },
    },
  });

  // Assert that result.docs is a Recipe array
  const recipes = result.docs[0].createdRecipes as Recipe[];

  console.log(recipes);

  return (
    <div className="min-h-screen min-w-screen-lg px-3 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-16 row-start-2 items-center sm:items-start">
        <section className="max-w-screen-lg w-full flex flex-col pt-4 gap-12 ml-auto mr-auto md:flex-row md:justify-between">
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
                      <span className="sr-only">
                        View details for {doc.title}
                      </span>
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
      </div>
    </div>
  );
}
function getPayloadClient() {
  throw new Error("Function not implemented.");
}
