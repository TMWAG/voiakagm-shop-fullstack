'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  id,
  name,
  subsegment,
}: {
  id: number;
  name: string;
  subsegment: string;
}) {
  const pathname = usePathname();
  const isActive = Number(pathname.split('/')[3]) === id;
  return (
    <Link
      href={`/admin/${subsegment}/${id}`}
      className={`
        ${isActive
          ? 'bg-violet-500 text-white'
          : 'bg-white text-black'
        }
        border text-center rounded-sm
        hover:scale-105 duration-100
        min-w-[11rem]
      `}
    >
      {name}
    </Link>
  );
}