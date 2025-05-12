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
      className="group relative flex h-[200px] w-full overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
    >
      {business.mainImage && (
        <>
          <div className="relative h-full w-[300px] flex-shrink-0 overflow-hidden">
            <Image
              src={business.mainImage.url}
              alt={business.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <div className="mb-2 flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span className="text-sm font-medium text-gray-600">
                  {t(`General.${business.type}`)}
                </span>
              </div>
              <h3 className="mb-2 line-clamp-1 text-xl font-bold">
                {business.title}
              </h3>
              <p className="line-clamp-2 text-sm text-gray-600">
                {business.description}
              </p>
            </div>
          </div>
        </>
      )}
    </Link>
  );
}
