import { ICategoryItem } from "@/lib/types";
import CategoryItem from "./CategoryItem";

export default async function Categories(){
  const categories: ICategoryItem[] = await fetch(process.env.NEXT_PUBLIC_API_URL!.concat('category/all'))
    .then(res => res.json());
  return (
    <div className="ml-32 border-[1px] rounded w-[19.25rem]">
      {categories.map((c) => <CategoryItem key={c.id} id={c.id} name={c.name} picture={c.picture} />)}
    </div>
  );
}