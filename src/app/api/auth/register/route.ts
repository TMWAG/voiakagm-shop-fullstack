import { getErrorResponse } from "@/lib/helpers";
import { Mailer } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { RegisterUserInput, RegisterUserSchema } from "@/lib/validations/user.schema";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST (req: NextRequest){
  try {
    const body = (await req.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);
    const hashedPassword = await hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
      },
    });
    await new Mailer().sendConfirmationEmail(user.name, user.email, user.token);
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        data: { user: { ...user, password: undefined } },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'проверка данных не удалась', error);
    }
    if (error.code === 'P2002') {
      return getErrorResponse(409, 'пользователь с таким Email уже зарегистрирован');
    }
    return getErrorResponse(500, error.message);
  }
}