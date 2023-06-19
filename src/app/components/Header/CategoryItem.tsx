import { ICategoryItem } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function CategoryItem({ id, name, picture }: ICategoryItem) {
  return (
    <Link href={`category/${id}`} className="flex items-center border-b-[1px] last:border-b-0 min-h-[3rem] h-[3.125rem] hover:shadow-inner">
      <Image
        className='ml-3'
        alt={name}
        src={picture
          ?process.env.NEXT_PUBLIC_PICTURES_URL!.concat(`category/${picture}`)
          :''
        }
        width={32}
        height={32}
      />
      <span className="text-lg">{name}</span>
    </Link>
  );
}