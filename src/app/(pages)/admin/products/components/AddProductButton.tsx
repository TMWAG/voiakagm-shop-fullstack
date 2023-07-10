export default function AddProductButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}){
  return (
    <button
      onClick={onClick}
      className="
        border bg-white
        flex flex-col justify-center
        align-middle hover:scale-110
        ease-in-out duration-100
      "
    >
      Добавить
    </button>
  );
}