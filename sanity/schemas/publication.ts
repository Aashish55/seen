import { defineField, defineType } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publications",
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
          "Newsletter",
          "Technical Journal",
          "Research Paper",
          "Annual Report",
          "Conference Proceedings",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "publishedAt", type: "date" }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pdf",
      title: "PDF file",
      type: "file",
      options: { accept: "application/pdf" },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
