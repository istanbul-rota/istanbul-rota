import { defineField, defineType } from "sanity";

export default defineType({
  name: "semt",
  title: "Semt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Semt Adı",
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
      title: "Açıklama",
      type: "text",
      description: "Semt hakkında kısa bir açıklama",
    }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "images",
      title: "Görseller",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "region",
      title: "Bölge",
      type: "string",
      options: {
        list: [
          { title: "Avrupa Yakası", value: "avrupa" },
          { title: "Anadolu Yakası", value: "anadolu" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Konum",
      type: "geopoint",
      description: "Semtin harita üzerindeki konumu",
    }),
    defineField({
      name: "content",
      title: "İçerik",
      type: "array",
      of: [{ type: "block" }],
      description: "Semt hakkında detaylı bilgi",
    }),
    defineField({
      name: "isActive",
      title: "Aktif",
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
        subtitle: region === "avrupa" ? "Avrupa Yakası" : "Anadolu Yakası",
      };
    },
  },
});
