import { type Prisma } from "@prisma/client";
import ProductInfoItem from "./ProductInfoItem";

export default function ProductInfo({
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
  return (
    <div
      className="
        flex flex-col items-center bg-red-200 w-fit
      "
    >
      <span className="block text-center text-xl">{product.name}</span>
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
          : 'нет'
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
  );
}