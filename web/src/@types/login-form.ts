import * as z from "zod";

type TranslateFn = (key: string) => string;

export const getLoginFormSchema = (t: TranslateFn) =>
  z.object({
    email: z.string().email(t("InvalidEmail")),
    password: z.string().min(6, t("PasswordMinLength")),
  });

export type LoginFormData = z.infer<ReturnType<typeof getLoginFormSchema>>;
