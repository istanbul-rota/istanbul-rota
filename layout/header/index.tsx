"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { EarthGlobeIcon } from "@sanity/icons";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Link } from "@/i18n/navigation";
import { getAllCurrencies, getAllLanguages } from "@/sanity/sanity-utils";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/hooks/useUser";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<"region" | "currency">("region");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user, loading: isAuthLoading } = useUser();

  const [languages, setLanguages] = useState<
    { _id: string; language: string; code: string }[]
  >([]);

  const [currencies, setCurrencies] = useState<
    {
      _id: string;
      label: string;
      code: string;
      symbol: string;
      default?: boolean | undefined;
    }[]
  >([]);
  const [selectCurrency, setSelectedCurrency] = useState<string>();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchLanguages() {
      const langs = await getAllLanguages();
      setLanguages(langs);
    }

    async function fetchCurrencies() {
      const currencies = await getAllCurrencies();
      setCurrencies(currencies);

      const defaultCurrency = currencies.find((item) => item.default === true);
      if (defaultCurrency) {
        setSelectedCurrency(defaultCurrency.code);
      }
    }

    fetchLanguages();
    fetchCurrencies();
  }, []);

  const handleCurrencyChange = (code: string) => {
    setSelectedCurrency(currencies.find((item) => item.code === code)?.code);
  };

  const handleLanguageChange = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    const newPath = segments.join("/");

    router.push(newPath);
    setModalOpen(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    handleMenuClose();
    router.refresh();
  };

  const topMenuItems = [
    { label: t("Header.menu.discover"), href: "/discover" },
    { label: t("Header.menu.travels"), href: "/trips" },
    { label: t("Header.menu.comment"), href: "/review" },
  ];

  return (
    <>
      <header
        className={`bg-light sticky top-0 z-10 mt-2 flex w-full transition-all ${
          isScrolled ? "shadow-2xs" : ""
        }`}
      >
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex w-full items-center justify-between py-2">
            <div className="flex items-center gap-6">
              <GiHamburgerMenu size={24} className="block lg:hidden" />
              <Link href="/" className="flex items-center">
                <div className="bg-primary mr-2 h-12 w-12 rounded-full pt-0.5">
                  <h1 className="text-center">IR</h1>
                </div>
                <h5>İstanbul Rota</h5>
              </Link>
            </div>

            <div className="hidden lg:block">
              {topMenuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:bg-disabled rounded-full p-3 font-bold text-balance transition ease-in"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="hover:bg-disabled hidden cursor-pointer items-center gap-1 rounded-full px-4 font-bold lg:flex"
              >
                <label className="text-md">{selectCurrency}</label>
                <EarthGlobeIcon fontSize={24} />
                {locale.toUpperCase()}
              </button>

              {isAuthLoading ? (
                <div className="flex items-center">
                  <CircularProgress size={24} />
                </div>
              ) : user ? (
                <>
                  <IconButton
                    onClick={handleMenuClick}
                    className="ml-2"
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                  >
                    <Avatar
                      sx={{ width: 36, height: 36 }}
                      src={user?.user_metadata?.avatar_url}
                    >
                      {user?.user_metadata.username?.[0].toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <Link
                        href={`/user/${user?.user_metadata?.username}`}
                        className="text-inherit no-underline"
                      >
                        {t("Header.profile")}
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      {t("Header.logout")}
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  className="h1 bg-dark text-light text-md rounded-4xl p-3 hover:opacity-85"
                >
                  {t("Header.login")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
            },
          },
        }}
      >
        <DialogTitle className="px-6 pt-6 text-xl font-bold">
          {t("Header.language-title", { defaultValue: "Preferences" })}
        </DialogTitle>

        <DialogContent className="px-6 pb-6">
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              value="region"
              label={t("Header.preferences.regionLanguage", {
                defaultValue: "Region and Language",
              })}
            />
            <Tab
              value="currency"
              label={t("Header.preferences.currency", {
                defaultValue: "Currency",
              })}
            />
          </Tabs>

          {/* Region / Language Tab */}
          {activeTab === "region" ? (
            <div className="mt-6">
              <h3 className="mb-4 font-medium text-gray-700">
                {t("Header.preferences.selectedLanguage", {
                  defaultValue: "Choose a region and language",
                })}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {languages.map((item) => (
                  <Button
                    key={item._id}
                    onClick={() => handleLanguageChange(item.code)}
                    variant={locale === item.code ? "contained" : "outlined"}
                    className="flex flex-col items-start text-left normal-case"
                    sx={{ borderRadius: 4 }}
                  >
                    <span className="font-medium">{item.language}</span>
                    <span className="text-sm text-gray-500">
                      {item.code.toUpperCase()}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            // Currency Tab
            <div className="mt-6">
              <h3 className="mb-4 font-medium text-gray-700">
                {t("Header.preferences.selectCurrency", {
                  defaultValue: "Choose your currency",
                })}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {currencies.map((currency) => (
                  <Button
                    key={currency._id}
                    onClick={() => handleCurrencyChange(currency.code)}
                    variant={
                      selectCurrency === currency.code
                        ? "contained"
                        : "outlined"
                    }
                    sx={{ borderRadius: 4 }}
                    className="flex flex-col items-start text-left normal-case"
                  >
                    <span className="font-medium">
                      {currency.symbol} {currency.code}
                    </span>
                    <span className="text-sm text-gray-500">
                      {currency.label}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
