'use client';

import { getResetPasswordFormSchema, ResetPasswordFormData } from "@/@types/reset-password-form";
import { Input } from "@/app/components/ui/input";
import Spinner from "@/app/components/ui/Spinner";
import { authService } from "@/lib/auth/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ResetPasswordFormProps = {
    token: string;
    email: string;
}

export default function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
    const t = useTranslations('PasswordResetPage');
    const schema = getResetPasswordFormSchema(t);
    const [passwordResetError, setRetrievePasswordError] = useState<string | null>(null);
    const [equalPasswordError, setEqualPasswordError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    const [invalidTokenError, setInvalidTokenError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email,
            token,
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setEqualPasswordError(t("PasswordsDoNotMatch"));
            return;
        } else {
            setEqualPasswordError(null);
        }

        try {
            const result = await authService.resetPassword(data.token, data.email, password);

            if (result.success) {
                setSuccessMessage(true);
                setRetrievePasswordError(null);
                setInvalidTokenError(null);
            } else {
                setSuccessMessage(false);
                setRetrievePasswordError(t("InvalidToken"));
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setRetrievePasswordError(err.message);
            }

            setSuccessMessage(false);
            setRetrievePasswordError(null);
            setInvalidTokenError(t("InvalidToken"));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='max-w-[522px] w-full bg-(--secondary-bg) p-12 flex flex-col justify-start'>
            <legend className='border-none text-white text-2xl leading-[1.3] font-bold mb-10'>{t('Reset Password')}</legend>
            {successMessage && (
                <div className="flex col justify-start my-4 p-2 bg-(--status-completed-bg) border border-(--text-status-completed) rounded-sm">
                    <span className="text-black)">{t("SuccessResetPasswordMessage")}</span>
                </div>
            )}
            {(equalPasswordError || passwordResetError || invalidTokenError) && (
                <div className="flex col justify-start my-4 p-2 bg-(--background-status-incompletd) border border-(--error-color) rounded-sm gap-2">
                    {equalPasswordError && <span className="text-(--error-color)">{equalPasswordError}</span>}
                    {passwordResetError && <span className="text-(--error-color)">{passwordResetError}</span>}
                    {invalidTokenError && <span className="text-(--error-color)">{invalidTokenError}</span>}
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
                <div>
                    <Input
                        type="password"
                        {...register("password")}
                        placeholder={t('Password')}
                        autoComplete={"new-password"}
                    />
                    {errors.password && <span className="text-(--error-color) text-sm mt-1">{errors.password.message}</span>}
                </div>
                <div>
                    <Input
                        type="password"
                        {...register("confirmPassword")}
                        placeholder={t('Confirm Password')}
                        autoComplete={"new-password"}
                    />
                    {errors.confirmPassword && <span className="text-(--error-color) text-sm mt-1">{errors.confirmPassword.message}</span>}
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
                        <span>{t('Reset Password')}</span>
                    </>
                ) : (
                    <span>{t('Reset Password')}</span>
                )}
            </button>
        </form>
    )
}