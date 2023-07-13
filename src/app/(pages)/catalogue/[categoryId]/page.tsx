import ProductCard from "@/components/UI/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function CataloguePage({
  params,
}: {
  params: {
    categoryId: number;
  }
}) {
  const products = await prisma.product.findMany({
    where: { categoryId: Number(params.categoryId) },
    include: { pictures: { select: { filename: true } } },
  });
  return (
    <div className="mx-0 my-12 w-2/3">
      <h1 className="text-2xl ml-1 font-medium">Каталог товаров</h1>
      <span className="text-zinc-500 ml-1 mt-2 mb-4 block text-lg font-normal">
        В каталоге на сайте вы можете подобрать различные ПК комплектующие и аксессуары. <br />
        Железки могут быть как новыми, так и Б/У.
      </span>
      <div className="grid grid-cols-4 gap-2 ">
        {products.map((p) => <ProductCard key={p.id} subPath="product" product={p} />)}
      </div>
    </div>
  );
};