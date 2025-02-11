// app/api/recipes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { extractRecipeFromURL } from "../../../../utils/recipeParser";
import { scrapeAndCreateRecipe } from "@utils/scrapeAndCreateRecipe";
import { createClient } from "../../../../utils/supabase/server";

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: "No URL provided" }, {
                status: 400,
            });
        }

        // Get userId
        const supabase = createClient();

        const {
            data: { user },
        } = await (await supabase).auth.getUser();

        if (!user) {
            // Return an error (or redirect) if the user is not logged in
            return NextResponse.json({ error: "User not logged in" }, {
                status: 401,
            });
        }

        // const recipeData = await extractRecipeFromURL(url);
        const createdRecipe = await scrapeAndCreateRecipe(url, user.id);

        return NextResponse.json({ recipe: createdRecipe });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
