import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "../../_lib/utils";
import { getErrorResponse } from "@/lib/helpers";
import { CreateCharacteristicInput, CreateCharacteristicSchema, DeleteCharacteristicInput, DeleteCharacteristicSchema, UpdateCharacteristicInput, UpdateCharacteristicSchema } from "@/lib/validations/characteristic.schema";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
  try {
    if (await getUserRole(req) !== Role.ADMIN)
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    const body = await req.json();
    const data = CreateCharacteristicSchema.parse(body) as CreateCharacteristicInput;
    const characteristic = await prisma.productCharacteristic.create({
      data,
    });
    return new NextResponse(JSON.stringify({
      status: 'success',
      data: characteristic,
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

export async function PUT(req: NextRequest){
  try {
    if (await getUserRole(req) !== Role.ADMIN)
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    const body = await req.json();
    const data = UpdateCharacteristicSchema.parse(body) as UpdateCharacteristicInput;
    await prisma.productCharacteristic.update({
      where: { id: data.id },
      data,
    });
    return new NextResponse(JSON.stringify({
      status: 'success',
    }), {
      status: 200,
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
    const data = DeleteCharacteristicSchema.parse({
      id: Number(searchParams.get('id')),
    }) as DeleteCharacteristicInput;
    await prisma.productCharacteristic.delete({
      where: { id: data.id },
    });
    return new NextResponse(JSON.stringify({
      status: 'success',
    }), {
      status: 200,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'Данные имеют неверный формат');
    }
    return getErrorResponse(500, error.message);
  }
}