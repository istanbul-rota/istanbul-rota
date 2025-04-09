import { defineField, defineType } from "sanity";

export default defineType({
  name: "award",
  title: "Award",
  type: "document",
  fields: [
    defineField({
      name: "titles",
      title: "Titles",
      type: "array",
      of: [
        {
          type: "object",
          title: "Title in a Language",
          fields: [
            defineField({
              name: "language",
              type: "reference",
              to: [{ type: "language" }],
              title: "Language",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              languageRef: "language.language",
              title: "title",
            },
            prepare({ languageRef, title }) {
              return {
                title: `language: ${languageRef || "Unknown"}`,
                subtitle: `title: ${title || ""}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "descriptions",
      title: "Descriptions",
      type: "array",
      of: [
        {
          type: "object",
          title: "Description in a Language",
          fields: [
            defineField({
              name: "language",
              type: "reference",
              to: [{ type: "language" }],
              title: "Language",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
          preview: {
            select: {
              languageRef: "language.language",
              description: "description",
            },
            prepare({ languageRef, description }) {
              return {
                title: `language: ${languageRef || "Unknown"}`,
                subtitle: `description: ${description?.slice(0, 50) || ""}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      titleArray: "titles",
    },
    prepare({ titleArray }) {
      const firstTitle = titleArray?.[0]?.title || "No title";
      return {
        title: firstTitle,
      };
    },
  },
});
