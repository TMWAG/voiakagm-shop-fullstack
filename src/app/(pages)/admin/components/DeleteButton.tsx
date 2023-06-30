'use client';

export default function DeleteButton({
  onClick,
}:{
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}){
  return (
    <button
      onClick={onClick}
      className="
        bg-zinc-300 grow p-2 w-1/2 hover:bg-red-400
        ease-in-out delay-0 duration-100
      "
    >
      Удалить
    </button>
  );
}