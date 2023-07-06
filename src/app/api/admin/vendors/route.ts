import { NextRequest, NextResponse } from "next/server";
import { getUserRole } from "../../_lib/utils";
import { Role } from "@prisma/client";
import { getErrorResponse } from "@/lib/helpers";
import { CreateVendorInput, CreateVendorSchema, DeleteVendorSchema, UpdateVendorInput, UpdateVendorSchema } from "@/lib/validations/vendor.schema";
import path from "path";
import { existsSync } from "fs";
import fs from "fs/promises";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    if (await getUserRole(req) !== Role.ADMIN)
      return getErrorResponse(403, 'Недостаточный уровень привилегий');
    const body = await req.formData();
    const data = CreateVendorSchema.parse({
      name: body.get('name'),
      picture: body.get('picture'),
    }) as CreateVendorInput;

    const destinationDirectory = path.join(
      process.cwd(), 'public', 'vendors'
    );
    if(!existsSync(destinationDirectory)){
      fs.mkdir(destinationDirectory, {recursive: true});
    }

    const filename = randomUUID()
      .concat('.', data.picture.type.split('/')[1]);
    await fs.writeFile(
      path.join(destinationDirectory, filename),
      Buffer.from(await data.picture.arrayBuffer()),
    );

    const vendor = await prisma.vendor.create({
      data: { name: data.name, picture: filename },
    });

    return new NextResponse(
      JSON.stringify({
        status: 'success',
        data: vendor,
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
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
    const body = await req.formData();
    const data = UpdateVendorSchema.parse({
      id: Number(body.get('id')),
      name: body.get('newName'),
      picture: body.get('newPicture'),
    }) as UpdateVendorInput;
  
    let filename = undefined;
    if (data.picture) {
      const destinationDirectory = path.join(
        process.cwd(), 'public', 'vendors'
      );
      if(!existsSync(destinationDirectory)){
        fs.mkdir(destinationDirectory, { recursive: true });
      }
      const vendorInfo = await prisma.vendor.findUniqueOrThrow({where: {id: data.id }});
      if(vendorInfo.picture !== null) {
        fs.rm(path.join(destinationDirectory, vendorInfo.picture));
      }
      filename = randomUUID()
        .concat('.', data.picture.type.split('/')[1]);
      await fs.writeFile(
        path.join(destinationDirectory, filename),
        Buffer.from(await data.picture.arrayBuffer())
      );
    }
  
    const vendor = await prisma.vendor.update({
      where: { id: data.id },
      data: { name: data.name, picture: filename },
    });
  
    return new NextResponse(JSON.stringify({
      status: 'success',
      data: vendor,
    }),{
      status: 200,
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
    const data = DeleteVendorSchema.parse({
      id: Number(searchParams.get('id')),
      vendorName: searchParams.get('confirmation'),
    });
    const vendor = await prisma.vendor.delete({ where: { id: data.id } });
    if (vendor.picture !== null){
      const destinationDirectory = path.join(
        process.cwd(), 'public', 'vendors'
      );
      fs.rm(path.join(destinationDirectory, vendor.picture));
    }
    return new NextResponse(JSON.stringify({
      status: 'success',
    }),{
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