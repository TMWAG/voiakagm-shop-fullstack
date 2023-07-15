import { z } from "zod";

export const RequestPasswordResetSchema = z.object({
  email: z
    .string()
    .email(),
});

export type RequestPasswordResetInput = z.infer<typeof RequestPasswordResetSchema>;

export const ResetPasswordSchema = z.object({
  token: z
    .string(),
  newPassword: z
    .string()
    .min(8),
  newPasswordConfirmation: z
    .string()
    .min(8),
})
  .refine((d) => d.newPassword === d.newPasswordConfirmation);

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;