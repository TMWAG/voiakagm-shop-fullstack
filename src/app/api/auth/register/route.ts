import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { RegisterUserInput, RegisterUserSchema } from "@/lib/validations/user.schema";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST (req: NextRequest){
  try {
    const body = (await req.json()) as RegisterUserInput;
    console.log(body);
    const data = RegisterUserSchema.parse(body);
    console.log('parsed');
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