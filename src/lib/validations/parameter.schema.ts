import { z } from "zod";

export const CreateParameterSchema = z.object({
  categoryId: z
    .number({
      invalid_type_error: 'Id категории должен быть числом',
      required_error: 'Id должен быть указан',
    })
    .int({ message: 'Id должен быть целым числом' })
    .positive({ message: 'Id не может быть отрицательным числом' }),
  name: z
    .string({
      invalid_type_error: 'Название должно быть строкой',
      required_error: 'Название должно быть указано',
    })
    .min(1, 'Название должно быть указано'),
});

export type CreateParameterInput = z.infer<typeof CreateParameterSchema>;

export const UpdateParameterSchema = z.object({
  id: z
    .number({
      invalid_type_error: 'Id должен быть числом',
      required_error: 'Id необходимо указать',
    })
    .int({ message: 'Id должен быть целым числом' })
    .positive({ message: 'Id не может быть меньше нуля' }),
  name: z
    .string({
      invalid_type_error: 'Название должно быть строкой',
      required_error: 'Название должно быть указано',
    })
    .min(1, 'Название должно быть указано'),
});

export type UpdateParameterInput = z.infer<typeof UpdateParameterSchema>;

export const DeleteParameterSchema = z.object({
  id: z
    .number({
      invalid_type_error: 'Id должен быть числом',
      required_error: 'Id должен быть указан',
    })
    .int({ message: 'Должен быть целым числом' })
    .positive({ message: 'Не может быть меньше нуля' }),
  name: z
    .string({
      required_error: 'Название должно быть указано',
      invalid_type_error: 'Название должно быть строкой',
    })
    .min(1, 'Название должно быть указано'),
});

export type DeleteParameterInput = z.infer<typeof DeleteParameterSchema>;