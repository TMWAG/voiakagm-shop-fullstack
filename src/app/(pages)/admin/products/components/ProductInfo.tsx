import { type Prisma } from "@prisma/client";
import ProductInfoItem from "./ProductInfoItem";
import EditProductButtonWithModal from "./EditProductButtonWithModal";
import { prisma } from "@/lib/prisma";

export default async function ProductInfo({
  product,
}: {
  product: Prisma.ProductGetPayload<{
    include: {
      pictures: true,
      category: {
        select: { name: true },
      },
      vendor: {
        select: { name: true },
      },
      characteristics: {
        orderBy: { id: "asc" },
        include: {
          parameter: {
            select: { name: true },
          },
        },
      },
    },
  }>
}) {
  const vendors = await prisma.vendor.findMany();
  return (
    <div
      className="
        flex flex-col w-96 p-2
      "
    >
    <span className="block text-center text-xl">{product.name}</span>
      <div className="border border-zinc-100">
        <ProductInfoItem
          infoName="Категория"
          infoValue={product.category.name}
        />
        <ProductInfoItem
          infoName="Производитель"
          infoValue={product.vendor.name}
        />
        <ProductInfoItem
          infoName="Цена"
          infoValue={
            (product.price/100)
              .toLocaleString('ru', {style: 'currency', currency: 'RUB'})
          }
        />
        <ProductInfoItem
          infoName="Скидка"
          infoValue={
            product.discount
            ?`${product.discount}%`
            : 'Нет'
          }
        />
        <ProductInfoItem
          infoName="Б/У"
          infoValue={
            product.used
            ?'Да'
            :'Нет'
          }
        />
        <ProductInfoItem
          infoName="Количество"
          infoValue={product.amount}
        />
        <ProductInfoItem
          infoName="Продано"
          infoValue={product.sold}
        />
      </div>
      <div className="flex justify-around my-2">
        <EditProductButtonWithModal product={product} vendors={vendors}/>
      </div>
    </div>
  );
}