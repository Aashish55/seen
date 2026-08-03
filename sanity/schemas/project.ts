import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          "Power Systems",
          "Renewable Energy",
          "Rural Electrification",
          "Smart Grid",
          "Standards & Safety",
          "Research",
        ],
      },
    }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "contributors",
      title: "Contributing engineers / committees",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      title: "Detailed write-up",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "images.0" },
  },
});
