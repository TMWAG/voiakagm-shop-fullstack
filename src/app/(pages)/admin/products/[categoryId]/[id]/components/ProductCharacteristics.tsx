import { prisma } from "@/lib/prisma";
import AddCharacteristicButtonWithModal from "./AddCharacteristicButtonWithModal";

export default async function ProductCharacteristics({
  productId,
  categoryId,
}: {
  categoryId: number;
  productId: number,
}) {
  const characteristics = await prisma.productCharacteristic.findMany({
    where: { productId },
    include: { parameter: { select: { name: true } } },
  });
  const parameters = await prisma.productParameter.findMany({
    where: { categoryId },
  });
  return (
    <div className="flex flex-col bg-red-200 items-center">
      <table className="text-start w-full">
        <thead>
          <tr>
            <th>Параметр</th>
            <th>Значение</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {characteristics.length > 0 
            ?characteristics.map((c) => (
              <tr key={c.id}>
                <td>{c.parameter.name}</td>
                <td>{c.value}</td>
              </tr>
            ))
            : <tr><td colSpan={3}>Характеристики не заданы</td></tr>
          }
        </tbody>
      </table>
      <AddCharacteristicButtonWithModal parameters={parameters} productId={productId}/>
    </div>
  );
}