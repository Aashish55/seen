import { defineField, defineType } from "sanity";

export const executiveCommittee = defineType({
  name: "executiveCommittee",
  title: "Executive Committee Members",
  type: "document",
  fields: [
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "members",
      title: "Members",
      type: "array",
      description:
        "Listed in display order (President first). Photos are shown for the latest committee only; past committees display names and posts.",
      of: [
        {
          type: "object",
          name: "member",
          fields: [
            defineField({
              name: "name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              type: "string",
              description:
                "e.g. President, Vice President, General Secretary, Secretary, Treasurer, Executive Member",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "photo",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "photo" },
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  orderings: [
    {
      title: "Most recent term first",
      name: "endYearDesc",
      by: [{ field: "endYear", direction: "desc" }],
    },
  ],
  preview: {
    select: { startYear: "startYear", endYear: "endYear", members: "members" },
    prepare({ startYear, endYear, members }) {
      return {
        title: `${startYear} – ${endYear}`,
        subtitle: `${members?.length ?? 0} members`,
      };
    },
  },
});
