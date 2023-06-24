import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z
    .string({
      required_error: 'Имя должно быть указано',
    })
    .min(1, 'Имя должно содержать больше 1 символа'),
  surname: z
    .string({
      required_error: 'Фамилия должна быть указана',
    })
    .min(1, 'Фамилия должна содержать больше 1 символа'),
  email: z
    .string({
      required_error: 'Email должен быть указан',
    })
    .email('Email имеет неверный формат'),
  phone: z
    .string({
      required_error: 'Номер телефона должен быть указан',
    })
    .regex(
      /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/,
      'Телефон имеет неверный формат',
    ),
  password: z
    .string({
      required_error: 'Пароль должен быть указан',
    })
    .regex(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Пароль должен быть длиной от 8 символов и содержать знаки и цифры'
    ),
  passwordConfirmation: z
    .string({
      required_error: 'Подтвердите пароль',
    })
    .min(1, 'Подтвердите пароль'),
})
.refine((data) => data.password === data.passwordConfirmation, {
  path: ['passwordConfirm'],
  message: 'Пароли не совпадают',
});

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email должен быть указан',
    })
    .min(1, 'Email должен быть указан')
    .email('Email имеет неверный формат'),
  password: z
    .string({
      required_error: 'Пароль должен быть указан',
    })
    .min(1, 'Пароль должен быть указан')
    .min(8, 'Пароль должен содержать от 8 символов'),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type LoginUserInput = z.infer<typeof LoginUserSchema>;