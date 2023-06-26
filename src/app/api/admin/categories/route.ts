import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { CreateCategoryInput, CreateCategorySchema } from "@/lib/validations/category.schema";
import { randomUUID } from "crypto";
import { existsSync } from "fs";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { ZodError } from "zod";

export async function POST(req: NextRequest){
  try {
    const body = await req.formData();
    const data = CreateCategorySchema.parse({
      name: body.get('name'),
      picture: body.get('picture'),
    }) as CreateCategoryInput;
  
    const destinationDirectory = path.join(
      process.cwd(), 'public', 'categories'
    );
    if(!existsSync(destinationDirectory)){
      fs.mkdir(destinationDirectory, { recursive: true });
    }
    
    const filename = randomUUID()
      .concat('.', data.picture.type.split('/')[1]);
    await fs.writeFile(
      path.join(destinationDirectory, filename),
      Buffer.from(await data.picture.arrayBuffer())
    );
  
    const category = await prisma.category.create({
      data: { name: data.name, picture: filename },
    });
    return new NextResponse(
      JSON.stringify({
        status: 'success',
        data: category,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'Данные имеют неверный формат');
    }
    return getErrorResponse(500, error.message);
  }
}

export async function PUT(req: NextRequest) {
  
}