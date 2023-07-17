import { getErrorResponse } from "@/lib/helpers";
import { Mailer } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { RequestPasswordResetInput, RequestPasswordResetSchema } from "@/lib/validations/auth.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
  try {
    const body = await req.json() as RequestPasswordResetInput;
    const data = RequestPasswordResetSchema.parse(body);
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      return getErrorResponse(404, 'Пользователь не найден');
    }
    await new Mailer().sendRestorationEmail(user.name, user.email, user.token);
    return new NextResponse(JSON.stringify({
      status: 'success',
    }));
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'проверка данных не удалась', error);
    }
    return getErrorResponse(500, error.message);    
  }
}