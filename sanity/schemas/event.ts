import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Events",
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
    defineField({
      name: "date",
      title: "Start date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "endDate", title: "End date", type: "datetime" }),
    defineField({ name: "location", title: "Venue", type: "string" }),
    defineField({
      name: "host",
      title: "Host / Organizer",
      type: "string",
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
    }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({
      name: "banner",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Event date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "banner" },
  },
});
