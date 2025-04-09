import { defineField, defineType } from "sanity";

export default defineType({
  name: "district",
  title: "District",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "District Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A brief description of the neighbourhood",
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
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          { title: "European Side", value: "europe" },
          { title: "Anatolia Side", value: "anatolia" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "award",
      title: "Award",
      type: "reference",
      to: [{ type: "award" }],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      description: "The location of the district",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed information about the district",
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
      region: "region",
    },
    prepare({ title, media, region }) {
      return {
        title,
        media,
        subtitle: region === "europe" ? "European Side" : "Anatolian Side",
      };
    },
  },
});
