import { IProductItem } from "@/lib/types";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import placeholder from "../../../../public/placeholder.png";

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400'], 
});

export default function ProductCard({
  product,
}: {
  product: IProductItem;
}){
  
  return (
    <Link
      href={`/product/${product.id}`}
      className="border-[1px] h-96 bg-white flex flex-col justify-between p-3 hover:shadow-xl hover:scale-110 shadow-none ease-in-out delay-0 duration-100"
    >
      <Image
        className="self-center"
        alt={product.name}
        src={product.pictures.length
          ? process.env.NEXT_PUBLIC_PICTURES_URL!.concat(`products/${product.id}/${product.pictures[0].filename}`)
          : placeholder
        }
        width={223}
        height={283}
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