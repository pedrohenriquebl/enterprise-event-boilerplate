import { fallbackTheme } from "@/lib/theme/fallback-theme";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl =
      process.env.BACKEND_INTERNAL_URL || "http://localhost:3000";

    const defaultUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

    const res = await fetch(`${backendUrl}/themes`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const theme = data?.[0] ?? fallbackTheme;

    const themeWithAbsoluteAssets = {
      ...theme,
      assets: {
        logo: theme.assets?.logo
          ? `${defaultUrl}/${theme.assets.logo}`
          : undefined,
        logoFooter: theme.assets?.logoFooter
          ? `${defaultUrl}/${theme.assets.logoFooter}`
          : undefined,
        banner: theme.assets?.banner
          ? `${defaultUrl}/${theme.assets.banner}`
          : undefined,
        favicon: theme.assets?.favicon
          ? `${defaultUrl}/${theme.assets.favicon}`
          : undefined,
      },
    };

    return NextResponse.json(themeWithAbsoluteAssets);
  } catch (err) {
    return NextResponse.json(fallbackTheme);
  }
}
