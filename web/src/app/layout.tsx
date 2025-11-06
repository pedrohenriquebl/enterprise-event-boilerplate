// web/src/app/layout.tsx
import { fetchThemeFromServer } from "@/lib/theme";
import "./globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Energy Summit",
  description: "Suas palestras de energia renovável em um só lugar",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await fetchThemeFromServer();
  const bgColor = theme.variables['--body-bg'] || theme.variables['--background'] || '#FAFAFA';
  const primaryColor = theme.variables["--primary"] || theme.variables["--accent"] || "#0066ff";

  const normalizePath = (path: string | undefined) => {
    if (!path) return undefined;
    return path.startsWith('/') ? path : `/${path}`;
  };

  return (
    <html>
      <head>
        {theme.assets?.favicon && (
          <link rel="icon" href={normalizePath(theme.assets.favicon)} type="image/x-icon" />
        )}

        {theme.assets?.banner && (
          <link rel="preload" as="image" href={normalizePath(theme.assets.banner)} fetchPriority="high" />
        )}
        {theme.assets?.logo && (
          <link rel="preload" as="image" href={normalizePath(theme.assets.logo)} fetchPriority="high" />
        )}

        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              ${Object.entries(theme.variables).map(([k, v]) => `${k}: ${v};`).join('\n              ')}
            }
            
            html, body {
              background-color: ${bgColor};
              margin: 0;
              padding: 0;
            }
          `
        }} />

        <meta name="theme-color" content={primaryColor} />
      </head>
      <body
        className={archivo.className}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
