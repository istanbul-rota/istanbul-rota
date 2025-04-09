import { defineField, defineType } from "sanity";

export default defineType({
  name: "business",
  title: "Business",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "titles[0].title", // varsayılan ilk title'dan üret
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "district",
      title: "District",
      type: "reference",
      to: [{ type: "district" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Business Type",
      type: "string",
      options: {
        list: [
          { title: "Restaurant", value: "restaurant" },
          { title: "Cafe", value: "cafe" },
          { title: "Bar", value: "bar" },
          { title: "Hotel", value: "hotel" },
          { title: "Tradesmen", value: "tradesmen" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptions",
      title: "Short Descriptions",
      type: "array",
      of: [
        {
          type: "object",
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
              type: "text",
              title: "Description",
            }),
          ],
          preview: {
            select: {
              lang: "language.language",
              desc: "description",
            },
            prepare({ lang, desc }) {
              return {
                title: `Language: ${lang ?? "(empty)"}`,
                subtitle: `Description: ${desc ?? "-"}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "contents",
      title: "Detailed Contents",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "language",
              type: "reference",
              to: [{ type: "language" }],
              title: "Language",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
          preview: {
            select: {
              lang: "language.language",
              content: "content",
            },
            prepare({ lang, content }) {
              const text = content?.[0]?.children?.[0]?.text ?? "No preview";
              return {
                title: `Language: ${lang ?? "(empty)"}`,
                subtitle: text,
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      description: "Location of the business on the map",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "openingHours",
      title: "Working Hours",
      type: "object",
      fields: [
        { name: "monday", title: "Monday", type: "string" },
        { name: "tuesday", title: "Tuesday", type: "string" },
        { name: "wednesday", title: "Wednesday", type: "string" },
        { name: "thursday", title: "Thursday", type: "string" },
        { name: "friday", title: "Friday", type: "string" },
        { name: "saturday", title: "Saturday", type: "string" },
        { name: "sunday", title: "Sunday", type: "string" },
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
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
      title: "title",
      media: "mainImage",
      type: "type",
      district: "district.title",
    },
    prepare({ title, media, type, district }) {
      return {
        title,
        media,
        subtitle: `${type} - ${district}`,
      };
    },
  },
});
