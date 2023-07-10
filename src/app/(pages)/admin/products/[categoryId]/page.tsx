import { prisma } from "@/lib/prisma";
import AddProductButtonWithModal from "../components/AddProductButtonWithModal";
import ProductCard from "@/components/UI/ProductCard";

export default async function ProductAdminPage({
  params,
}: {
  params: { categoryId: number };
}){
  const products = await prisma.product.findMany({
    where: { categoryId: Number(params.categoryId) },
    include: { pictures: { select: { filename: true } } },
  });
  const vendors = await prisma.vendor.findMany();
  return (
    <div className="grid grid-cols-6 gap-2 mb-12">
      <AddProductButtonWithModal
        vendors={vendors}
        categoryId={params.categoryId}
      />
      {products.map((p) => <ProductCard product={p} subPath={`admin/products/${params.categoryId}/`} key={p.id}/>)}
    </div>
  );
}