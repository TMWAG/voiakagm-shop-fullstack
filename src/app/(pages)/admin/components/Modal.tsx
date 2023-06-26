'use client';

import { useRef, useState } from "react";

export default function Modal({
  buttonText,
  children,
}: {
  buttonText: string; 
  children: React.ReactNode;
}){
  const [hidden, setHidden] = useState<boolean>(true);
  const overlay = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <button
        className="
          border-[1px] h-24 bg-white flex
          flex-col justify-between p-3 hover:shadow-xl
          hover:scale-110 shadow-none ease-in-out
          delay-0 duration-100
        "
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          setHidden(!hidden);
        }}
      >
        {buttonText}
      </button>
      <div
        ref={overlay}
        hidden={hidden}
        className="
          text-black fixed top-0 left-0
          z-10 w-screen h-screen bg-black/25
        "
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (e.target === overlay.current) setHidden(!hidden);
        }}
      >
        <div
          className="
            absolute flex flex-col
            items-center top-2/4 left-2/4
            h-2/3 w-2/5 -translate-x-2/4
            -translate-y-2/4 rounded border-[1px]
            bg-white
          "
        >
          {children}
        </div>
      </div>
    </>
  );
}