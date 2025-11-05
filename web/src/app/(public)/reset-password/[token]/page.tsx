import { redirect } from "next/navigation";
import ResetPasswordForm from "./components/reset-password-form";

type ResetPasswordPageProps = {
    params: Promise<{ token?: string }>;
    searchParams: Promise<{ email?: string }>;
};

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({ params, searchParams }: ResetPasswordPageProps) {
    const resolvedParams = await params;
    const resolvedSearch = await searchParams;

    const token = resolvedParams?.token || "";
    const email = resolvedSearch?.email || "";

    if (!token) redirect("/login");

    return (
        <section className="w-full mx-auto">
            <ResetPasswordForm token={token} email={email} />
        </section>
    );
}
