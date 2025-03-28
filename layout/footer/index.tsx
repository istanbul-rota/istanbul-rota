"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("Footer");

  const footerSections = [
    {
      title: t("about.title"),
      items: [
        { label: t("about.aboutUs"), href: "/about" },
        { label: t("about.press"), href: "/press" },
        { label: t("about.resources"), href: "/resources" },
        { label: t("about.careers"), href: "/careers" },
        { label: t("about.trust"), href: "/trust" },
        { label: t("about.contact"), href: "/contact" },
        { label: t("about.accessibility"), href: "/accessibility" },
      ],
    },
    {
      title: t("explore.title"),
      items: [
        { label: t("explore.writeReview"), href: "/write-review" },
        { label: t("explore.addPlace"), href: "/add-place" },
        { label: t("explore.join"), href: "/join" },
        { label: t("explore.travelers"), href: "/travelers-choice" },
        { label: t("explore.help"), href: "/help" },
      ],
    },
    {
      title: t("business.title"),
      items: [
        { label: t("business.owners"), href: "/business-owners" },
        { label: t("business.advantage"), href: "/business" },
        { label: t("business.sponsored"), href: "/sponsored" },
        { label: t("business.advertise"), href: "/advertise" },
        { label: t("business.api"), href: "/api" },
      ],
    },
  ];

  const appLinks = [
    { label: t("app.download"), href: "/app" },
    { label: t("app.ios"), href: "/ios" },
    { label: t("app.android"), href: "/android" },
  ];

  const legalLinks = [
    { label: t("legal.terms"), href: "/terms" },
    { label: t("legal.privacy"), href: "/privacy" },
    { label: t("legal.cookie"), href: "/cookie-consent" },
    { label: t("legal.sitemap"), href: "/sitemap" },
    { label: t("legal.howItWorks"), href: "/how-it-works" },
    { label: t("legal.contact"), href: "/contact" },
  ];

  return (
    <footer className="mt-auto bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <h6 className="mb-4 text-sm font-bold text-gray-900">
                {section.title}
              </h6>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col">
            <ul className="space-y-2">
              {appLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-4 border-t border-gray-200 pt-8">
          <div className="flex items-center space-x-6">
            <Link
              href="/facebook"
              className="text-gray-400 hover:text-gray-600"
            >
              <FaFacebook size={24} />
            </Link>
            <Link href="/twitter" className="text-gray-400 hover:text-gray-600">
              <FaTwitter size={24} />
            </Link>
            <Link
              href="/instagram"
              className="text-gray-400 hover:text-gray-600"
            >
              <FaInstagram size={24} />
            </Link>
            <Link href="/youtube" className="text-gray-400 hover:text-gray-600">
              <FaYoutube size={24} />
            </Link>
            <Link href="/tiktok" className="text-gray-400 hover:text-gray-600">
              <FaTiktok size={24} />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-gray-500">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>

          <p className="mt-4 max-w-3xl text-center text-xs text-gray-500">
            {t("languageInfo")}
          </p>
        </div>
      </div>
    </footer>
  );
}
