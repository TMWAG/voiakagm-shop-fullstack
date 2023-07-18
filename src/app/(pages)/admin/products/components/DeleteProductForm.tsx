import useCheckValidity from "@/hooks/useCheckValidity";
import { IValidateableTextInput } from "@/lib/types";

export default function DeleteProductForm({
  productName,
  confirmation,
  onConfirmationChange,
  onSubmit,
}: {
  productName: string;
  confirmation: IValidateableTextInput;
  onConfirmationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
}){
  const isValid = useCheckValidity(confirmation);
  return (
    <div
      className="
        flex flex-col h-full text-lg items-center justify-around
      "
    >
      <p className="w-2/3 text-center">
        Вы собираетесь удалить товар <span className="block text-center text-red-500">{productName}</span>
        это приведёт к удалению всех отзывов, относящихся к этому товару, введите в поле ниже
        <span className="block text-center text-red-500">{productName}</span>
        чтобы подтвердить удаление
      </p>
      <label className="flex flex-col">
        Подтверждение
        <input
          type='text'
          value={confirmation.value}
          onChange={onConfirmationChange}
          className="
            border-2 rounded focus:border-violet-400
            outline-none px-2 py-1 w-96
          "
        />
        <span className="text-red-500 text-base">{confirmation.error}</span>
      </label>
      <button
        disabled={!isValid}
        className="
          border-2 rounded hover:border-violet-400
          py-1 px-2 m-4 disabled:bg-zinc-300 
          hover:disabled:border-black 
          disabled:cursor-not-allowed
        "
        onClick={onSubmit}
      >
        Удалить
      </button>
    </div>
  );
}

