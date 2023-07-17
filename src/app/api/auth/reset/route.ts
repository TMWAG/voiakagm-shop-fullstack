import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { ResetPasswordInput, ResetPasswordSchema } from "@/lib/validations/auth.schema";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
  try {
    const body = await req.json() as ResetPasswordInput;
    const data = ResetPasswordSchema.parse(body);
    const user = await prisma.user.findUnique({
      where: { token: data.token },
    });
    if (!user) {
      return getErrorResponse(404, 'пользователь не найден');
    }
    const newPassword = await hash(data.newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newPassword, token: randomUUID() },
    });
    return new NextResponse(JSON.stringify({
      status: 'success',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'проверка данных не удалась', error);
    }
    return getErrorResponse(500, error.message);
  }
}