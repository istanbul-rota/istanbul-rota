import { getBusinessBySlug } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PortableText } from "next-sanity";
import { workingHours } from "@/utils";

interface BusinessesPageProps {
  params: Promise<{
    business: string;
    district: string;
    locale: string;
  }>;
}

export default async function BusinessPage({ params }: BusinessesPageProps) {
  const { business, locale } = await params;
  const thisBusiness = await getBusinessBySlug(business, locale);
  const t = await getTranslations();

  let formattedHours;

  if (thisBusiness.openingHours) {
    formattedHours = workingHours(thisBusiness.openingHours);
  }

  if (!thisBusiness) {
    console.log("Business not found for slug:", thisBusiness);
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4">
        <Link
          href={`/semtler/${thisBusiness.district.slug.current}`}
          className="text-blue-600 hover:underline"
        >
          ← {thisBusiness.district.title + " " + t("District.return-back")}
        </Link>
      </div>

      {thisBusiness?.mainImage && (
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-xl">
          <Image
            src={thisBusiness.mainImage.url}
            alt={thisBusiness.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{thisBusiness.title}</h1>
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
            {t(`General.${thisBusiness.type}`)}
          </span>
        </div>
        <p className="text-lg text-gray-600">{thisBusiness.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="prose max-w-none">
            {/* Burada Portable Text render edilecek */}
            <PortableText value={thisBusiness.content} />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              {t("Business.contact")}
            </h2>
            <p>{thisBusiness.address}</p>
            {thisBusiness.phone && <p>Tel: {thisBusiness.phone}</p>}
            {thisBusiness.website && (
              <a
                href={thisBusiness.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Website
              </a>
            )}
          </div>

          {thisBusiness.openingHours && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">
                {t("Business.working-hours")}
              </h2>
              <ul className="space-y-1">
                {Array.isArray(formattedHours) &&
                  formattedHours.length > 0 &&
                  formattedHours.map(
                    ({ day, hours, isToday, isCurrentlyOpen }) => (
                      <div
                        key={day}
                        className={`flex justify-between rounded p-2 ${
                          isToday ? "bg-primary/10" : ""
                        }`}
                      >
                        <span className="font-medium capitalize">
                          {t(`General.${day}`)}
                          {isToday && (
                            <span
                              className={`ml-2 text-sm ${
                                isCurrentlyOpen
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {isCurrentlyOpen
                                ? t("Business.open")
                                : t("Business.closed")}
                            </span>
                          )}
                        </span>
                        <span className={isToday ? "font-semibold" : ""}>
                          {hours === "closed" ? (
                            <span className="text-red-600">
                              {t("Business.closed")}
                            </span>
                          ) : (
                            <span className="text-gray-600">{hours}</span>
                          )}
                        </span>
                      </div>
                    ),
                  )}
              </ul>
            </div>
          )}

          {thisBusiness.features && thisBusiness.features.length > 0 && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">
                {t("Business.features")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {thisBusiness.features.map((feature: string) => (
                  <span
                    key={feature}
                    className="rounded-full bg-gray-100 px-2 py-1 text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
