import { signOut } from '../../(auth)/actions';
import { createClient } from '../../../../utils/supabase/server';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Image from 'next/image';
import logo from 'app-logo.svg';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="px-3 py-2 z-10 sticky top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-[family-name:var(--font-geist-sans)]">
      <div className="container flex h-14 max-w-screen-lg items-center ml-auto mr-auto">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="/app-logo.svg"
              width={144}
              height={144}
              alt="Biteclube logo mark"
            />
            {/* <span className="font-bold text-green-600 text-2xl">BiteClub</span> */}
          </Link>
          {/* <Link href="/recipes" className="font-semibold text-sm">
            Recipes
          </Link> */}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {user !== null ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton
                    aria-label="profile-button"
                    className="relative inline-flex w-full justify-center items-center gap-x-1.5 rounded-full pr-3 pl-1 py-1 text-sm font-semibold text-gray-900 bg-[#FDFDFD] hover:opacity-90 border border-gray-200"
                  >
                    <UserCircleIcon className="w-9 text-gray-400" />
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm">Signed in as</p>
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <MenuItem>
                      <Link
                        href={`/profile/${user.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href={`/dashboard/${user.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        My recipes
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href={'/create-recipe'}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Create a recipe
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Account settings
                      </a>
                    </MenuItem>
                  </div>
                  <div className="py-1">
                    <form action={signOut} className="flex items-center gap-2">
                      <MenuItem>
                        <button
                          type="submit"
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </Menu>
            </>
          ) : (
            <div className="space-x-4">
              <Link href="/login" className="font-semibold text-sm">
                Login
              </Link>
              <button className="px-6 py-3 font-bold rounded-full text-sm bg-[#F9F4F2]">
                <Link href="/signup">Sign up</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
