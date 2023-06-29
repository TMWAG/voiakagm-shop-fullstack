import { IVendorItem } from "@/lib/types";
import Image from "next/image";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

export default async function VendorCard({
  vendor,
}: {
  vendor: IVendorItem;
}){
  return (
    <div
      className="
        border-[1px] h-24 bg-white flex
        flex-col justify-between hover:shadow-xl
        shadow-none ease-in-out
        delay-0 duration-100
      "
    >
      <div 
        className="flex justify-around items-center mt-2"
      >
        <Image
          alt={vendor.name}
          src={`/vendors/${vendor.picture}`}
          width={80}
          height={32}
        />
        <span>{vendor.name}</span>
      </div>
      <div 
        className="
          flex
        "
      >
        <EditButton id={vendor.id} initialValue={vendor.name}/>
        <DeleteButton vendorName={vendor.name} id={vendor.id}/>
      </div>
    </div>
  );
}