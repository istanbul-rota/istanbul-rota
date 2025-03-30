import { getIsletmeBySlug } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Isletme } from "@/types";
import { getTranslations } from "next-intl/server";
import { PortableText } from "next-sanity";

interface IsletmePageProps {
  params: {
    "semt-adı": string;
    "isletme-adi": string;
  };
}

export default async function IsletmePage({ params }: IsletmePageProps) {
  const isletme = await getIsletmeBySlug((await params)["isletme-adi"]);
  const t = await getTranslations();

  if (!isletme) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4">
        <Link
          href={`/semtler/${isletme.semt.slug.current}`}
          className="text-blue-600 hover:underline"
        >
          ← {isletme.semt.title + " " + t("District.return-back")}
        </Link>
      </div>

      {isletme.mainImage && (
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-xl">
          <Image
            src={isletme.mainImage.url}
            alt={isletme.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{isletme.title}</h1>
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
            {isletme.type}
          </span>
        </div>
        <p className="text-lg text-gray-600">{isletme.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="prose max-w-none">
            {/* Burada Portable Text render edilecek */}
            <PortableText value={isletme.content} />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-semibold">
              {t("Isletme.iletisim")}
            </h2>
            <p>{isletme.address}</p>
            {isletme.phone && <p>Tel: {isletme.phone}</p>}
            {isletme.website && (
              <a
                href={isletme.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Website
              </a>
            )}
          </div>

          {isletme.openingHours && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">
                {t("Isletme.calismaSaatleri")}
              </h2>
              <ul className="space-y-1">
                {Object.entries(isletme.openingHours).map(([day, hours]) => (
                  <li key={day}>
                    <span className="font-medium">{day}:</span> {hours}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isletme.features && isletme.features.length > 0 && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">
                {t("Isletme.ozellikler")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {isletme.features.map((feature: string) => (
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
