
import { Theme } from "@/@types/theme";
import PublicHeader from "./publicHeader";

export default function PublicLayoutClient({
    children,
    theme,
}: {
    children: React.ReactNode;
    theme: Theme;
}) {
    const bg = theme?.assets?.banner?.startsWith("/")
        ? theme.assets.banner
        : `/${theme?.assets?.banner ?? ""}`;

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden"
            style={{
                background: `url(${bg}) center/cover no-repeat, linear-gradient(180deg, 
                    var(--background-public-page-safeguard, var(--background-public-page-safeguard) 0%, #043C24 100%)`,
            }}
        >

            <header className="w-full bg-white relative z-10">
                <div className="w-full">
                    <PublicHeader title={'Logo'} logoUrl={'/logo/logo-energy.svg'} />
                </div>
            </header>

            <main className={`flex-1 flex items-center justify-center w-full relative z-10`}
            >
                <div className="w-full px-4 md:px-12">
                    {children}
                </div>
            </main>

            <footer className="w-full bg-gray-100 relative z-10">
                <div className="max-w-[1276px] mx-auto py-4 text-center">
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} Sua Empresa</p>
                </div>
            </footer>
        </div>
    );
}
