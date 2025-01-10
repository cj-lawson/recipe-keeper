import type { CollectionConfig } from "payload";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

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
  hooks: {
    afterChange: [
      async ({ req, doc }) => {
        // Ensure the upload exists
        if (!doc.filename || !req.payloadUploadSizes) {
          return doc;
        }

        const uploadPath = path.join(__dirname, "../../uploads"); // Adjust based on your upload directory
        const filePath = path.join(uploadPath, doc.filename);
        const webpFilename = `${
          path.basename(doc.filename, path.extname(doc.filename))
        }.webp`;
        const webpFilePath = path.join(uploadPath, webpFilename);

        try {
          // Convert the main image to WebP
          await sharp(filePath).webp({ quality: 80 }).toFile(webpFilePath);
          doc.webp = `/uploads/${webpFilename}`;
        } catch (err) {
          console.error("Error converting main image to WebP:", err);
        }

        // Convert resized versions to WebP
        if (req.payloadUploadSizes) {
          const resizedWebpUrls = [];

          for (const [size, value] of Object.entries(req.payloadUploadSizes)) {
            if (value && typeof value === "object" && "filename" in value) {
              const { filename } = value as { filename: string };
              const resizedFilePath = path.join(uploadPath, filename);
              const resizedWebpFilename = `${
                path.basename(filename, path.extname(filename))
              }-${size}.webp`;
              const resizedWebpFilePath = path.join(
                uploadPath,
                resizedWebpFilename,
              );

              try {
                await sharp(resizedFilePath).webp({ quality: 80 }).toFile(
                  resizedWebpFilePath,
                );
                resizedWebpUrls.push({
                  size,
                  url: `/uploads/${resizedWebpFilename}`,
                });
              } catch (err) {
                console.error(`Error converting ${size} to WebP:`, err);
              }
            } else {
              console.warn(
                `Unexpected structure in req.payloadUploadSizes for size ${size}:`,
                value,
              );
            }
          }

          // Save resized WebP URLs
          doc.webpResized = resizedWebpUrls;
        }

        // Return the updated document
        return doc;
      },
    ],
  },
};
