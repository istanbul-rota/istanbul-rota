"use client";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { EarthGlobeIcon } from "@sanity/icons";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(window.scrollY > 0);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topMenuItems = [
    { label: t("Header.menu.discover"), href: "/discover" },
    { label: t("Header.menu.travels"), href: "/trips" },
    { label: t("Header.menu.comment"), href: "/review" },
  ];

  const mainMenuItems = [
    { label: "Oteller", href: "/hotels" },
    { label: "Yapılacak Şeyler", href: "/things-to-do" },
    { label: "Restoranlar", href: "/restaurants" },
    { label: "Uçak Biletleri", href: "/flights" },
    { label: "Gemi Seyahatleri", href: "/cruises" },
    { label: "Kiralık Arabalar", href: "/rentals" },
  ];

  return (
    <header
      className={`bg-light sticky top-0 z-10 mt-2 flex w-full transition-all ${isScrolled ? "shadow-2xs" : ""}`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex w-full items-center justify-between py-2">
          {/* LOGO */}
          <div className="flex items-center gap-6">
            <GiHamburgerMenu size={24} className="block lg:hidden" />
            <Link href={"/"} className="flex items-center">
              <div className="bg-primary mr-2 h-12 w-12 rounded-full pt-0.5">
                <h1 className="text-center">IR</h1>
              </div>
              <h5>İstanbul Rota</h5>
            </Link>
          </div>

          {/* LİNKLER */}
          <div className="hidden lg:block">
            {topMenuItems.map((item, index) => (
              <Link
                className="hover:bg-disabled rounded-full p-3 font-bold text-balance transition ease-in"
                href={`/${item.href}`}
                key={index}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* AUTH ve DİLLER */}
          <div className="flex gap-2">
            <button className="hover:bg-disabled hidden cursor-pointer items-center gap-1 rounded-full px-4 font-bold lg:flex">
              <EarthGlobeIcon fontSize={24} />
              {locale.toUpperCase()}
            </button>
            <Link
              href={"/auth"}
              className="h1 bg-dark text-light text-md rounded-4xl p-3 hover:opacity-85"
            >
              {t("Header.login")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
