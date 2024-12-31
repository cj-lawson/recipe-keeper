import { signOut } from "../login/actions";
import { createClient } from "../../../../utils/supabase/server";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="px-3 py-2 z-10 sticky top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-[family-name:var(--font-geist-sans)]">
      <div className="container flex h-14 max-w-screen-lg items-center ml-auto mr-auto">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-[#31572c] text-xl">BiteClub</span>
          </a>
          <Link href="/recipes" className="font-semibold">
            Recipes
          </Link>
          <Link href="/recipes" className="font-semibold">
            Demo
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user !== null ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="relative inline-flex w-full justify-center items-center gap-x-1.5 rounded-full pr-3 pl-1 py-1 text-sm font-semibold text-gray-900 bg-[#FDFDFD] hover:opacity-90 border border-gray-200">
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
                      href={`/profile/${user.id}/my-recipes`}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      Saved recipes
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                      Create a recipe
                    </a>
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
          ) : (
            <button className="bg-[#222222] text-white px-6 py-3 font-bold rounded-md text-sm hover:bg-[#31572c]">
              <Link href="/login">Get Started</Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
