import { prisma } from "@/lib/prisma";
import ProductInfo from "../../components/ProductInfo";

export default async function AdminProductPage({
  params,
}: {
  params: { id: number };
}){
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: Number(params.id) },
    include: { 
      pictures: true,
      category: {
        select: { name: true },
      },
      vendor: {
        select: { name: true },
      },
    },
  });
  return (
    <div
      className="
        border mt-2 bg-white rounded-sm grid grid-cols-3
      "
    >
      <ProductInfo product={product}/>
    </div>
  );
}