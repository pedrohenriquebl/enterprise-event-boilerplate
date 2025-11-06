'use client';

import { ForgotPasswordFormData, getForgotPasswordFormSchema } from "@/@types/forgot-password-form";
import { Input } from "@/app/components/ui/input";
import Spinner from "@/app/components/ui/Spinner";
import { useAuth } from "@/app/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgetPasswordForm() {
    const t = useTranslations('ForgotPasswordPage');
    const { forgotPassword } = useAuth();
    const schema = getForgotPasswordFormSchema(t);
    const [retrievePasswordError, setRetrievePasswordError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        const { email } = data;
        const result = await forgotPassword(email);

        if (result.success) {
            setSuccessMessage(true);
            setRetrievePasswordError(null);
            return;
        }

        setSuccessMessage(false);
        setRetrievePasswordError(t("We were unable to find any users with the email address provided"));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='max-w-[522px] w-full bg-(--secondary-bg) p-12 flex flex-col justify-start'>
            <legend className='border-none text-white text-2xl leading-[1.3] font-bold mb-10'>{t('Retrieve Password')}</legend>
            {retrievePasswordError && (
                <div className="flex col justify-start my-4 p-2 bg-(--background-status-incompletd) border border-(--error-color) rounded-sm">
                    <span className="text-(--error-color)">{retrievePasswordError}</span>
                </div>
            )}
            {successMessage && (
                <div className="flex col justify-start my-4 p-2 bg-(--status-completed-bg) border border-(--text-status-completed) rounded-sm">
                    <span className="text-black)">{t("SuccesForgetPasswordMessage")}</span>
                </div>
            )}
            <fieldset className='flex flex-col gap-4 justify-start border-none'>
                <div>
                    <Input
                        type="email"
                        {...register("email")}
                        placeholder={'E-mail'}
                        autoComplete={"email"}
                    />
                    {errors.email && <span className="text-(--error-color) text-sm mt-1">{errors.email.message}</span>}
                </div>
            </fieldset>
            <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                aria-disabled={isSubmitting}
                className='w-fit mt-10 py-3.5 px-4 border-none bg-(--accent) hover:bg-(--accent-dark) cursor-pointer
                    text-(--text-secondary) font-bold text-sm leading-[1.4] transition-colors duration-300 ease flex items-center'
            >
                {isSubmitting ? (
                    <>
                        <Spinner className="animate-spin -ml-1 mr-2 h-4 w-4" size={16} />
                        <span>{t('Send')}</span>
                    </>
                ) : (
                    <span>{t('Send')}</span>
                )}
            </button>
        </form>
    )
}