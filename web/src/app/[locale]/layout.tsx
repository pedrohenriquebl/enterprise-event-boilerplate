// web/src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { fetchThemeFromServer } from "@/lib/theme";

export function generateStaticParams() {
    return [{ locale: "pt" }, { locale: "en" }];
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!["pt", "en"].includes(locale)) notFound();

    const messages = await getMessages();
    const theme = await fetchThemeFromServer();

    return (
        <ThemeProvider initialTheme={theme}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <AuthProvider>{children}</AuthProvider>
            </NextIntlClientProvider>
        </ThemeProvider>
    );
}
