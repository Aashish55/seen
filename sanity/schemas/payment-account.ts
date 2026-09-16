import { defineField, defineType } from "sanity";

export const paymentAccount = defineType({
  name: "paymentAccount",
  title: "Membership Payment QR",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      initialValue: "Life Membership Fee",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "qrImage",
      title: "Fonepay QR Code",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "accountName", title: "Account Name", type: "string" }),
    defineField({ name: "accountNumber", title: "Account Number", type: "string" }),
    defineField({ name: "bankName", title: "Bank Name", type: "string" }),
    defineField({
      name: "instructions",
      title: "Instructions",
      type: "text",
      rows: 3,
      description: "Optional. Shown below the QR, e.g. how to pay and upload the voucher.",
    }),
    defineField({
      name: "active",
      title: "Show on Apply Online form",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide without deleting - useful when updating bank details.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "accountNumber", media: "qrImage", active: "active" },
    prepare({ title, subtitle, media, active }) {
      return {
        title,
        subtitle: active ? subtitle : `(hidden) ${subtitle ?? ""}`.trim(),
        media,
      };
    },
  },
});
