import { prisma } from "@/lib/prisma";
import { CreateCategorySchema } from "@/lib/validations/category.schema";
import { randomUUID } from "crypto";
import { existsSync } from "fs";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest){
  const body = await req.formData();
  const data = CreateCategorySchema.parse({
    name: body.get('name'),
    picture: body.get('picture'),
  });

  
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
}

export async function PUT(req: NextRequest) {
  
}