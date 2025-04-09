import { getAllDistricts } from "@/sanity/sanity-utils";
import { HomeClient } from "./home-client";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const districts = await getAllDistricts(locale);

  const activeDistricts = districts.filter((district) => district.isActive);

  return <HomeClient districts={activeDistricts} />;
}
