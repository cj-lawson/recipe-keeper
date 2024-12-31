// import { redirect } from 'next/navigation';
// import { createClient } from '../../../../../../utils/supabase/server';
// import { getPayload } from 'payload';
// import config from '@payload-config';
// import Link from 'next/link';
// import { ClockIcon } from '@heroicons/react/24/outline';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import { UserCircleIcon } from '@heroicons/react/24/solid';

// // Types
// import type { Recipe, Profile } from '../../../../../payload-types';

// export default async function MyRecipes({
//   params,
// }: {
//   params: { userId: string };
// }) {
//   const userId = (await params).userId;
//   const supabase = await createClient();
//   const { data } = await supabase.auth.getSession();

//   // Ensure session exists and has a user
//   if (!data?.session || !data.session.user || data.session.user.id !== userId) {
//     redirect('/login');
//   }

//   const payload = await getPayload({
//     config,
//   });

//   const result = await payload.find({
//     collection: 'profiles',
//     where: {
//       id: {
//         equals: userId,
//       },
//     },
//   });

//   // Assert that result.docs is a Recipe array
//   const recipes = result.docs[0].createdRecipes as Recipe[];
//   const profile = result.docs[0] as Profile;

//   const tabs = [
//     { name: 'My recipes', href: '#', current: true },
//     { name: 'Saved recipes', href: '#', current: false },
//     { name: 'Created recipes', href: '#', current: false },
//   ];

//   function classNames(...classes: any[]) {
//     return classes.filter(Boolean).join(' ');
//   }

//   return (
//     <div className="min-h-screen min-w-screen-lg px-3 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
//       <div className="flex flex-col gap-16 row-start-2 items-center sm:items-start">
//         {/* Tabs */}
//         <section className="w-full flex flex-col pt-4 gap-8 ml-auto mr-auto max-w-[760px]">
//           <div>
//             <div className="grid grid-cols-1 sm:hidden">
//               {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
//               <select
//                 defaultValue={tabs.find((tab) => tab.current)?.name}
//                 aria-label="Select a tab"
//                 className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
//               >
//                 {tabs.map((tab) => (
//                   <option key={tab.name}>{tab.name}</option>
//                 ))}
//               </select>
//               <ChevronDownIcon
//                 aria-hidden="true"
//                 className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
//               />
//             </div>
//             <div className="hidden sm:block">
//               <nav aria-label="Tabs" className="flex space-x-4">
//                 {tabs.map((tab) => (
//                   <a
//                     key={tab.name}
//                     href={tab.href}
//                     aria-current={tab.current ? 'page' : undefined}
//                     className={classNames(
//                       tab.current
//                         ? 'bg-indigo-100 text-indigo-700'
//                         : 'text-gray-500 hover:text-gray-700',
//                       'rounded-md px-3 py-2 text-sm font-medium',
//                     )}
//                   >
//                     {tab.name}
//                   </a>
//                 ))}
//               </nav>
//             </div>
//           </div>
//         </section>
//         <section className="w-full flex flex-col pt-4 gap-8 ml-auto mr-auto max-w-[760px]">
//           <ul
//             role="list"
//             className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
//           >
//             {recipes.map((doc) => (
//               <li key={doc.id} className="relative">
//                 <Link href={`/recipes/${doc.slug}`}>
//                   <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
//                     {doc.mainImage &&
//                       typeof doc.mainImage !== 'string' &&
//                       doc.mainImage.url && (
//                         <img
//                           alt={doc.title}
//                           src={doc.mainImage.url}
//                           className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
//                         />
//                       )}
//                   </div>

//                   <div className="flex flex-col gap-2">
//                     <p className="pointer-events-none mt-2 block truncate text-md font-medium text-gray-900">
//                       {doc.title}
//                     </p>
//                     <div className="flex gap-1">
//                       <ClockIcon className="w-4 text-[#132a13] opacity-70" />
//                       <p className="text-sm opacity-70">
//                         {doc.cookTime} minutes
//                       </p>
//                     </div>

//                     <div className="flex gap-2 items-center pt-4">
//                       {doc.createdBy &&
//                         typeof doc.createdBy !== 'string' &&
//                         doc.createdBy.profilePhoto &&
//                         typeof doc.createdBy.profilePhoto !== 'string' &&
//                         doc.createdBy.profilePhoto.url && (
//                           <>
//                             <img
//                               src={doc.createdBy.profilePhoto.url}
//                               alt={doc.createdBy.first_name ?? 'Profile Photo'}
//                               className="rounded-full w-6 h-6"
//                             />
//                             <p className="pointer-events-none block text-sm font-medium text-gray-500">
//                               {doc.createdBy.first_name}{' '}
//                               {doc.createdBy.last_name}
//                             </p>
//                           </>
//                         )}
//                     </div>
//                   </div>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// }

import { redirect } from 'next/navigation';
import { createClient } from '../../../../../../utils/supabase/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import MyRecipesDashboard from './components/MyRecipesDashboard';
import type { Recipe } from '../../../../../payload-types';

export default async function MyRecipesPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (!data?.session || !data.session.user || data.session.user.id !== userId) {
    redirect('/login');
  }

  const payload = await getPayload({ config });

  // Fetch user profile
  const profile = await payload.find({
    collection: 'profiles',
    where: { id: { equals: userId } },
    depth: 2,
  });

  if (!profile.docs.length) {
    redirect('/login');
  }

  const savedRecipes = (profile.docs[0].savedRecipes as Recipe[]) || [];
  const createdRecipes = (profile.docs[0].createdRecipes as Recipe[]) || [];

  return (
    <MyRecipesDashboard
      savedRecipes={savedRecipes}
      createdRecipes={createdRecipes}
    />
  );
}
