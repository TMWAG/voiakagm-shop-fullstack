import { IProductInfo } from "@/lib/types";

export default async function ProductAdminPage({
  params,
}: {
  params: { id: number };
}){
  return (
    <div>{params.id}</div>
  );
}