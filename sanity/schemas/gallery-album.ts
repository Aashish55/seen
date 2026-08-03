import { defineField, defineType } from "sanity";

export const galleryAlbum = defineType({
  name: "galleryAlbum",
  title: "Gallery Albums",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Events", "Conferences", "Site Visits", "Workshops", "Competitions"],
      },
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string" })],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "images.0" },
  },
});
