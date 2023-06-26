import CategoryItem from "./CategoryItem";
import { prisma } from "@/lib/prisma";

export default async function Categories(){
  const categories = await prisma.category.findMany();
  return (
    <div className="ml-32 border-[1px] h-fit rounded w-[19.25rem]">
      {categories.map((c) => <CategoryItem key={c.id} id={c.id} name={c.name} picture={c.picture} />)}
    </div>
  );
}