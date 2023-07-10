import { getErrorResponse } from "@/lib/helpers";
import { CreateProductSchema, type CreateProductInput } from "@/lib/validations/product.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getUserRole } from "../../_lib/utils";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest){
  try {
    if (await getUserRole(req) !== Role.ADMIN)
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    const body = await req.json() as CreateProductInput;
    console.log('-------------\n', body);
    const data = CreateProductSchema.parse(body);
    const product = await prisma.product.create({
      data,
    });
    return new NextResponse(JSON.stringify({
      status: 'success',
      data: product,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    if (error instanceof ZodError)
      return getErrorResponse(400, 'Данные имеют неверный формат');
    return getErrorResponse(500, error.message);    
  }
}