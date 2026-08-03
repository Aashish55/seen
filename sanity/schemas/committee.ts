import { defineField, defineType } from "sanity";

export const committee = defineType({
  name: "committee",
  title: "Committees",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "role", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "activities",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
