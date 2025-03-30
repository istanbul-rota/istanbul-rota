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

export interface Semt {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  mainImage: SanityImage | null;
  region: "avrupa" | "anadolu";
  location?: {
    lat: number;
    lng: number;
  };
  content?: any[];
  isActive: boolean;
}

export interface Isletme {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  content: any[];
  mainImage: SanityImage | null;
  images?: SanityImage[];
  type: "restoran" | "kafe" | "bar" | "otel" | "esnaf";
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
  semt: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
}
