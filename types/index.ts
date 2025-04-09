import { PortableTextBlock } from "sanity";

export type Region = "anatolia" | "europe";
export type BusinessType =
  | "restaurant"
  | "cafe"
  | "bar"
  | "hotel"
  | "tradesmen";

export interface SanityImage {
  url: string;
  alt?: string;
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Award {
  title: string;
  description: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface District {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  mainImage: SanityImage | null;
  region: Region;
  award?: Award;
  location?: Location;
  content: PortableTextBlock[];
  isActive: boolean;
}

export interface Business {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  content: PortableTextBlock[];
  mainImage: SanityImage | null;
  images?: SanityImage[];
  type: BusinessType;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
  phone?: string;
  website?: string;
  openingHours?: OpeningHours;
  features?: string[];
  isActive: boolean;
  district: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
}
