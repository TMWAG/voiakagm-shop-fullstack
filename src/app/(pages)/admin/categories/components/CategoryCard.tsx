import { ICategoryItem } from "@/lib/types";
import Image from "next/image";
import EditButton from "./EditButton";
import AddCategoryForm from "./AddCategoryForm";

export default async function CategoryCard({
  category,
}: {
  category: ICategoryItem;
}){
  return (
    <div
      className="
        border-[1px] h-24 bg-white flex
        flex-col justify-between hover:shadow-xl
        shadow-none ease-in-out
        delay-0 duration-100
      "
    >
      <div 
        className="flex justify-around items-center mt-2"
      >
        <Image
          alt={category.name}
          src={`/categories/${category.picture}`}
          width={32}
          height={32}
        />
        <span>{category.name}</span>
      </div>
      <div 
        className="
          flex
        "
      >
        <EditButton entityId={category.id} entityName="category" initialValue={category.name}/>
        <button
          className="
            bg-zinc-300 grow p-2 w-1/2 hover:bg-red-400 
            ease-in-out delay-0 duration-100
          "
        >
          Удалить
        </button>
      </div>
    </div>
  );
}