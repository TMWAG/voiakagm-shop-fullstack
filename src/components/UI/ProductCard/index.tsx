import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import no_picture from "../../../../public/no_picture.png";
import { Prisma } from "@prisma/client";

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400'], 
});

export default function ProductCard({
  product,
  subPath,
}: {
  product: Prisma.ProductGetPayload<{ include: {pictures: { select: { filename: true }}}}>;
  subPath: string;
}){
  
  return (
    <Link
      href={`/${subPath}/${product.id}`}
      className="border h-72 bg-white flex flex-col justify-between p-3 hover:shadow-xl hover:scale-110 shadow-none ease-in-out delay-0 duration-100"
    >
      <Image
        alt={product.name}
        src={product.pictures.length
          ? process.env.NEXT_PUBLIC_PICTURES_URL!.concat(`products/${product.id}/${product.pictures[0].filename}`)
          : no_picture
        }
        width={256}
        height={256}
      />
      <div className="flex flex-col">
        <span className={`${inter.className} font-normal`}>{(product.price/100).toLocaleString('ru', {style: 'currency', currency: 'RUB'})}</span>
        <span className={`${inter.className} font-light text-zinc-600`} >{product.name}</span>
        <span className={`${inter.className} font-light ${product.amount? 'text-lime-600' : 'text-yellow-600'}`}>
          &#8226;
          {product.amount
            ? 'В наличии'
            : 'Товар отсутствует'
          }
        </span>
      </div>
      
    </Link>
  );
}