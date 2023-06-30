'use client';

export default function EditEntityForm({
  nameValue,
  onTextChange,
  onFileChange,
  onSubmit,
}: {
  nameValue: string,
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}){
  return (
    <form
      onSubmit={onSubmit}
      className="
        flex flex-col items-center justify-center
        w-full h-full
      "
    >
      <div
        className="
          flex flex-col w-2/5 my-2
        "
      >
        <label htmlFor="name">Новое название</label>
        <input
          type="text"
          onChange={onTextChange}
          id="name"
          className="
            border-2 rounded p-1 focus:border-violet-400
            outline-none
          "
          value={nameValue}
        />
      </div>
      <div
        className="
          flex flex-col w-2/5 my-2
        "
      >
        <label htmlFor="picture">Новое изображение</label>
        <input
          type="file"
          onChange={onFileChange}
          id="picture"
          className="
            block text-sm text-center w-full
            file:bg-zinc-200 file:border-0
            file:rounded file:py-2 file:px-4
            file:hover:bg-zinc-300 file:w-32
          "
        />
      </div>
      <input
        type="submit"
        className="
          w-2/5 border-2 rounded
          hover:border-violet-400
        "
        value='Изменить'
      />
    </form>
  );
}