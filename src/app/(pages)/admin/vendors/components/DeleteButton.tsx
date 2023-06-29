'use client';

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function DeleteButton({
  vendorName,
  id,
}: {
  vendorName: string;
  id: number;
}){
  const router = useRouter();

  const [hidden, setHidden] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [confirmation, setConfirmation] = useState<string>('');
  const deleteOverlay = useRef<HTMLDivElement | null>(null);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === deleteOverlay.current) setHidden(true);
  };
  const onConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmation(e.target.value);
    if (e.target.value === vendorName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    } 
  };
  
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append('id', String(id));
    params.append('confirmation', confirmation);
    try {
      const res = await fetch(
        `/api/admin/vendors?`.concat(params.toString()),
        { method: 'DELETE' },
      );
      if (!res.ok) throw new Error(await res.text());
    } catch (error: any) {
      console.log(error.message);
    }
    
    setHidden(true);
    setDisabled(true);
    router.refresh();
  };
  return(
    <>
      <button
        onClick={onClick}
        className="
          bg-zinc-300 grow p-2 w-1/2 hover:bg-red-400
          ease-in-out delay-0 duration-100
        "
      >
        Удалить
      </button>
      {!hidden &&
        <div
          ref={deleteOverlay}
          hidden={hidden}
          className="
            text-black fixed top-0 left-0
            z-10 w-screen h-screen bg-black/25
          "
          onClick={onOverlayClick}
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
            <div 
              className="
                flex flex-col w-96 h-full
                items-center justify-center
                text-lg text-justify
              "
            >
              Вы собираетесь удалить производителя:
              <span
                className="
                  text-red-500 text-center block m-3
                "
              >
                {vendorName}
              </span>
              Это приведёт к удалению всех товаров, относящихся к нему. Это действие необратимо!
              Введите в поле ниже <span className="text-red-500 m-3">{vendorName}</span> чтобы подтвердить удаление.
              <input
                type="text"
                className="
                  border-2 rounded p-1 focus:border-violet-400
                  outline-none w-96
                "
                value={confirmation}
                onChange={onConfirmationChange}
              />
              <button
                disabled={disabled}
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
          </div>
        </div>
    }
    </>
  );
}