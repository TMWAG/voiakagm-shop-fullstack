import { Prisma } from "@prisma/client";
import EditParameterButtonWithModal from "./EditParameterButtonWithModal";
import DeleteParameterButtonWithModal from "./DeleteParameterButtonWithModal";

export default function ParameterCard({
  parameter,
}: {
  parameter: Prisma.ProductParameterGetPayload<{}>;
}){
  return (
    <div
      className="
        border rounded-sm
        flex flex-col text-center justify-between
      "
    >
      <span className="m-1">
        {parameter.name}
      </span>
      <div>
        <EditParameterButtonWithModal
          id={parameter.id}
          initialName={parameter.name}
        />
        <DeleteParameterButtonWithModal
          id={parameter.id}
          parameterName={parameter.name}
        />
      </div>
    </div>
  );
}