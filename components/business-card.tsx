import Image from "next/image";
import Link from "next/link";
import { Business } from "@/types";
import { useTranslations } from "next-intl";

interface BusinessCardProps {
  business: Business;
  districtSlug: string;
}

export default function BusinessCard({
  business,
  districtSlug,
}: BusinessCardProps) {
  const t = useTranslations();
  return (
    <Link
      href={`/semtler/${districtSlug}/${business.slug.current}`}
      className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg"
    >
      {business.mainImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={business.mainImage.url}
            alt={business.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold">{business.title}</h3>
        <p className="line-clamp-2 text-gray-600">{business.description}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-gray-100 px-2 py-1 text-sm">
            {t(`General.${business.type}`)}
          </span>
        </div>
      </div>
    </Link>
  );
}
