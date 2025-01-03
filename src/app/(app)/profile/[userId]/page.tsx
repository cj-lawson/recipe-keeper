import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';

// Types
import type { Recipe, Profile } from '../../../../payload-types';

export default async function PublicProfile({
  params,
}: {
  params: { userId: string };
}) {
  const userId = params.userId;

  const payload = await getPayload({
    config,
  });

  const result = await payload.find({
    collection: 'profiles',
    where: {
      id: {
        equals: userId,
      },
    },
  });

  // Assert that result.docs is a Recipe array
  const recipes = result.docs[0].createdRecipes as Recipe[];
  const profile = result.docs[0] as Profile;

  return (
    <div className="min-h-screen min-w-screen-lg px-3 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-16 row-start-2 items-center sm:items-start">
        <section className="w-full flex flex-col pt-4 gap-12 ml-auto mr-auto max-w-[760px]">
          <div className="flex gap-2 items-center pt-4">
            {profile.profilePhoto &&
              typeof profile.profilePhoto !== 'string' && (
                <img
                  src={profile.profilePhoto.url || ''}
                  alt="Profile Photo"
                  className="rounded-full w-24 h-24 object-cover object-center"
                />
              )}
          </div>
        </section>
        <section className="w-full flex flex-col pt-4 gap-12 ml-auto mr-auto md:flex-row md:justify-between max-w-[760px]">
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {recipes.map((doc) => (
              <li key={doc.id} className="relative">
                <Link href={`/recipes/${doc.slug}`}>
                  <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    {doc.mainImage &&
                      typeof doc.mainImage !== 'string' &&
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
                  <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                    {doc.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
