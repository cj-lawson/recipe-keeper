import config from "@payload-config";
import Link from "next/link";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export default async function Recipes() {
  const payload = await getPayloadHMR({
    config,
  });

  const recipes = await payload.find({
    collection: "recipes",
    depth: 2,
  });

  console.log(recipes.docs);

  return (
    <section className="p-3 pt-6 max-w-screen-xl w-full flex flex-col gap-4 ml-auto mr-auto">
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {recipes.docs.map((doc) => (
          <Link href={`/recipes/${doc.title}`}>
            <li key={doc.id} className="relative">
              <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  alt=""
                  src={doc.mainImage.url}
                  className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
                />
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
                <img
                  src={doc.createdBy.profilePhoto.url}
                  alt=""
                  className="rounded-full w-6 h-6"
                />
                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                  {doc.source}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
