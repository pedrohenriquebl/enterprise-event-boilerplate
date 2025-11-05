import * as z from "zod";

type TranslateFn = (key: string) => string;

export const getResetPasswordFormSchema = (t: TranslateFn) =>
  z
    .object({
      email: z
        .string()
        .min(1, t("InvalidEmailRequestPassword"))
        .email(t("InvalidEmailRequestPassword")),
      password: z.string().min(8, t("PasswordMinLength")),
      confirmPassword: z.string().min(8, t("PasswordMinLength")),
      token: z.string().min(1, t("InvalidToken")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("PasswordsDoNotMatch"),
      path: ["confirmPassword"],
    });

export type ResetPasswordFormData = z.infer<
  ReturnType<typeof getResetPasswordFormSchema>
>;
