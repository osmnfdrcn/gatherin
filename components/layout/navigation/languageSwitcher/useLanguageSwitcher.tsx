import { useLocale } from "next-intl";
import { usePathname } from "next-intl/client";

export const useLanguageSwitcher = () => {
  const locale = useLocale();
  const otherLocale = locale === "en" ? "tr" : "en";
  const pathname = usePathname();
  return { locale, otherLocale, pathname };
};
