import { routing } from "@/i18n/routing";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Lato, Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { AppProvider } from "./AppProvider";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import "./globals.css";

// Yazılar
const lato = Lato({
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
});

// Başlıklar
const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "tr" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${lato.className} ${lato.variable} ${raleway.variable} ${raleway.className}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <AppProvider>
                <Header />
                {children}
                <Footer />
              </AppProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
