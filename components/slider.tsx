import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { District } from "@/types";
import { DistrictCard } from "./district-card";
import type { Swiper as SwiperType } from "swiper";
import { MdArrowForward } from "react-icons/md";
import { Skeleton, Box } from "@mui/material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SliderProps = {
  districts: District[];
  title?: string;
  subtitle?: string;
};

export const Slider: React.FC<SliderProps> = ({
  districts,
  title,
  subtitle,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="relative">
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h1 className="text-[2.5rem] font-bold text-gray-900">{title}</h1>
          )}
          {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
        </div>
      )}

      <div className="relative min-h-[300px]">
        {!isMounted ? (
          <Box sx={{ display: "flex", gap: 2, overflow: "hidden" }}>
            {[...Array(4)].map((_, index) => (
              <Box key={index} sx={{ flex: "0 0 300px" }}>
                <Skeleton
                  variant="rectangular"
                  width={300}
                  height={250}
                  sx={{ borderRadius: 4, mb: 1 }}
                />
                <Skeleton variant="text" width={200} height={24} />
                <Skeleton variant="text" width={150} height={20} />
              </Box>
            ))}
          </Box>
        ) : (
          <div className="transition-opacity duration-300">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1.5}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              onSlideChange={handleSlideChange}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                },
                1024: {
                  slidesPerView: 3.5,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              className="!pb-12"
            >
              {districts.map((district) => (
                <SwiperSlide key={district._id}>
                  <DistrictCard
                    award={district?.award}
                    title={district.title}
                    imageUrl={
                      district.mainImage?.url || "/images/placeholder.jpg"
                    }
                    href={`/semtler/${district.slug.current}`}
                    region={district.region}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className={`swiper-button-prev-custom absolute top-[calc(50%-24px)] -left-6 z-10 -translate-y-1/2 transform cursor-pointer rounded-full border border-gray-900 bg-white p-2 transition-colors hover:bg-gray-900 hover:[&>svg]:text-white ${
                isBeginning ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <MdArrowForward className="h-8 w-8 rotate-180 text-gray-900" />
            </button>

            <button
              className={`swiper-button-next-custom absolute top-[calc(50%-24px)] -right-6 z-10 -translate-y-1/2 transform cursor-pointer rounded-full border border-gray-900 bg-white p-2 transition-colors hover:bg-gray-900 hover:[&>svg]:text-white ${
                isEnd ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <MdArrowForward className="h-8 w-8 text-gray-900" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
