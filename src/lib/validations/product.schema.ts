import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Название должно быть строкой',
      required_error: 'Название должно быть указано',
    })
    .min(1, 'Название должно быть указано'),
  vendorId: z
    .number({
      invalid_type_error: 'Id должен быть числом',
      required_error: 'Id должен быть указан',
    })
    .positive()
    .int(),
  categoryId: z
    .number({
      invalid_type_error: 'Id должен быть числом',
      required_error: 'Id должен быть указан',
    })
    .positive()
    .int(),
  price: z
    .number({
      invalid_type_error: 'Должна быть числом',
      required_error: 'Должна быть указана',
    })
    .positive()
    .int(),
  discount: z
    .number()
    .positive()
    .int()
    .optional()
    .refine((d) => d === undefined || d < 100),
  description: z
    .string(),
  amount: z
    .number()
    .positive()
    .int(),
  used: z
    .boolean(),
  
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = z.object({
  id: z
    .number()
    .positive()
    .int(),
  name: z
    .string()
    .min(1),
  vendorId: z
    .number()
    .positive()
    .int(),
  price: z
    .number()
    .positive()
    .int(),
  discount: z
    .number()
    .positive()
    .int()
    .optional()
    .refine((d) => d === undefined || d < 100),
  description: z
    .string(),
  amount: z
    .number()
    .positive()
    .int(),
  used: z
    .boolean(),
});

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

export const DeleteProductSchema = z.object({
  id: z
    .number()
    .positive()
    .int(),
  confirmation: z
    .string(),
});

export type DeleteProductInput = z.infer<typeof DeleteProductSchema>;