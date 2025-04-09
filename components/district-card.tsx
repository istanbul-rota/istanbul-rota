import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Award } from "@/types";
import { AwardBadge } from "@/components/award-badge";

type DistrictCardProps = {
  title: string;
  imageUrl: string;
  href: string;
  region?: string;
  award?: Award;
};

export const DistrictCard: React.FC<DistrictCardProps> = ({
  title,
  imageUrl,
  href,
  award,
}) => {
  return (
    <Link
      href={href}
      className="group relative block aspect-square w-full overflow-hidden rounded-2xl"
    >
      {/* Kart Resmi */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Siyah Perde */}
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0" />

      {/* Bölge Badge */}
      {award && (
        <div className="absolute top-4 left-4 z-10">
          <AwardBadge award={award} />
        </div>
      )}

      {/* Başlık */}
      <div className="absolute right-8 bottom-8 left-8 transition-all duration-300 group-hover:translate-y-8 group-hover:opacity-0">
        <h2 className="leading-tight font-bold text-white">{title}</h2>
      </div>
    </Link>
  );
};
