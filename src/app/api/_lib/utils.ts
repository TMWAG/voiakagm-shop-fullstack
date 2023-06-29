import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function getUserRole(req: NextRequest): Promise<Role | NextResponse>{
  const userId = req.headers.get('X-USER-ID');
  if (!userId)
    return getErrorResponse(401, 'Необходима авторизация');
  const user = await prisma.user.findUniqueOrThrow({where: { id: Number(userId)}});
  return user.role;
}