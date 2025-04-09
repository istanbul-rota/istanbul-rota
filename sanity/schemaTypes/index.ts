import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import districtType from "./district";
import businessType from "./business";
import awardType from "./award";
import languageType from "./language";
import currencyType from "./currency";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    districtType,
    businessType,
    awardType,
    languageType,
    currencyType,
  ],
};
