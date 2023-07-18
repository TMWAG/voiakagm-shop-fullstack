import { getErrorResponse } from "@/lib/helpers";
import { CreateProductSchema, type CreateProductInput, UpdateProductInput, UpdateProductSchema, DeleteProductSchema, DeleteProductInput } from "@/lib/validations/product.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getUserRole } from "../../_lib/utils";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest){
  try {
    if (await getUserRole(req) !== Role.ADMIN){
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    }
    const body = await req.json() as CreateProductInput;
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

export async function PUT(req: NextRequest){
  try {
    if (await getUserRole(req) !== Role.ADMIN) {
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    }
    const body = await req.json() as UpdateProductInput;
    const data = UpdateProductSchema.parse(body);
    const product = await prisma.product.update({
      where: { id: body.id },
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

export async function DELETE(req: NextRequest){
  try {
    if (await getUserRole(req) !== Role.ADMIN) {
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    }
    const { searchParams } = new URL(req.url);
    const data = DeleteProductSchema.parse({
      id: Number(searchParams.get('id')),
    }) as DeleteProductInput;
    await prisma.product.delete({
      where: { id: data.id },
    });
    revalidatePath('/(pages)/admin/products/[categoryId]');
    return new NextResponse(JSON.stringify({
      status: 'success',
    }), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    if (error instanceof ZodError)
      return getErrorResponse(400, 'Данные имеют неверный формат');
    return getErrorResponse(500, error.message); 
  }
}