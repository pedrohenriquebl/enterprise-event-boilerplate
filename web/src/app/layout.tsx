import { fetchThemeFromServer } from "@/lib/theme";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Energy Summit",
  description: "Suas palestras de energia renovável em um só lugar",
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await fetchThemeFromServer();
  const primaryColor = theme.variables["--primary"] || theme.variables["--accent"];

  const normalizePath = (path: string | undefined) => {
    if (!path) return undefined;
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <html lang="en">
      <head>
        {theme.assets?.favicon && (
          <link rel="icon" href={normalizePath(theme.assets.favicon)} type="image/x-icon" />
        )}

        {theme.assets?.banner && (
          <link rel="preload" as="image" href={normalizePath(theme.assets.banner)} />
        )}
        {theme.assets?.logo && (
          <link rel="preload" as="image" href={normalizePath(theme.assets.logo)} />
        )}

        <meta name="theme-color" content={primaryColor} />
        <title>{theme.name}</title>
      </head>
      <body style={Object.fromEntries(Object.entries(theme.variables))} suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeProvider initialTheme={theme}>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
