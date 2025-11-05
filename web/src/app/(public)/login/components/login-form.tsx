'use client';

import { getLoginFormSchema, LoginFormData } from "@/@types/login-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/components/ui/input";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "@/app/hooks/useAuth";
import { redirect } from "next/navigation";
import { useState } from "react";
import Spinner from '@/app/components/ui/Spinner';

export default function LoginForm() {
    const t = useTranslations('LoginPage');
    const schema = getLoginFormSchema(t);
    const { login } = useAuth();
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: LoginFormData) => {
        const { email, password } = data;
        const result = await login(email, password);

        if (result.success) {
            redirect('/dashboard');
        } else {
            setLoginError(result.message || t('InvalidCredentials'));
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-[522px] w-full bg-(--secondary-bg) p-12 flex flex-col justify-start'>
            <legend className='border-none text-white text-2xl leading-[1.3] font-bold mb-4'>Login</legend>
            {loginError && (
                <div className="flex col justify-start my-4 p-2 bg-(--background-status-incompletd) border border-(--error-color) rounded-sm">
                    <span className="text-(--error-color)">{loginError}</span>
                </div>
            )}
            <fieldset className='flex flex-col gap-4 justify-start border-none'>
                <div>
                    <Input
                        type="email"
                        {...register("email")}
                        placeholder={t('Email')}
                        autoComplete={"email"}
                    />
                    {errors.email && <span className="text-(--error-color) text-sm mt-1">{errors.email.message}</span>}
                </div>
                <div>
                    <Input
                        type="password"
                        placeholder={t('Password')}
                        {...register("password")}
                        autoComplete={"current-password"}
                    />
                    {errors.password && <span className="text-(--error-color) text-sm mt-1">{errors.password.message}</span>}
                </div>
            </fieldset>
            <Link href="/forgot-password"
                className='no-underline text-(--accent) hover:text-(--accent-dark) font-bold text-sm my-8'
            >
                {t('Retrieve Password')}
            </Link>
            <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                aria-disabled={isSubmitting}
                className='w-fit py-3.5 px-4 border-none bg-(--accent) hover:bg-(--accent-dark) cursor-pointer
                    text-(--text-secondary) font-bold text-sm leading-[1.4] transition-colors duration-300 ease flex items-center'
            >
                {isSubmitting ? (
                    <>
                        <Spinner className="animate-spin -ml-1 mr-2 h-4 w-4" size={16} />
                        <span>{t('Login')}</span>
                    </>
                ) : (
                    <span>{t('Login')}</span>
                )}
            </button>
        </form>
    )
}