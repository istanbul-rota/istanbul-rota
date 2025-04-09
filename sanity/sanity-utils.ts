import { createClient } from "next-sanity";
import { groq } from "next-sanity";
import { District, Business, SanityImage } from "@/types";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-03-30",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImage) {
  return builder.image(source);
}

// GET all districts
export async function getAllDistricts(lang: string): Promise<District[]> {
  const districts = await client.fetch(
    groq`*[_type == "district"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      region,
      isActive,
      "award": award->{
        "title": titles[language->code == $lang][0].title,
        "description": descriptions[language->code == $lang][0].description
      }
    }`,
    { lang },
  );

  return districts.map((district: District) => ({
    ...district,
    award: district.award,
    mainImage: district.mainImage
      ? {
          url: urlFor(district.mainImage).url(),
          alt: district.mainImage.alt || district.title,
        }
      : null,
  }));
}

// GET one district
export async function getDistrictBySlug(
  slug: string,
  lang: string,
): Promise<District & { businesses: Business[] }> {
  const district = await client.fetch(
    groq`*[_type == "district" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      mainImage,
      region,
      location,
      content,
      isActive,
      "businesses": *[_type == "business" && references(^._id)] {
        _id,
        title,
        slug,
        description,
        mainImage,
        type,
        isActive
      },
      "award": award->{
        "title": titles[language->code == $lang][0].title,
        "description": descriptions[language->code == $lang][0].description
      }
    }`,
    { slug, lang },
  );

  return {
    ...district,
    mainImage: district.mainImage
      ? {
          url: urlFor(district.mainImage).url(),
          alt: district.mainImage.alt || district.title,
        }
      : null,
    businesses: district.businesses.map((business: Business) => ({
      ...business,
      mainImage: business.mainImage
        ? {
            url: urlFor(business.mainImage).url(),
            alt: business.mainImage.alt || business.title,
          }
        : null,
    })),
  };
}

// GET one business
export async function getBusinessBySlug(
  slug: string,
  lang: string,
): Promise<Business> {
  const business = await client.fetch(
    groq`*[_type == "business" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      type,
      address,
      location,
      phone,
      website,
      openingHours,
      features,
      isActive,
      mainImage,
      images,
      "description": descriptions[language->code == $lang][0].description,
      "content": contents[language->code == $lang][0].content,
      "district": district-> {
        _id,
        title,
        slug
      }
    }`,
    { slug, lang },
  );

  return {
    ...business,
    mainImage: business.mainImage
      ? {
          url: urlFor(business.mainImage).url(),
          alt: business.mainImage.alt || business.title,
        }
      : null,
    images: business.images?.map((image: SanityImage) => ({
      url: urlFor(image).url(),
      alt: image.alt || business.title,
    })),
  };
}

export async function getAllLanguages(): Promise<
  { _id: string; language: string; code: string }[]
> {
  const languages = await client.fetch(
    groq`*[_type == "language" && isActive == true]{
      _id,
      language,
      code
    } | order(language asc)`,
  );

  return languages;
}

export async function getAllCurrencies(): Promise<
  {
    _id: string;
    label: string;
    code: string;
    symbol: string;
    default?: boolean;
  }[]
> {
  return await client.fetch(
    groq`*[_type == "currency"] | order(label asc) {
      _id,
      label,
      code,
      symbol,
      default
    }`,
  );
}
