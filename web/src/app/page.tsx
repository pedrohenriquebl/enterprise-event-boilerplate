import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootRedirectPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const defaultLocale = "pt";

  if (token) redirect(`/${defaultLocale}/dashboard`);
  redirect(`/${defaultLocale}/login`);
}
