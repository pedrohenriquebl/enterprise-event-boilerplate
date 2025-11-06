"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ComponentProps } from "react";

type LocalizedLinkProps = ComponentProps<typeof Link> & {
    href: string;
};

export function LocalizedLink({ href, children, ...rest }: LocalizedLinkProps) {
    const params = useParams();
    const locale = params.locale as string;

    const finalHref =
        typeof href === "string"
            ? `/${locale}${href.startsWith("/") ? href : `/${href}`}`
            : href;

    return (
        <Link href={finalHref} {...rest}>
            {children}
        </Link>
    );
}