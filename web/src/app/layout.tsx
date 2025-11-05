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

// Força rendering dinâmico (não tenta gerar estático no build)
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await fetchThemeFromServer();
  const primaryColor = theme.variables["--primary"] || theme.variables["--accent"] || "#0066ff";
  const bgColor = theme.variables['--body-bg'] || theme.variables['--background'] || '#FAFAFA';

  // Normaliza paths para começar com / (padrão Next.js public)
  const normalizePath = (path: string | undefined) => {
    if (!path) return undefined;
    return path.startsWith('/') ? path : `/${path}`;
  };

  const bannerPath = normalizePath(theme.assets?.banner) || '/banner/login-background.png';
  
  // LQIP para evitar flash branco
  const lqip = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='100%25' height='100%25' fill='${encodeURIComponent(bgColor)}'/%3E%3C/svg%3E`;

  return (
    <html lang="en">
      <head>
        {theme.assets?.favicon && (
          <link rel="icon" href={normalizePath(theme.assets.favicon)} type="image/x-icon" />
        )}

        {theme.assets?.banner && (
          <link rel="preload" as="image" href={bannerPath} />
        )}
        {theme.assets?.logo && (
          <link rel="preload" as="image" href={normalizePath(theme.assets.logo)} />
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                background-color: ${bgColor};
              }
              
              /* Background para páginas públicas - aplicado no body quando necessário */
              body.public-page {
                background-color: ${bgColor};
                background-image: url("${lqip}"), url("${bannerPath}");
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                background-attachment: fixed;
              }
            `
          }}
        />

        <meta name="theme-color" content={primaryColor} />
        <title>{theme.name}</title>
      </head>
      <body style={Object.fromEntries(Object.entries(theme.variables))} suppressHydrationWarning>
        <ThemeProvider initialTheme={theme}>
          <NextIntlClientProvider>
            <AuthProvider>{children}</AuthProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
