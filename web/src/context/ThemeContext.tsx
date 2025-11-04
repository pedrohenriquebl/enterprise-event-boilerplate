"use client";

import { createContext, useContext } from "react";

type Theme = {
    id: string;
    name: string;
    variables: Record<string, string>;
    assets?: {
        logo: string;
        banner: string;
        favicon: string;
    };
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({
    children,
    initialTheme,
}: {
    children: React.ReactNode;
    initialTheme: Theme;
}) {
    return (
        <ThemeContext.Provider value={initialTheme}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme deve ser usado dentro de ThemeProvider");
    return ctx;
}
