import createMiddleware from "next-intl/middleware";
export const dynamic = "force-dynamic";
export default createMiddleware({
  locales: ["en", "tr"],
  defaultLocale: "tr",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
