import { redirect } from 'next/navigation';
import { createClient } from '../../../../utils/supabase/server';
import CreateRecipeForm from './components/CreateRecipeForm';

export default async function CreateRecipePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-[760px] mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">Create a Recipe</h1> */}
      <CreateRecipeForm userId={user.id} />
    </div>
  );
}
