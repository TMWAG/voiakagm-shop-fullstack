import { IProductInfo } from "@/lib/types";

export default async function ProductAdminPage({
  params,
}: {
  params: { id: number };
}){
  const product: IProductInfo = await fetch(
    process.env.NEXT_PUBLIC_API_URL!.concat(`product/id/${params.id}`),
    { method: 'GET' },
  ).then(res => res.json());
  return (
    <div>{product.name}</div>
  );
}