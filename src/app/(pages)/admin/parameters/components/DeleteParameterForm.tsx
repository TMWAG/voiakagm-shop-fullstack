export default function DeleteParameterForm({
  confirmation,
  value,
  onConfirmationChange,
  onSubmit,
  submitDisabled,  
}: {
  submitDisabled: boolean;
  confirmation: string;
  value: string;
  onConfirmationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}){
  return (
    <div
      className="
        flex flex-col w-96 h-full
        items-center justify-center
        text-lg text-justify
      "
    >
      Вы собираетесь удалить параметр
      <span className="text-red-500 text-center block m-3">
        {value}
      </span>
      Это приведёт к удалению всех характеристик, связанных с этим параметром.
      Введите в поле ниже
      <span className="text-red-500 m-3">
        {value}
      </span>
      чтобы подтвердить удаление.
      <input
        type="text"
        value={confirmation}
        onChange={onConfirmationChange}
        className="
          border-2 rounded p-1 focus:border-violet-400
          outline-none w-96
        "
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