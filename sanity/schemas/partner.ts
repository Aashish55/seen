import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partners & Sponsors",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "website", type: "url" }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
