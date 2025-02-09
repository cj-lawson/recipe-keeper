// app/api/recipes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { extractRecipeFromURL } from "../../../../utils/recipeParser";

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        console.log(url);

        if (!url) {
            return NextResponse.json({ error: "No URL provided" }, {
                status: 400,
            });
        }

        const recipeData = await extractRecipeFromURL(url);

        if (!recipeData) {
            return NextResponse.json({ error: "Could not parse recipe data" }, {
                status: 404,
            });
        }

        return NextResponse.json({ recipe: recipeData });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
