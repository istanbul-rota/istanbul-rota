import { getAllDistricts } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { District } from "@/types";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function DistrictsPage({ params }: PageProps) {
  const { locale } = await params;
  const semts = await getAllDistricts(locale);
  const t = await getTranslations();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">{t("Semtler.title")}</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {semts.map((semt: District) => (
          <Link
            key={semt._id}
            href={`/semtler/${semt.slug.current}`}
            className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg"
          >
            {semt.mainImage && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={semt.mainImage.url}
                  alt={semt.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold">{semt.title}</h2>
              <p className="line-clamp-2 text-gray-600">{semt.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-sm">
                  {semt.region}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
