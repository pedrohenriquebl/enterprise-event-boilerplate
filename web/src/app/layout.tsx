import { fetchThemeFromServer } from "@/lib/theme";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Energy Summit",
  description: "Suas palestras de energia renovável em um só lugar",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await fetchThemeFromServer();
  const primaryColor =
    theme.variables["--primary"] || theme.variables["--accent"] || "#0066ff";

  return (
    <html lang="en">
      <head>
        {theme.assets?.favicon && (
          <link rel="icon" href={theme.assets.favicon} type="image/x-icon" />
        )}

        <meta name="theme-color" content={primaryColor} />

        <title>{theme.name}</title>
      </head>
      <body
        style={Object.fromEntries(Object.entries(theme.variables))}
        suppressHydrationWarning
      >
        <ThemeProvider initialTheme={theme}>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
