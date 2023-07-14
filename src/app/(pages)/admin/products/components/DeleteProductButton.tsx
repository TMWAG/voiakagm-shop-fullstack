'use client';

export default function DeleteProductButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <button
      className="
          w-5/12 bg-zinc-300 
          hover:bg-red-400 
          py-1 rounded
        "
        onClick={onClick}
      >
      Удалить
    </button>
  );
}