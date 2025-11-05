import Image from "next/image";
import SwitchLanguage from "./switchLanguage";

type PublicHeaderProps = {
    title?: string;
    logoUrl?: string;
}

export default function PublicHeader({ title, logoUrl }: PublicHeaderProps) {
    return (
        <header className="flex items-center justify-between my-6 px-6 md:px-12 gap-6">
            <Image
                src={logoUrl || '/logo/logo-energy.svg'}
                alt={`Logo for ${title}`}
                width={134}
                height={54}
                priority
                loading="eager"
                crossOrigin="anonymous"
            />
            <SwitchLanguage />
        </header>
    );
}