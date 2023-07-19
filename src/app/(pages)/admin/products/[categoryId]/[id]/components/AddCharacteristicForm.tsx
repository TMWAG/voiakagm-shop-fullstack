'use client';

import useCheckValidity from "@/hooks/useCheckValidity";
import { IValidateableTextInput } from "@/lib/types";
import { Prisma } from "@prisma/client";

export default function AddCharacteristicForm({
  parameters,
  value,
  parameterId,
  onParameterIdChange,
  onValueChange,
  onSubmit,
}: {
  parameters: Prisma.ProductParameterGetPayload<{}>[];
  value: IValidateableTextInput;
  parameterId: IValidateableTextInput;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onParameterIdChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
}) {
  const isValid = useCheckValidity(parameterId, value);
  return (
    <div className="flex flex-col justify-center h-full">
      <label className="flex flex-col my-4">
        Параметр
        <select
          defaultValue='----'
          onChange={onParameterIdChange}
          value={parameterId.value}
          className="
            border-2 rounded p-1 focus:border-violet-400
            outline-none bg-white
          "
        >
          <option disabled >----</option>
          {parameters.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>
      <label className="flex flex-col my-4">
        Значение
        <input
          type="text"
          value={value.value}
          onChange={onValueChange}
          placeholder="1200 МгЦ"
          className="
            border-2 rounded p-1 outline-none
            focus:border-violet-400
          "
        />
        <span className="text-red-500">{value.error}</span>
      </label>
      <button
        className="
        border-2 rounded  py-1 my-4
        hover:border-violet-400
        disabled:bg-zinc-400
      "
        onClick={onSubmit}
        disabled={!isValid}
      >
        Добавить
      </button>
    </div>
  );
}