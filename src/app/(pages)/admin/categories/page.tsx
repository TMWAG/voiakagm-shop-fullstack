import { prisma } from "@/lib/prisma";
import AddCategoryForm from "./components/AddCategoryForm";
import EntityCard from "../components/EntityCard";

export default async function CategoriesPage(){
  const categories = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });
  return (
    <div className="grid grid-cols-6 gap-1 mb-12">
      <AddCategoryForm/>
      {categories.map((c) => <EntityCard entity={c} entityType="categories" key={c.id}/>)}
    </div>
  );
}