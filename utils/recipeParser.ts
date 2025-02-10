// lib/recipeParser.ts
import * as cheerio from "cheerio";

export async function extractRecipeFromURL(url: string) {
    // 1. Fetch the HTML
    const response = await fetch(url);
    const html = await response.text();

    // 2. Load into cheerio
    const $ = cheerio.load(html);

    // 3. Attempt to find JSON-LD <script>
    let recipeData: any;

    $('script[type="application/ld+json"]').each((i, el) => {
        try {
            const json = JSON.parse($(el).contents().text());
            // console.log("Parsed JSON-LD:", json);
            // Some pages have an array of JSON-LD objects
            if (Array.isArray(json)) {
                const recipeObj = json.find((item) => {
                    const typeValue = item["@type"];

                    return Array.isArray(typeValue)
                        ? typeValue.includes("Recipe")
                        : typeValue === "Recipe";
                });

                if (recipeObj) recipeData = recipeObj;
            } else {
                const typeValue = json["@type"];
                if (
                    (typeof typeValue === "string" && typeValue === "Recipe") ||
                    (Array.isArray(typeValue) && typeValue.includes("Recipe"))
                ) {
                    recipeData = json;
                }
            }
            console.log("recipeData:", recipeData);
        } catch (err) {
            console.error("Error parsing JSON-LD:", err);
        }
    });
    if (!recipeData) {
        // fallback: parse microdata or fallback approach

        return null;
    }

    // 4. Extract relevant fields
    // const name = recipeData.name || "";
    // const description = recipeData.description || "";
    // const ingredients = recipeData.recipeIngredient || [];
    // let instructions = [];
    // if (Array.isArray(recipeData.recipeInstructions)) {
    //     instructions = recipeData.recipeInstructions.map((instr) =>
    //         typeof instr === "string" ? instr : instr.text
    //     );
    // }

    // 5. Return data in your own shape
    return {
        // content,
        // recipeData,
        // name,
        // description,
        // ingredients,
        // instructions,
        // You can extract cookTime, prepTime, yields, etc. as well if present
    };
}
