import { prisma } from "@/lib/prisma";
import NavLink from "./components/NavLink";

export default async function AdminParametersLayout({
  children,
}: {
  children: React.ReactNode
}){
  const categories = await prisma.category.findMany({
    orderBy: {id: "asc"},
  });
  return (
    <div>
      <nav
        className="
          grid grid-flow-col-dense grid-cols-7 gap-2
        "
      >
        {categories.map((c) => <NavLink subsegment="parameters" id={c.id} name={c.name} key={c.id}/>)}
      </nav>
      {children}
    </div>
  );
}