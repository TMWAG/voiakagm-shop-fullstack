'use client';

export default function EditCharacteristicButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}){
  return (
    <button className="
        text-yellow-500 border-2 rounded p-2
        hover:bg-yellow-500 hover:text-black
        ease-in-out duration-100
      "
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="currentColor" className="bi bi-wrench" viewBox="0 0 16 16">
        <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019.528.026.287.445.445.287.026.529L15 13l-.242.471-.026.529-.445.287-.287.445-.529.026L13 15l-.471-.242-.529-.026-.287-.445-.445-.287-.026-.529L11 13l.242-.471.026-.529.445-.287.287-.445.529-.026L13 11l.471.242z"/>
      </svg>
    </button>
  );
}