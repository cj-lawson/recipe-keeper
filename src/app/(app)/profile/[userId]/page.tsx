import { createClient } from "../../../../../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  // Ensure session exists and has a user
  if (
    !data?.session ||
    !data.session.user ||
    data.session.user.id !== params.userId
  ) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen min-w-screen-lg px-3 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-16 row-start-2 items-center sm:items-start">
        <section className="max-w-screen-lg w-full flex flex-col pt-4 gap-12 ml-auto mr-auto md:flex-row md:justify-between">
          <h1>Welcome, {data.session.user.email}!</h1>
          <p>This is your profile page.</p>
        </section>
      </div>
    </div>
  );
}
