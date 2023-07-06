'use client';

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function AddParameterForm({
  categoryId,
}: {
  categoryId: number;
}){
  const router = useRouter();

  const [parameterName, setParameterName] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(true);

  const overlay = useRef<HTMLDivElement | null>(null);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.target === overlay.current) setHidden(true);
  };
  const onParameterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameterName(e.target.value);
  };
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        '/api/admin/parameters',
        {
          method: 'POST',
          body: JSON.stringify({
            categoryId,
            name: parameterName,
          }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setParameterName('');
      setHidden(true);
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button
        className="
          border h-auto bg-white p-3
          hover:shadow-xl hover:scale-105
          shadow-none duration-100 ease-in-out antialiased
        "
        onClick={onButtonClick}
      >
        Добавить
      </button>
      {!hidden &&
        <div
          ref={overlay}
          className="
            text-black fixed top-0 left-0
            z-10 w-screen h-screen bg-black/25
          "
          onClick={onOverlayClick}
        >
          <div
            className="
              absolute flex flex-col items-center
              top-2/4 left-2/4 h-fit w-fit
              -translate-y-2/4 -translate-x-2/4
              rounded border bg-white
            "
          >
            <div className="flex flex-col w-96 my-2 items-center">
              <label htmlFor="parameterName">
                Название нового параметра
              </label>
              <input
                placeholder="Объём памяти"
                type="text"
                value={parameterName}
                onChange={onParameterNameChange}
                id="parameterName"
                className="
                  border-2 rounded focus:border-violet-400
                  outline-none px-2 py-1
                "
              />
              <button
                className="
                  w-2/5 border-2 rounded 
                  hover:border-violet-400 my-2
                "
                onClick={onSubmit}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}