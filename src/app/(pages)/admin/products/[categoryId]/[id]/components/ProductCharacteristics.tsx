import { prisma } from "@/lib/prisma";
import AddCharacteristicButtonWithModal from "./AddCharacteristicButtonWithModal";
import EditCharacteristicButtonWithModal from "./EditCharacteristicButtonWithModal";

export default async function ProductCharacteristics({
  productId,
  categoryId,
}: {
  categoryId: number;
  productId: number,
}) {
  const characteristics = await prisma.productCharacteristic.findMany({
    orderBy: { parameter: { name: "asc" } },
    where: { productId },
    include: { parameter: { select: { name: true } } },
  });
  const parameters = await prisma.productParameter.findMany({
    where: { categoryId },
  });
  return (
    <div className="flex flex-col items-center">
      <span className="font-bold text-lg">Характеристики</span>
      {characteristics.length > 0 
        ?characteristics.map((c) => (
          <div className="w-full flex items-center" key={c.id}>
            <span className="block w-7/12 border-b-violet-200 border-b border-dashed">{c.parameter.name}</span>
            <span className="block w-3/12">{c.value}</span>
            <EditCharacteristicButtonWithModal
              id={c.id}
              initialValue={c.value}
              parameterName={c.parameter.name}
            />
            <button>del</button>
          </div>
        ))
        : <span>Характеристики не заданы</span>
      }
      <AddCharacteristicButtonWithModal parameters={parameters} productId={productId}/>
    </div>
  );
}