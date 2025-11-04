import { fallbackTheme } from "./fallback-theme";

export async function fetchThemeFromServer() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/themes`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data?.[0] ?? fallbackTheme;
  } catch (err) {
    console.error("❌ Falha ao buscar tema:", err);
    return fallbackTheme;
  }
}
