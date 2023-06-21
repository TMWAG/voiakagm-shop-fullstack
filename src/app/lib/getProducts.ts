import { IProductItem } from "@/lib/types";

interface IProductSearchOptions {
  page?: number;
  limit?: number;
  sort?: 'price-asc' | 'price-desc' | 'sold-asc' | 'sold-desc';
  used?: boolean;
  discounted?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export default async function getProducts(
  options: IProductSearchOptions){
  let query = '?';
  Object.keys(options).forEach((o) => {
    query += options[o as keyof IProductSearchOptions] !== undefined
      ? `${o}=${options[o as keyof IProductSearchOptions]}&`
      : '';  
  });
  console.log(query);
  const products: IProductItem[] = await fetch(
    process.env.NEXT_PUBLIC_API_URL!+'product/all'.concat(query),
    {
      method: 'GET',
    }
  ).then(res => res.json());
  return products;
};