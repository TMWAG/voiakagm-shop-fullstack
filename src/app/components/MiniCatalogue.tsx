import ProductCard from "@/components/UI/ProductCard";
import { IProductItem } from "@/lib/types";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400'], 
});

export default async function MiniCatalogue(){
  const products: IProductItem[] = await fetch(
    process.env.NEXT_PUBLIC_API_URL!.concat('product/all?limit=11'),
    {
      method: 'GET',
    }
  ).then(res => res.json());
  return (
    <div
      className="mb-32"
    >
      <div
        className="flex flex-col mb-5"
      >
        <span
          className="font-medium text-xl"
        >
          Каталог в <Link
            href='/catalogue'
            className="text-violet-500"
          >
            миниатюре
          </Link>
        </span>
        <span
          className="font-normal text-zinc-400"
        >
          В каталоге на сайте вы можете подобрать различные ПК комплектующие и аксессуары.<br />
          Железки могут быть как новыми, так и Б/У.
        </span>
      </div>
      <div
        className="grid grid-cols-4 gap-[0.375rem]"
      >
        {products.map((p) => <ProductCard key={p.id} product={p}/>)}
        <Link
          href='/catalogue'
          className={
            `${inter.className} font-light text-2xl bg-white
            border-[1px] flex items-center justify-center flex-col
            p-3 shadow-none hover:shadow-xl hover:scale-110 hover:text-3xl
            ease-in-out delay-0 duration-100`
          }
        >
          Перейти в каталог
        </Link>
      </div>
    </div>
    
  );
}