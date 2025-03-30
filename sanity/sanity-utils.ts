import { createClient } from "next-sanity";
import { groq } from "next-sanity";
import { Semt, Isletme } from "@/types";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-03-30",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Tüm semtleri getir
export async function getAllDistricts(): Promise<Semt[]> {
  const semts = await client.fetch(
    groq`*[_type == "semt"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      region,
      isActive
    }`,
  );

  return semts.map((semt: any) => ({
    ...semt,
    mainImage: semt.mainImage
      ? {
          url: urlFor(semt.mainImage).url(),
          alt: semt.mainImage.alt || semt.title,
        }
      : null,
  }));
}

// Tek bir semti getir
export async function getDistrictBySlug(
  slug: string,
): Promise<Semt & { isletmeler: Isletme[] }> {
  const semt = await client.fetch(
    groq`*[_type == "semt" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      mainImage,
      region,
      location,
      content,
      isActive,
      "isletmeler": *[_type == "isletme" && references(^._id)] {
        _id,
        title,
        slug,
        description,
        mainImage,
        type,
        isActive
      }
    }`,
    { slug },
  );

  return {
    ...semt,
    mainImage: semt.mainImage
      ? {
          url: urlFor(semt.mainImage).url(),
          alt: semt.mainImage.alt || semt.title,
        }
      : null,
    isletmeler: semt.isletmeler.map((isletme: any) => ({
      ...isletme,
      mainImage: isletme.mainImage
        ? {
            url: urlFor(isletme.mainImage).url(),
            alt: isletme.mainImage.alt || isletme.title,
          }
        : null,
    })),
  };
}

// Tek bir işletmeyi getir
export async function getIsletmeBySlug(slug: string): Promise<Isletme> {
  const isletme = await client.fetch(
    groq`*[_type == "isletme" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      content,
      mainImage,
      images,
      type,
      address,
      location,
      phone,
      website,
      openingHours,
      features,
      isActive,
      "semt": semt-> {
        _id,
        title,
        slug
      }
    }`,
    { slug },
  );

  return {
    ...isletme,
    mainImage: isletme.mainImage
      ? {
          url: urlFor(isletme.mainImage).url(),
          alt: isletme.mainImage.alt || isletme.title,
        }
      : null,
    images: isletme.images?.map((image: any) => ({
      url: urlFor(image).url(),
      alt: image.alt || isletme.title,
    })),
  };
}
