import { defineField, defineType } from "sanity";

export const officialDocument = defineType({
  name: "officialDocument",
  title: "Documents",
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
        list: [
          "Policies",
          "Standards",
          "Guidelines",
          "Membership Forms",
          "Technical Documents",
          "Annual Reports",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pdf",
      title: "File",
      type: "file",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
