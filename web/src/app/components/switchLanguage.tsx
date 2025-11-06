'use client';

import Image from "next/image";
import { TriangleIcon } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function SwitchLanguage() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const handleLanguageChange = (lang: 'pt' | 'en') => {
        router.replace(pathname, { locale: lang });
    };

    return (
        <div className="max-w-[116px] w-full bg-(--language-auth-primary-bg) rounded-[28px] py-3.5 px-4 flex flex-col gap-4">
            <button
                onClick={() => handleLanguageChange('pt')}
                className={`cursor-pointer bg-transparent border-unset flex items-center gap-4 ${currentLocale === 'pt' ? 'opacity-100' : 'opacity-60'}`}
                aria-current={currentLocale === 'pt' ? 'true' : 'false'}
            >
                <Image
                    src="/flag/pt-br.png"
                    alt="Portuguese Flag"
                    width={28}
                    height={28}
                    priority
                />
                <div className="flex flex-row gap-1 items-center">
                    <span className="font-bold">
                        PT
                    </span>
                    <TriangleIcon className="w-2 h-2 text-black fill-black rotate-180" />
                </div>
            </button>
            <button
                onClick={() => handleLanguageChange('en')}
                className={`cursor-pointer bg-transparent border-unset flex items-center gap-4 ${currentLocale === 'en' ? 'opacity-100' : 'opacity-60'}`}
                aria-current={currentLocale === 'en' ? 'true' : 'false'}
            >
                <Image
                    src="/flag/en-us.png"
                    alt="English Flag"
                    width={28}
                    height={28}
                    priority
                />
                <div className="flex flex-row gap-1 items-center">
                    <span className="font-bold">
                        EN
                    </span>
                    <TriangleIcon className="w-2 h-2 text-black fill-black rotate-180" />
                </div>
            </button>
        </div>
    );
}