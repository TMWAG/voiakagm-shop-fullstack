'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const pathname = usePathname();
  const isActive = pathname.endsWith(String(id));
  return (
    <Link
      href={`/admin/parameters/${id}`}
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