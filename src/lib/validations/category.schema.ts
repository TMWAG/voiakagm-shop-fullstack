import { z } from "zod";

const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const CreateCategorySchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Название должно быть строкой',
      required_error: 'Необходимо указать название категории',
    })
    .min(1, 'Название должно содержать больше 1 символа'),
  picture: z
    .instanceof(File)
    .refine(
      (pic: File) => pic.size <= MAX_FILE_SIZE,
      'Максимальный размер файла 5мб'
    ),
});

export const UpdateCategorySchema = z.object({
  id: z
    .number()
    .positive(),
  name: z
    .string({
      invalid_type_error: 'Название должно быть строкой',
    })
    .min(1, 'Название должно содержать больше 1 символа'),
  picture: z
    .instanceof(File)
    .refine(
      (pic: File) => pic.size <= MAX_FILE_SIZE,
      'Максимальный размер файла 5мб'
    )
    .nullish(),
})
.refine((data) => data.name || data.picture, {
  message:'Для изменения необходимо указать новое название или новое изображение',
});

export const DeleteCategorySchema = z.object({
  id: z
    .number()
    .positive(),
  categoryName: z
    .string()
    .min(1, 'Введите название'),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
export type DeleteCategoryInput = z.infer<typeof DeleteCategorySchema>;