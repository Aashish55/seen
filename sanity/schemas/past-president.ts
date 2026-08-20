import { defineField, defineType } from "sanity";

export const pastPresident = defineType({
  name: "pastPresident",
  title: "Past Presidents",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startYear",
      title: "Term start year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endYear",
      title: "Term end year",
      type: "number",
      description: "Leave empty if currently serving — will display as \"Present\".",
    }),
  ],
  orderings: [
    {
      title: "Most recent term first",
      name: "startYearDesc",
      by: [{ field: "startYear", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", startYear: "startYear", endYear: "endYear" },
    prepare({ title, startYear, endYear }) {
      return { title, subtitle: `${startYear} – ${endYear ?? "Present"}` };
    },
  },
});
