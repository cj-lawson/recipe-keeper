import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
    {
      name: "webp",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "webpResized",
      type: "array",
      fields: [
        {
          name: "size",
          type: "text",
        },
        {
          name: "url",
          type: "text",
        },
      ],
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: true,
};
