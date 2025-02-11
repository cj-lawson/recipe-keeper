// lib/recipeParser.ts
import { CheerioAPI, load } from "cheerio";

/**
 * Main function orchestrates fetching, parsing, and extracting.
 */
export async function extractRecipeFromURL(url: string) {
    // 1. Fetch HTML∏
    const html = await fetchHTML(url);

    // 2. Load into cheerio
    const $ = load(html);

    // 3. Attempt to find JSON-LD <script> for a recipe
    const recipeData = findRecipeJSONLD($);
    // console.log("JSONNNNNNN:", recipeData);

    // If no recipe JSON-LD found, attempt to parse microdata (future release)
    if (!recipeData) {
        return null;
    }

    // 4. Extract relevant fields from the JSON-LD
    const extracted = extractRecipeFields(recipeData);
    // console.log("EXTRACTED RECIPE:", extracted);

    // Create the recipe in payload
    const payloadData = buildPayloadRecipeData(extracted, "1234");
    console.log(payloadData);

    return extracted;
}

/**
 * Fetching the HTML from a URL and return it as a string.
 * Abstracting this into its own function makes it testable
 * and easy to replace (e.g., for local mocks).
 */
async function fetchHTML(url: string): Promise<string> {
    const response = await fetch(url);
    return response.text();
}

/**
 * Scans all <script type="application/ld+json"> tags,
 * parses JSON, and returns the first object whose @type includes "Recipe".
 * If nothing is found, returns null.
 */
function findRecipeJSONLD($: CheerioAPI): any {
    let recipeData = null;

    $('script[type="application/ld+json"]').each((_, el) => {
        try {
            const json = JSON.parse($(el).contents().text());
            // console.log(json);

            if (Array.isArray(json)) {
                // If it's an array, find the first item whose @type is or includes "Recipe"
                const recipeObj = json.find((item) => {
                    const typeVal = item["@type"];
                    return Array.isArray(typeVal)
                        ? typeVal.includes("Recipe")
                        : typeVal === "Recipe";
                });

                if (recipeObj) {
                    recipeData = recipeObj;
                    return false; // stop .each() once found
                }
            } else if (json["@graph"] && Array.isArray(json["@graph"])) {
                // If there's a @graph array, search in there
                const recipeObj = json["@graph"].find((item) => {
                    const typeVal = item["@type"];
                    return Array.isArray(typeVal)
                        ? typeVal.includes("Recipe")
                        : typeVal === "Recipe";
                });
                if (recipeObj) {
                    recipeData = recipeObj;
                    return false;
                }
            } else {
                // If it's a single object
                const typeVal = json["@type"];
                if (
                    (typeof typeVal === "string" && typeVal === "Recipe") ||
                    (Array.isArray(typeVal) && typeVal.includes("Recipe"))
                ) {
                    recipeData = json;
                    return false; // stop .each()
                }
            }
        } catch (err) {
            // Malformed JSON or something unexpected
            // console.error("Error parsing JSON-LD:", err);
        }
    });

    return recipeData;
}

/**
 * Takes a raw JSON-LD recipe object and extracts the fields into a consistent interface.
 */
function extractRecipeFields(recipeData: any): ExtractedRecipeFields {
    // Safely destructure
    const {
        name, // title
        description, // description
        author, // ogAuthor
        recipeIngredient, // ingredients
        recipeInstructions, // directions
        totalTime, // cooktime
        recipeYield, // servings
    } = recipeData;

    // Handle author (can be object, array, or string)
    const authorName = parseAuthor(author);

    // Handle ingredients (usually an array, sometimes a single string)
    const ingredients = Array.isArray(recipeIngredient)
        ? recipeIngredient
        : typeof recipeIngredient === "string"
        ? [recipeIngredient]
        : [];

    // Handle instructions (often array of objects with .text, or just strings)
    let instructions: string[] = [];
    if (Array.isArray(recipeInstructions)) {
        instructions = recipeInstructions.map((step: any) => {
            if (typeof step === "string") return step;
            if (typeof step?.text === "string") return step.text;
            return "";
        });
    } else if (typeof recipeInstructions === "string") {
        instructions = [recipeInstructions];
    }

    return {
        name: typeof name === "string" ? name : "",
        description: typeof description === "string" ? description : "",
        author: authorName,
        ingredients,
        instructions,
        totalTime,
        recipeYield,
    };
}

/**
 * Parses the `author` field from the JSON-LD recipe object.
 * It can be a string, an object with a `.name`, or an array of such objects.
 */
function parseAuthor(author: any): string {
    if (!author) return "";

    // If it's already a string
    if (typeof author === "string") return author;

    // If it's an array of authors
    if (Array.isArray(author)) {
        return author
            .map((a) => typeof a === "object" && a?.name ? a.name : "")
            .filter(Boolean)
            .join(", ");
    }

    // If it's a single object with a .name
    if (typeof author === "object" && typeof author.name === "string") {
        return author.name;
    }

    return "";
}

interface ExtractedRecipeFields {
    name: string;
    description: string;
    author: string;
    ingredients: string[];
    instructions: string[];
    totalTime?: string;
    recipeYield?: string;
}

function buildPayloadRecipeData(
    recipe: ExtractedRecipeFields,
    userId: string,
) {
    const cookTimeInMinutes = parseISO8601Duration(recipe.totalTime);
    const servings = parseServings(recipe.recipeYield);

    const ingredients = recipe.ingredients.map((ing) => ({
        amount: null,
        unit: "custom",
        customUnit: "",
        ingredient: ing,
    }));

    const directions = recipe.instructions.map((step, index) => ({
        stepNumber: index + 1,
        instruction: step,
        stepImage: null,
    }));

    // Return object for paylod
    return {
        isPublic: false,
        createdBy: userId,
        title: recipe.name,
        description: recipe.description,
        cookTime: cookTimeInMinutes,
        datePublished: null,
        servings,
        cusisine: "other",
        customCuisine: "",
        customCategories: [],
        tags: [],
        ingredients,
        directions,
        mainImage: undefined,
    };
}

function parseISO8601Duration(duration?: string): number | null {
    if (!duration || !duration.startsWith("PT")) return null;

    // E.g. "PT2H30M". We'll capture the hours and minutes if they exist.
    const hourMatch = duration.match(/(\d+)H/);
    const minMatch = duration.match(/(\d+)M/);

    const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
    const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;

    const totalMinutes = hours * 60 + minutes;
    return Number.isNaN(totalMinutes) ? null : totalMinutes;
}

function parseServings(yieldVal?: string): number | null {
    if (!yieldVal) return null;

    // If the recipeYield can be an array, join its elements into a single string.
    let yieldStr: string;
    if (Array.isArray(yieldVal)) {
        yieldStr = yieldVal.join(" "); // e.g. ["6 servings", "approx"] -> "6 servings approx"
    } else {
        yieldStr = yieldVal;
    }

    // Now yieldStr is definitely a string; we can safely call .match()
    const match = yieldStr.match(/\d+/); // Look for the first integer
    if (match) {
        const servings = parseInt(match[0], 10);
        return Number.isNaN(servings) ? null : servings;
    }

    return null;
}
