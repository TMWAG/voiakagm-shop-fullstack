import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const CreateCategorySchema = z.object({
  name: z
    .string({
      required_error: 'Необходимо указать название категории',
    })
    .min(1, 'Название должно содержать больше 1 символа'),
  picture: z
    .instanceof(File)
    .refine(
      (pic: File) => pic.size <= MAX_FILE_SIZE,
      'Максимальный размер файла 5мб'
    )
    .refine(
      (pic: File) => ACCEPTED_IMAGE_TYPES.includes(pic.type),
      'Поддерживаются только форматы .jpeg, .jpg, .png и .webp'
    ),
});

export const UpdateCategorySchema = z.object({
  name: z
    .string()
    .optional(),
  picture: z
    .instanceof(File)
    .optional(),
})
.refine((data) => !data.name && !data.picture, {
  message:'Для изменения необходимо указать новое название или новое изображение',
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;