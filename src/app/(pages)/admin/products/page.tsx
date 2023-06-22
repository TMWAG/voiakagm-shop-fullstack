import getProducts from "@/app/lib/getProducts";
import ProductCard from "@/components/UI/ProductCard";

export default async function ProductsPage(){
  const products = await getProducts({limit: 24});
  return (
    <div className="grid grid-cols-6 gap-1 mb-12">
      {products.map((p) => <ProductCard key={p.id} subPath="admin/products" product={p}/>)}
    </div>
  );
}