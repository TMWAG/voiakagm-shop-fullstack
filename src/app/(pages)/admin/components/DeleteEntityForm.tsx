export default function DeleteEntityForm({
  entityName,
  confirmation,
  onConfirmationChange,
  submitDisabled,
  onSubmit,
}: {
  entityName: string;
  confirmation: string;
  onConfirmationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitDisabled: boolean;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
}){
  return (
    <div
      className="
        flex flex-col w-96 h-full
        items-center justify-center
        text-lg text-justify
      "
    >
      Вы собираетесь удалить сущность
      <span
        className="
          text-red-500 text-center block m-3
        "
      >
        {entityName}
      </span>
      Это приведёт к удалению всех товаров, относящихся к ней. Это действие необратимо!
      Введите в поле ниже
      <span className="text-red-500 m-3">
        {entityName}
      </span>
      чтобы подтвердить удаление.
      <input
        type="text"
        className="
          border-2 rounded p-1 focus:border-violet-400
          outline-none w-96
        "
        onChange={onConfirmationChange}
        value={confirmation}
      />
      <button
        disabled={submitDisabled}
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