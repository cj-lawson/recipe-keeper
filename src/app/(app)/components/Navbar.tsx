import { signOut } from "../login/actions";
import { createClient } from "../../../../utils/supabase/server";
import Link from "next/link";

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
            <form action={signOut} className="flex items-center gap-2">
              <p>{user.email}</p>
              <button>Sign Out</button>
            </form>
          ) : (
            <button className="bg-[#132a13] text-white px-6 py-3 font-bold rounded-md text-sm hover:bg-[#31572c]">
              <Link href="/login">Get Started</Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
