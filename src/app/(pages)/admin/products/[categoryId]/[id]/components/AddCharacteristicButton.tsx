'use client';

export default function AddCharacteristicButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        w-2/5 border-2 rounded py-1 px-2 my-2
        hover:border-violet-400 bg-white
      "
    >
      Добавить
    </button>
  );
};