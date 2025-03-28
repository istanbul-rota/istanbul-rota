import { routing } from "@/i18n/routing";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Lato, Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import { AppProvider } from "./AppProvider";
import "./globals.css";
import Footer from "@/layout/footer";
import Header from "@/layout/header";

// Yazılar
const lato = Lato({
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
});

// Başlıklar
const raleway = Raleway({
  weight: ["400", "600", "700"],
  variable: "--font-raleway",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${lato.className} ${lato.variable} ${raleway.className} ${raleway.variable}`}
    >
      <body>
        <NextIntlClientProvider>
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
