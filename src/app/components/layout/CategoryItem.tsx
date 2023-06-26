import { ICategoryItem } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function CategoryItem({ id, name, picture }: ICategoryItem) {
  return (
    <Link
      href={`catalogue/${id}`}
      className="flex items-center border-b-[1px] last:border-b-0 h-[3.125rem] hover:shadow-md shadow-none ease-in-out delay-0 duration-100"
    >
      <Image
        className='mx-3'
        alt={name}
        src={`/categories/${picture}`}
        width={32}
        height={32}
      />
      <span className="text-lg">{name}</span>
    </Link>
  );
}