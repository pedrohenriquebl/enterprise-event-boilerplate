import { fallbackTheme } from "./fallback-theme";

export async function fetchThemeFromServer() {
  try {
    const backendUrl =
      process.env.BACKEND_INTERNAL_URL || "http://localhost:3000";

    const res = await fetch(`${backendUrl}/themes`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const themes = await res.json();
    const theme = themes?.[0] ?? fallbackTheme;

    const normalizeAssetPath = (asset: string | undefined) => {
      if (!asset) return undefined;

      if (asset.startsWith("http://") || asset.startsWith("https://")) {
        try {
          const url = new URL(asset);
          return url.pathname.startsWith("/")
            ? url.pathname.slice(1)
            : url.pathname;
        } catch {
          return asset;
        }
      }

      return asset.startsWith("/") ? asset.slice(1) : asset;
    };

    const themeWithNormalizedAssets = {
      ...theme,
      assets: {
        logo: normalizeAssetPath(theme.assets?.logo),
        logoFooter: normalizeAssetPath(theme.assets?.logoFooter),
        banner: normalizeAssetPath(theme.assets?.banner),
        favicon: normalizeAssetPath(theme.assets?.favicon),
      },
    };

    return themeWithNormalizedAssets;
  } catch (err) {
    console.error("❌ fetchThemeFromServer: Erro:", err);
    return fallbackTheme;
  }
}
