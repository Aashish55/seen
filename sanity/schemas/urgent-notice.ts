import { defineField, defineType } from "sanity";

export const urgentNotice = defineType({
  name: "urgentNotice",
  title: "Urgent Notice",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      description: "Optional. Shown below the title in the popup.",
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      description: "Optional. Image, PDF or any file. Images show inline; other files show a link.",
    }),
    defineField({
      name: "active",
      title: "Show as popup",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide the popup without deleting the notice.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", active: "active" },
    prepare({ title, subtitle, active }) {
      return {
        title,
        subtitle: active ? subtitle : `(hidden) ${subtitle ?? ""}`.trim(),
      };
    },
  },
});
