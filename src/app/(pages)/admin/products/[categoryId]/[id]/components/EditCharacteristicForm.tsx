'use client';

import useCheckValidity from "@/hooks/useCheckValidity";
import { IValidateableTextInput } from "@/lib/types";

export default function EditCharacteristicForm({
  value,
  parameterName,
  onValueChange,
  onSubmit,
}: {
  value: IValidateableTextInput;
  parameterName: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
}) {
  const isValid = useCheckValidity(value);
  return (
    <div className="flex flex-col w-3/5 h-full justify-center">
      <label className="flex flex-col my-3">
        Значение параметра ({parameterName})
        <input
          type="text"
          value={value.value}
          onChange={onValueChange}
          className="
            border-2 rounded p-1 focus:border-violet-400
            outline-none
          "
        />
        <span>{value.error}</span>
      </label>
      <button
        disabled={!isValid}
        onClick={onSubmit}
        className="
          border-2 rounded  py-1 mb-2
          hover:border-violet-400
          disabled:bg-zinc-400
        "
      >
        Изменить
      </button>
    </div>
  );
}