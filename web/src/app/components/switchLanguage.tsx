'use client';

import Image from "next/image";
import { TriangleIcon } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function SwitchLanguage() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const [isChangingLanguage, setIsChangingLanguage] = useState<boolean>(false);

    const locales = [
        { code: "pt", label: "PT", flag: "/flag/pt-br.png" },
        { code: "en", label: "EN", flag: "/flag/en-us.png" }
    ];

    const handleLanguageChange = (lang: 'pt' | 'en') => {
        if (lang === currentLocale) {
            setIsChangingLanguage(false);
            return;
        };

        setIsChangingLanguage(true);
        router.replace(pathname, { locale: lang });
    };

    const current = locales.find(l => l.code === currentLocale);

    return (
        <>
            <div className={`
                max-w-[116px] w-full bg-(--language-auth-primary-bg) rounded-[28px] py-3.5 px-4 flex flex-col gap-4
                ${isChangingLanguage && 'hidden'}
            `}>
                <button
                    onClick={() => setIsChangingLanguage(!isChangingLanguage)}
                    className={`cursor-pointer bg-transparent border-unset flex items-center gap-4`}
                    aria-current={currentLocale === 'pt' ? 'true' : 'false'}
                >
                    <Image
                        src={current?.flag || "/flag/pt-br.png"}
                        alt="Portuguese Flag"
                        width={28}
                        height={28}
                        priority
                    />
                    <div className="flex flex-row gap-1 items-center">
                        <span className="font-bold">
                            {current?.label}
                        </span>
                        <TriangleIcon
                            className={`
                            w-1.5 h-1.5 text-black fill-black rotate-180
                            ${isChangingLanguage && 'hidden'}
                        `}
                        />
                    </div>
                </button>
            </div>
            {isChangingLanguage && (
                <div className={`
                    max-w-[116px] w-full bg-(--language-auth-primary-bg) rounded-[28px] py-3.5 px-4 flex flex-col gap-4
                    ${!isChangingLanguage && 'hidden'}
                `}>
                    {locales.map(locale => (
                        <button
                            key={locale.code}
                            onClick={() => handleLanguageChange(locale.code as "pt" | "en")}
                            className={`cursor-pointer bg-transparent border-unset flex items-center gap-4`}
                        >
                            <Image src={locale.flag} alt={locale.label} width={28} height={28} />
                            <span className="font-bold">{locale.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}