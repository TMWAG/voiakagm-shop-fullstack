import { ICategoryItem, IVendorItem } from "@/lib/types";
import Image from "next/image";
import EditButtonWithModal from "./EditButtonWithModal";
import DeleteButtonWithModal from "./DeleteButtonWithModal";

export default function EntityCard({
  entity,
  entityType,
}: {
  entity: ICategoryItem | IVendorItem;
  entityType: 'vendors' | 'categories';
}) {
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
          alt={entity.name}
          src={`/${entityType}/${entity.picture}`}
          width={
            entityType === 'categories'
            ? 32
            : 64
          }
          height={32}
        />
        <span>{entity.name}</span>
      </div>
      <div 
        className="
          flex
        "
      >
        <EditButtonWithModal
          entityId={entity.id}
          initialValue={entity.name}
          path={entityType}
        />
        <DeleteButtonWithModal
          entityId={entity.id}
          entityName={entity.name}
          path={entityType}
        />
      </div>
    </div>
  );
}