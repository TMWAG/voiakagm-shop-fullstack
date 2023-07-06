import { CreateParameterInput, CreateParameterSchema, DeleteParameterInput, DeleteParameterSchema, UpdateParameterInput, UpdateParameterSchema } from "@/lib/validations/parameter.schema";
import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "../../_lib/utils";
import { getErrorResponse } from "@/lib/helpers";
import { Role } from "@prisma/client";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest){
  try {
    if (await getUserRole(req) !== Role.ADMIN)
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    const body = (await req.json()) as CreateParameterInput;
    const data = CreateParameterSchema.parse({
      categoryId: Number(body.categoryId),
      name: body.name,
    });
    const parameter = await prisma.productParameter.create({data});
    return new NextResponse(JSON.stringify({
      status: 'success',
      data: parameter,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'Данные имеют неверный формат');
    }
    return getErrorResponse(500, error.message);
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (await getUserRole(req) !== Role.ADMIN)
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    const body = await req.json();
    const data = UpdateParameterSchema.parse(body) as UpdateParameterInput;
    const parameter = await prisma.productParameter.update({
      where: { id: data.id },
      data: { name: data.name },
    });
    return new NextResponse(JSON.stringify({
      status: 'success',
      data: parameter,
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'Данные имеют неверный формат');
    }
    return getErrorResponse(500, error.message);
  }
}

export async function DELETE(req: NextRequest){
  try {
    if (await getUserRole(req) !== Role.ADMIN)
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    const { searchParams } = new URL(req.url);
    const data = DeleteParameterSchema.parse({
      id: Number(searchParams.get('id')),
      name: searchParams.get('confirmation'),
    }) as DeleteParameterInput;
    await prisma.productParameter.delete({
      where: { id: data.id },
    });
    return new NextResponse(JSON.stringify({
      status: 'success',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json'},
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'Данные имеют неверный формат');
    }
    return getErrorResponse(500, error.message);
  }
}