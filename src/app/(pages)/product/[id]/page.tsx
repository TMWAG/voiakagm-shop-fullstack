import { prisma } from "@/lib/prisma";

export default async function ProductPage({
  params,
}: {
  params: { id: number };
}){
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: Number(params.id) },
  });
  return (
    <div>{product.name}</div>
  );
}