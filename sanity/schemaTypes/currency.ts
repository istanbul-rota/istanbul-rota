import { defineType } from "sanity";

export default defineType({
  name: "currency",
  title: "Currency",
  type: "document",
  fields: [
    {
      name: "label",
      title: "Currency Name",
      type: "string",
      description: "Example: US Dollar, Turkish Lira",
    },
    {
      name: "code",
      title: "Currency Code",
      type: "string",
      description: "Example: USD, TRY",
    },
    {
      name: "symbol",
      title: "Symbol",
      type: "string",
      description: "Example: $, ₺, €",
    },
    {
      name: "default",
      title: "Default",
      type: "boolean",
      description: "Is this the default currency?",
    },
  ],
  preview: {
    select: {
      title: "label",
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
