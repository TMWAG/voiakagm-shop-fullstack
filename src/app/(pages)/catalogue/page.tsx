import getProducts from "@/app/lib/getProducts";
import ProductCard from "@/components/UI/ProductCard";

export default async function CataloguePage(){
  const products = await getProducts({limit: 20, sort: "price-desc"});
  // console.log(products);  
  return (
    <div className="m-5 grid grid-cols-4 gap-2 w-2/3">
      {products.map((p) => <ProductCard key={p.id} product={p}/>)}
    </div>
  );
}