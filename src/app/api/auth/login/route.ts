import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { signJWT } from "@/lib/token";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
  try {
    const body = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    console.log('got info');
    
    if (!user) {
      return getErrorResponse(401, 'Указан неправильный Email');
    }
    if (!(await compare(data.password, user.password))) {
      return getErrorResponse(401, 'Указан неверный пароль');
    }
    console.log('got user');
    
    
    const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN');
    const token = await signJWT(
      { sub: String(user.id) },
      { exp: `${JWT_EXPIRES_IN}m` }
    );
    console.log('token done');
    
    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
    const cookieOptions = {
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: tokenMaxAge,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: 'success',
        token,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
    
    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: 'logged-in',
        value: 'true',
        maxAge: tokenMaxAge,
      }),
    ]);

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'не удалось проверить данные', error);
    }
    return getErrorResponse(500, error.message);
  }
}