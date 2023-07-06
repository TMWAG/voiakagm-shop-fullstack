export default function EditParameterForm({
  parameterName,
  onNameChange,
  onSubmit,
}: {
  parameterName: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
}){
  return(
    <div
      className="
        flex flex-col items-center h-full
      "
    > 
      <div
        className="
          flex flex-col
        "
      >
        <label htmlFor="name">
          Новое название
        </label>
        <input
          type="text"
          value={parameterName}
          onChange={onNameChange}
          id="name"
          className="
            border-2 rounded p-1 outline-none
            focus:border-violet-400
          "
        />
      </div>
      <button
        className="
          w-2/5 border-2 rounded py-1 px-2 my-2
          hover:border-violet-400
        "
        onClick={onSubmit}
      >
        Изменить
      </button>
    </div>
  );
}