import { fetchThemeFromServer } from "@/lib/theme/fetch-theme";
import PublicLayoutClient from "./components/publicLayoutClient";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    const theme = await fetchThemeFromServer();
    return <PublicLayoutClient theme={theme}>{children}</PublicLayoutClient>;
}