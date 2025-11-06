import { redirect } from "next/navigation";

export function localeRedirect(locale: string, path: string) {
  redirect(`/${locale}${path}`);
}
