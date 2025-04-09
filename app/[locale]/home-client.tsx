"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { RiHomeLine } from "react-icons/ri";
import { SearchInput } from "@/components/search-input";
import { CgCoffee } from "react-icons/cg";
import { IoCameraOutline } from "react-icons/io5";
import { IoRestaurantOutline } from "react-icons/io5";
import { useState } from "react";
import { Filter } from "@/types/Filter";
import { Slider } from "@/components/slider";
import { District } from "@/types";

const ICON_SIZE = 24;

type HomeClientProps = {
  districts: District[];
};

export const HomeClient: React.FC<HomeClientProps> = ({ districts }) => {
  const t = useTranslations();
  const [filterState, setFilterState] = useState<Filter>(Filter.ALL);
  const year = new Date();
  const filters = [
    {
      field: t("Home.filter.all"),
      icon: <RiHomeLine size={ICON_SIZE} />,
      filterName: Filter.ALL,
      headerText: t("Home.where-to"),
    },
    {
      field: t("Home.filter.cafe"),
      icon: <CgCoffee size={ICON_SIZE} />,
      filterName: Filter.CAFE,
      headerText: t("Home.where-to-cafe"),
    },
    {
      field: t("Home.filter.to-do"),
      icon: <IoCameraOutline size={ICON_SIZE} />,
      filterName: Filter.TODO,
      headerText: t("Home.where-to-todo"),
    },
    {
      field: t("Home.filter.restaurants"),
      icon: <IoRestaurantOutline size={ICON_SIZE} />,
      filterName: Filter.RESTAURANTS,
      headerText: t("Home.where-to-restaurants"),
    },
  ];

  const currentFilter = filters.find((f) => f.filterName === filterState);

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <div className="my-8 flex flex-col items-center space-y-6">
        <h1 className="text-6xl">{currentFilter?.headerText}</h1>
        <div className="flex gap-6">
          {filters.map((filter, index) => (
            <div
              key={index.toString()}
              onClick={() => setFilterState(filter.filterName)}
              className={`flex cursor-pointer items-center gap-1 border-b-2 ${filterState === filter.filterName ? "border-dark" : "border-light"} hover:border-dark hover:opacity-70`}
            >
              {filter.icon}
              <h5 className="font-bold">{filter.field}</h5>
            </div>
          ))}
        </div>
        <SearchInput filter={filterState} />
      </div>

      <div className="relative mt-16 h-[420px] w-full overflow-hidden rounded-xl">
        <Image
          src={"/images/banner2.jpg"}
          alt="İstanbul Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute top-6 left-8 text-white">
          <div className="flex flex-col space-y-6">
            <div>
              <h1>{t("Home.banner.title")}</h1>
              <h5 className="text-base text-gray-100">
                {t("Home.banner.description")}
              </h5>
            </div>
            <Link
              className="bg-light text-dark hover:bg-opacity-90 inline-flex self-start rounded-full px-6 py-3 font-medium"
              href={"/"}
            >
              Buradan Başlayın
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Slider
          districts={districts}
          title={t("Home.discover-istanbul")}
          subtitle={t("Home.discover-istanbul-subtitle", {
            year: year.getFullYear(),
          })}
        />
      </div>
    </div>
  );
};
