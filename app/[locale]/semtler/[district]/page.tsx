import * as sanityUtils from "@/sanity/sanity-utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Business } from "@/types";
import { getTranslations } from "next-intl/server";
import { PortableText } from "next-sanity";
import { AwardBadge } from "@/components/award-badge";
import BusinessCard from "@/components/business-card";

interface SemtPageProps {
  params: Promise<{
    district: string;
    locale: string;
  }>;
}

export default async function DistrictPage({ params }: SemtPageProps) {
  const resolvedParams = await params;
  const districtName = resolvedParams.district;
  const locale = resolvedParams.locale;

  const district = await sanityUtils.getDistrictBySlug(districtName, locale);
  const t = await getTranslations();

  if (!district) {
    notFound();
  }

  return (
    <div>
      {district.mainImage && (
        <div className="relative mb-8 h-[400px] w-full overflow-hidden">
          <Image
            src={district.mainImage.url}
            alt={district.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-8 left-0 w-full">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="flex items-end justify-between gap-6">
                <div className="text-white">
                  <p className="mb-2 text-xl font-medium tracking-wide opacity-90">
                    {district.description}
                  </p>
                  <h1 className="text-6xl font-bold tracking-wide">
                    {district.title}
                  </h1>
                </div>
                {district.award && (
                  <div className="mb-4 flex items-center">
                    <AwardBadge award={district.award} isInfoVisible />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
              {t(`District.${district.region}`)}
            </span>
          </div>
          <p className="text-lg text-gray-600">{district.description}</p>
        </div>
        <PortableText value={district.content} />
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            {t("District.businesses")}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {district.businesses &&
              district.businesses.map((business: Business) => (
                <BusinessCard
                  key={business._id}
                  business={business}
                  districtSlug={district.slug.current}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
