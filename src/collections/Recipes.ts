import type { CollectionBeforeOperationHook, CollectionConfig } from "payload";
import { slugify } from "../../utils/slugify";

const generateSlug: CollectionBeforeOperationHook = (args) => {
  const { data }: any = args; // Destructure `data` from the args
  if (data?.title) {
    data.slug = slugify(data.title);
  }
};

export const Recipes: CollectionConfig = {
  slug: "recipes",
  access: {
    delete: ({ req: { user } }) => {
      return Boolean(user);
    },
  },
  fields: [
    {
      name: "isPublic",
      type: "checkbox",
      defaultValue: false,
      label: "Public Recipe",
    },
    {
      name: "slug",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "profiles",
      required: true,
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "mainImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "cookTime",
      type: "number",
      label: "Cook time (minutes)",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "datePublished",
      type: "date",
      label: "Date Published",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "servings",
      type: "number",
      label: "Servings",
      admin: {
        position: "sidebar",
        description: "Number of servings this recipe makes.",
      },
    },
    {
      name: "cuisine",
      type: "select",
      label: "Cuisine",
      options: [
        {
          label: "Italian",
          value: "italian",
        },
        {
          label: "Mexican",
          value: "mexican",
        },
        {
          label: "Chinese",
          value: "chinese",
        },
        {
          label: "Japanese",
          value: "japanese",
        },
        {
          label: "Indian",
          value: "indian",
        },
        {
          label: "Asian",
          value: "Asian",
        },
        {
          label: "Other",
          value: "other",
        }, // Add an "Other" option
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "customCuisine",
      type: "text",
      label: "Custom Cuisine",
      admin: {
        // Only show this field if "other" is selected in the cuisine field
        condition: (data, siblingData) => {
          return siblingData?.cuisine === "other";
        },
        position: "sidebar",
      },
    },
    {
      name: "customCategories",
      type: "array",
      fields: [
        {
          name: "category",
          type: "text",
          required: false,
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "ingredients",
      type: "array",
      label: "Ingredients",
      fields: [
        {
          name: "amount",
          type: "number",
          label: "Amount",
          // required: true,
          admin: {
            placeholder: "Enter quantity (e.g., 1, 1.5)",
          },
        },
        {
          name: "unit",
          type: "select",
          label: "Unit",
          // required: true,
          options: [
            { label: "Cups", value: "cups" },
            { label: "Tablespoons", value: "tbsp" },
            { label: "Teaspoons", value: "tsp" },
            { label: "Grams", value: "grams" },
            { label: "Ounces", value: "oz" },
            { label: "Pounds", value: "lb" },
            { label: "Milliliters", value: "ml" },
            { label: "Liters", value: "l" },
            { label: "Pieces", value: "pieces" },
            { label: "Custom", value: "custom" }, // Fallback for custom units
          ],
        },
        {
          name: "customUnit",
          type: "text",
          label: "Custom Unit",
          admin: {
            condition: (data, siblingData) => siblingData.unit === "custom",
            placeholder: 'Enter a custom unit (e.g., "pinch")',
          },
        },
        {
          name: "ingredient",
          type: "text",
          label: "Ingredient",
          // required: true,
          admin: {
            placeholder: 'Enter ingredient name (e.g., "Flour")',
          },
        },
      ],
    },
    {
      name: "directions",
      type: "array",
      required: true,
      fields: [
        {
          name: "stepNumber",
          type: "number",
          admin: {
            readOnly: true, // Auto-generate this based on array position
          },
        },
        {
          name: "instruction",
          type: "textarea",
          required: true,
        },
        {
          name: "stepImage",
          type: "upload",
          relationTo: "media",
          admin: {
            position: "sidebar",
          },
        },
      ],
      admin: {
        initCollapsed: true, // Collapses the list of steps in the CMS for cleaner UI
      },
    },
  ],
  hooks: {
    beforeChange: [generateSlug],
  },
};
