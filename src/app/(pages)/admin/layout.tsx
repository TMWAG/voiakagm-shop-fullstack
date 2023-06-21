import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const links: { href: string, text: string }[] = [{
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}){
  if(cookies().get('userRole')?.value !== 'ADMIN') {
    redirect('/');
  }
  return (
    <div className="w-2/3">
      <span className="mt-11 mb-5 block text-2xl">Администрирование</span>
      <nav className="grid grid-flow-col-dense">
        {links.map((l) => 
          <Link
            href={`/admin/${l.href}`}
            key={l.href}
            className="border w-44 text-center text-lg rounded-sm hover:scale-105 duration-100"
          >
            {l.text}
          </Link>
        )}
      </nav>
      {children}
    </div>
  );
}