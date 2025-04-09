// schemas/language.ts (veya .js)

import { defineType, defineField } from "sanity";

export default defineType({
  name: "language",
  title: "Language",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Language Code (e.g. en, tr)",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(
          /^[a-z]{2}$/,
          "Must be 2 lowercase letters (e.g. 'en')",
        ),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "language",
      subtitle: "code",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
