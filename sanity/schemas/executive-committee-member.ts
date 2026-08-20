import { defineField, defineType } from "sanity";

export const executiveCommitteeMember = defineType({
  name: "executiveCommitteeMember",
  title: "Executive Committee Members",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: "e.g. President, Vice President, General Secretary, Treasurer, Secretary, Executive Member",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first (President = 1, Vice President = 2, ...).",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
