import { getDistrictBySlug } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Isletme } from "@/types";
import { getTranslations } from "next-intl/server";

interface SemtPageProps {
  params: Promise<{
    "semt-adı": string;
  }>;
}

export default async function SemtPage({ params }: SemtPageProps) {
  const resolvedParams = await params;
  const districtName = resolvedParams["semt-adı"];

  const semt = await getDistrictBySlug(districtName);
  const t = await getTranslations();

  if (!semt) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {semt.mainImage && (
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-xl">
          <Image
            src={semt.mainImage.url}
            alt={semt.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{semt.title}</h1>
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
            {semt.region === "avrupa" ? "Avrupa Yakası" : "Anadolu Yakası"}
          </span>
        </div>
        <p className="text-lg text-gray-600">{semt.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          {t("District.businesses")}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {semt.isletmeler.map((isletme: Isletme) => (
            <Link
              key={isletme._id}
              href={`/semtler/${semt.slug.current}/isletmeler/${isletme.slug.current}`}
              className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg"
            >
              {isletme.mainImage && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={isletme.mainImage.url}
                    alt={isletme.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{isletme.title}</h3>
                <p className="line-clamp-2 text-gray-600">
                  {isletme.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-sm">
                    {isletme.type}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
