import { prisma } from "@/lib/prisma";
import NavLink from "../parameters/components/NavLink";

export default async function ProductsAdminLayout({
  children,
}: {
  children: React.ReactNode;
}){
  const categories = await prisma.category.findMany();
  return (
    <div>
      <nav
        className="
          grid grid-flow-col-dense grid-cols-7 gap-2
        "
      >
        {categories.map((c) => <NavLink subsegment="products" id={c.id} name={c.name} key={c.id}/>)}
      </nav>
      {children}
    </div>
  );
}