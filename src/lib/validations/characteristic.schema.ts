import { z } from "zod";

export const CreateCharacteristicSchema = z.object({
  parameterId: z
    .number()
    .int()
    .positive(),
  productId: z
    .number()
    .int()
    .positive(),
  value: z
    .string()
    .min(1),
});

export type CreateCharacteristicInput = z.infer<typeof CreateCharacteristicSchema>;

export const UpdateCharacteristicSchema = z.object({
  id: z
    .number()
    .int()
    .positive(),
  value: z
    .string()
    .min(1),
});

export type UpdateCharacteristicInput = z.infer<typeof UpdateCharacteristicSchema>;

export const DeleteCharacteristicSchema = z.object({
  id: z
    .number()
    .positive()
    .int(),
});

export type DeleteCharacteristicInput = z.infer<typeof DeleteCharacteristicSchema>;