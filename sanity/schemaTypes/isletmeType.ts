import { defineField, defineType } from "sanity";

export default defineType({
  name: "isletme",
  title: "İşletme",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "İşletme Adı",
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
      name: "semt",
      title: "Semt",
      type: "reference",
      to: [{ type: "semt" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "İşletme Tipi",
      type: "string",
      options: {
        list: [
          { title: "Restoran", value: "restoran" },
          { title: "Kafe", value: "kafe" },
          { title: "Bar", value: "bar" },
          { title: "Otel", value: "otel" },
          { title: "Esnaf", value: "esnaf" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Kısa Açıklama",
      type: "text",
      description:
        "İşletme hakkında kısa bir açıklama (listeleme sayfalarında görünecek)",
    }),
    defineField({
      name: "content",
      title: "Detaylı İçerik",
      type: "array",
      of: [{ type: "block" }],
      description:
        "İşletme hakkında detaylı bilgi ve blog yazısı formatında içerik",
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
      name: "address",
      title: "Adres",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Konum",
      type: "geopoint",
      description: "İşletmenin harita üzerindeki konumu",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "openingHours",
      title: "Çalışma Saatleri",
      type: "object",
      fields: [
        { name: "monday", title: "Pazartesi", type: "string" },
        { name: "tuesday", title: "Salı", type: "string" },
        { name: "wednesday", title: "Çarşamba", type: "string" },
        { name: "thursday", title: "Perşembe", type: "string" },
        { name: "friday", title: "Cuma", type: "string" },
        { name: "saturday", title: "Cumartesi", type: "string" },
        { name: "sunday", title: "Pazar", type: "string" },
      ],
    }),
    defineField({
      name: "features",
      title: "Özellikler",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
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
      type: "type",
      semt: "semt.title",
    },
    prepare({ title, media, type, semt }) {
      return {
        title,
        media,
        subtitle: `${type} - ${semt}`,
      };
    },
  },
});
