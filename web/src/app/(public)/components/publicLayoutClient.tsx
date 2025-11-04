import { Theme } from "@/@types/theme";
import PublicHeader from "./publicHeader";

export default function PublicLayoutClient({
    children,
    theme,
}: {
    children: React.ReactNode;
    theme: Theme | null;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* HEADER */}
            <header className="w-full">
                <div className="max-w-[1276px] mx-auto ">
                    <PublicHeader title={theme?.name} logoUrl={theme?.assets?.logo} />
                </div>
            </header>

            {/* MAIN */}
            <main
                className="flex-1 flex items-center justify-center w-full"
                style={{
                    backgroundImage: theme?.assets?.banner
                        ? `url(${theme.assets.banner})`
                        : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* FOOTER */}
            <footer className="w-full bg-gray-100">
                <div className="max-w-[1276px] mx-auto py-4 text-center">
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} Sua Empresa</p>
                </div>
            </footer>
        </div>
    );
}
