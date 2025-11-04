import { fetchThemeFromServer } from "@/lib/theme";
import PublicLayoutClient from "./components/publicLayoutClient";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const theme = await fetchThemeFromServer();

    return <PublicLayoutClient theme={theme}>{children}</PublicLayoutClient>;
}
