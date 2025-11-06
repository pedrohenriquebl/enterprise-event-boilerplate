import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createIntlMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/api/theme",
    "/themes",
  ];

  const assetExtensions = [
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".ico",
    ".webp",
  ];

  const isAsset = assetExtensions.some((ext) => pathname.endsWith(ext));

  if (
    isAsset ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/logo/") ||
    pathname.startsWith("/banner/") ||
    pathname.startsWith("/flags/")
  ) {
    return NextResponse.next();
  }

  const i18nResponse = handleI18nRouting(request);

  if (i18nResponse.status === 307 || i18nResponse.status === 308) {
    return i18nResponse;
  }

  const pathnameWithoutLocale = pathname.replace(/^\/(pt|en)/, "") || "/";
  const isPublicPath = publicPaths.some((path) =>
    pathnameWithoutLocale.startsWith(path)
  );

  if (isPublicPath) {
    return i18nResponse;
  }

  // TODO: Descomentar quando o backend estiver pronto
  // Verifica se o usuário está autenticado
  // const token = request.cookies.get("token")?.value;
  // if (!token) {
  //   // Redireciona para login mantendo o locale
  //   const locale = pathname.split("/")[1];
  //   const validLocale = ["pt", "en"].includes(locale) ? locale : "pt";
  //   return NextResponse.redirect(new URL(`/${validLocale}/login`, request.url));
  // }

  return i18nResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
