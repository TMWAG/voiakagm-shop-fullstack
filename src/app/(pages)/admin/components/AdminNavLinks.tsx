'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ILink {
  href: string;
  text: string;
}

const links: ILink[] = [{
  href: 'products',
  text: 'Товары',
}, {
  href: 'categories',
  text: 'Категории',
}, {
  href: 'vendors',
  text: 'Производители',
}, {
  href: 'parameters',
  text: 'Параметры',
}, {
  href: 'recommendations',
  text: 'Рекомендации',
}, {
  href: 'delivery_services',
  text: 'Службы доставки',
}, {
  href: 'orders',
  text: 'Заказы',
}];


export default function AdminNavLinks() {
  const pathname = usePathname();
  return (
    <nav className="grid grid-flow-col-dense justify-between mb-2">
      {links.map((l) => {
        const isActive = pathname.includes(l.href);
        return (
          <Link
          key={l.href}
            href={`/admin/${l.href}`}
            className={`
              ${isActive
                ? 'bg-violet-500 text-white'
                : 'bg-white text-black'
              }
              border w-44 text-center
              text-lg rounded-sm
              hover:scale-105 duration-100
            `}
          >
            {l.text}
          </Link>
        );
      }
      )}
    </nav>
  );
}