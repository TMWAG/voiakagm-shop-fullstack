import { prisma } from "@/lib/prisma";
import AddProductButtonWithModal from "../components/AddProductButtonWithModal";
import ProductCard from "@/components/UI/ProductCard";

export default async function ProductAdminPage({
  params,
}: {
  params: { id: number };
}){
  const products = await prisma.product.findMany({
    where: { categoryId: Number(params.id) },
    include: { pictures: { select: { filename: true } } },
  });
  const vendors = await prisma.vendor.findMany();
  return (
    <div className="grid grid-cols-6 gap-2 mb-12">
      <AddProductButtonWithModal
        vendors={vendors}
        categoryId={params.id}
      />
      {products.map((p) => <ProductCard product={p} subPath='admin' key={p.id}/>)}
    </div>
  );
}