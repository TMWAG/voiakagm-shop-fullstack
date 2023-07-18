import { prisma } from "@/lib/prisma";
import AddParameterForm from "../components/AddParameterForm";
import ParameterCard from "../components/ParameterCard";

export default async function ParameterAdminPage({
  params,
}: {
  params: {
    id: number,
  }
}) {
  const parameters = await prisma
    .productParameter
    .findMany({ 
      where: { 
        categoryId: Number(params.id),
      },
    });
  return (
    <div
      className="
        grid grid-cols-6 gap-2 my-2
      "
    >
      <AddParameterForm categoryId={params.id} />
      {parameters.length > 0 &&
        parameters.map((p) => <ParameterCard key={p.id} parameter={p} />)
      }
    </div>
  );
}