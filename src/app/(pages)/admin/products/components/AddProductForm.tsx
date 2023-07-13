import useCheckValidity from "@/hooks/useCheckValidity";
import { IValidateableTextInput } from "@/lib/types";
import { Prisma } from "@prisma/client";

export default function AddProductForm({
  name,
  onNameChange,
  onVendorChange,
  vendor,
  vendors,
  price,
  onPriceChange,
  discount,
  onDiscountChange,
  description,
  onDescriptionChange,
  amount,
  onAmountChange,
  used,
  onUsedChange,
  onSubmit,
}: {
  name: IValidateableTextInput;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  vendors: Prisma.VendorGetPayload<{}>[];
  vendor: IValidateableTextInput;
  onVendorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  price: IValidateableTextInput;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  discount: IValidateableTextInput;
  onDiscountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description: IValidateableTextInput;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  amount: IValidateableTextInput;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  used: boolean;
  onUsedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}){
  const isValid = useCheckValidity(name, price, discount, description, amount, vendor);
  return (
    <div
      className="
        flex gap-5 w-full px-4 py-2
      "
    >
      <div className="w-1/2 flex flex-col h-full justify-between">
        <label className="flex flex-col">
          Название товара
          <input
            type="text"
            value={name.value}
            onChange={onNameChange}
            className="
              border-2 rounded p-1 focus:border-violet-400
              outline-none
            "
            placeholder="Сталин 3000"
          />
          <span className="text-red-500 h-2">
            {name.error}
          </span>
        </label>
        <label className="flex flex-col">
          Производитель
          <select
            value={vendor.value}
            onChange={onVendorChange}
            className="
              border-2 rounded p-1 focus:border-violet-400
              outline-none bg-white
            "
          >
            <option disabled>----</option>
            {vendors.map((v) => (
              <option
                key={v.id}
                value={v.id}
              >
                {v.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          Цена (в копейках)
          <input
            type="text"
            onChange={onPriceChange}
            value={price.value}
            placeholder="10000000"
            className="
              border-2 rounded p-1 focus:border-violet-400
              outline-none
            "
          />
          <span className="text-red-500 h-2">{price.error}</span>
        </label>
        <label className="flex flex-col">
          Скидка
          <input
            type="text"
            placeholder="12"
            value={discount.value}
            onChange={onDiscountChange}
            className="
              border-2 rounded p-1 focus:border-violet-400
              outline-none
            "
          />
          <span className="text-red-500 h-2">{discount.error}</span>
        </label>
        <label className="flex flex-col">
          Количество
          <input
            type="text"
            placeholder="20"
            value={amount.value}
            onChange={onAmountChange}
            className="
              border-2 rounded p-1 focus:border-violet-400
              outline-none
            "
          />
          <span className="text-red-500 h-2">{amount.error}</span>
        </label>
        <label className="flex items-center grow-0">
          Б/У
          <input
            type="checkbox"
            checked={used}
            onChange={onUsedChange}
            className="
              checked:bg-violet-400 
              appearance-none
              border checked:border-violet-400
              rounded h-4 w-4 mx-2 
            "
          />
        </label>
        <button
          className="
            border-2 rounded  py-1 mb-2
            hover:border-violet-400
            disabled:bg-zinc-400
          "
          onClick={onSubmit}
          disabled={!isValid}
        >
          Добавить товар
        </button>
      </div>
      <div className="w-1/2">
        <label className="flex flex-col">
          Описание
          <textarea
            cols={30}
            rows={23}
            className="
              resize-none border-2 rounded p-1 
              focus:border-violet-400 outline-none
            "
            value={description.value}
            onChange={onDescriptionChange}
          />
          <span className="text-red-500 h-2">{description.error}</span>
        </label>
      </div>
    </div>
  );
}
  