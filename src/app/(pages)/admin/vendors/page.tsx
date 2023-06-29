import { prisma } from "@/lib/prisma";
import AddVendorForm from "./components/AddVendorForm";
import VendorCard from "./components/VendorCard";

export default async function VendorsPage(){
  const vendors = await prisma.vendor.findMany({
    orderBy: { id: 'asc' },
  });
  return (
    <div className="grid grid-cols-6 gap-1 mb-12">
      <AddVendorForm/>
      {vendors.map((v) => <VendorCard vendor={v} key={v.id} />)}
    </div>
  );
}