import * as z from "zod";

type TranslateFn = (key: string) => string;

export const getForgotPasswordFormSchema = (t: TranslateFn) =>
  z.object({
    email: z.string().min(2, t("InvalidEmailRequestPassword")),
  });

export type ForgotPasswordFormData = z.infer<
  ReturnType<typeof getForgotPasswordFormSchema>
>;
