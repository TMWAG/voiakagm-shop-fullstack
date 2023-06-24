import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  const userId = req.headers.get('X-USER-ID');
  if(!userId) {
    return getErrorResponse(401, 'Вы не авторизованы, пожалуйста войдите в учётную запись');
  }
  const user = await prisma.user.findUnique({ where: { id: Number(userId) }});
  return NextResponse.json({
    status: 'success',
    data: { user: { ...user, password: undefined } },
  });
}