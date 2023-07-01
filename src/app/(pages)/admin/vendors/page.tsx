import { prisma } from "@/lib/prisma";
import AddVendorForm from "./components/AddVendorForm";
import EntityCard from "../components/EntityCard";

export default async function VendorsPage(){
  const vendors = await prisma.vendor.findMany({
    orderBy: { id: 'asc' },
  });
  return (
    <div className="grid grid-cols-6 gap-1 mb-12">
      <AddVendorForm/>
      {vendors.map((v) => <EntityCard entity={v} entityType="vendors" key={v.id} />)}
    </div>
  );
}