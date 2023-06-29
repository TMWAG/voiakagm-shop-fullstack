import { z } from "zod";

const MAX_FILE_SIZE = 500000;

export const CreateVendorSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Название должно быть строкой',
      required_error: 'Необходимо указать название производителя',
    })
    .min(1, 'Название должно содержать минимум 1 символ'),
  picture: z
    .instanceof(File)
    .refine(
      (pic: File) => pic.size <= MAX_FILE_SIZE,
      'Максимальный размер файла 5мб',
    ),
});

export type CreateVendorInput = z.infer<typeof CreateVendorSchema>;

export const UpdateVendorSchema = z.object({
  id: z
    .number({
      required_error: 'Необходимо указать Id',
    }),
  name: z
    .string({
      invalid_type_error: 'Название должно быть строкой',
      required_error: 'Необходимо указать новое название производителя',
    })
    .min(1, 'Название должно содержать минимум 1 символ'),
  picture: z
    .instanceof(File)
    .refine(
      (pic: File) => pic.size <= MAX_FILE_SIZE,
      'Максимальный размер файла 5 мб',
    )
    .nullish(),
});

export type UpdateVendorInput = z.infer<typeof UpdateVendorSchema>;

export const DeleteVendorSchema = z.object({
  id: z
    .number({
      invalid_type_error: 'Id должен быть числом',
    })
    .min(1, 'Id должен содержать минимум 1 цифру'),
  vendorName: z
    .string({
      required_error: 'Укажите название производителя',
    }),
});

export type DeleteVendorInput = z.infer<typeof DeleteVendorSchema>;