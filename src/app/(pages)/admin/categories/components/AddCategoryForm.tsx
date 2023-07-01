'use client';

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function AddCategoryForm() {
  const router = useRouter();
  
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryPicture, setCategoryPicture] = useState<undefined | File>(undefined);
  const [hidden, setHidden] = useState<boolean>(true);

  const overlay = useRef<HTMLDivElement | null>(null);

  const onCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };
  const onPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryPicture(e.target.files?.[0]);
  };
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryPicture) return;
    const data = new FormData();
    data.set('name', categoryName);
    data.set('picture', categoryPicture);
    try {
      const res = await fetch(
        '/api/admin/categories',
        {
          method: 'POST',
          body: data,
        }
      );
      if (!res.ok) throw new Error(await res.text());
      console.log(await res.json());
      router.refresh();
      setHidden(true);
      setCategoryName('');
      setCategoryPicture(undefined);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
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
        Добавить категорию
      </button>
      {!hidden &&
        <div
          ref={overlay}
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
            <form
              className="
                flex flex-col items-center justify-center
                w-full h-full
              "
              onSubmit={onSubmit}
            >
              <div className="flex flex-col w-2/5 my-2">
                <label htmlFor="categoryName">Название категории</label>
                <input
                  className="
                    border-2 rounded p-1 focus:border-violet-400
                    outline-none
                  "
                  placeholder="Видеокарты"
                  value={categoryName}
                  type="text"
                  name="name"
                  id="categoryName"
                  onChange={onCategoryNameChange}
                />
              </div>
              <div className="flex flex-col w-2/5 my-2">
                <label htmlFor="categoryPicture">Изображение категории</label>
                <input
                  className="
                    block text-sm text-center w-full
                    file:bg-zinc-200 file:border-0
                    file:rounded file:py-2 file:px-4
                    file:hover:bg-zinc-300 file:w-32
                  "
                  type="file"
                  name="picture"
                  id="categoryPicture"
                  onChange={onPictureChange}
                />
              </div>
              <input
                className="
                  w-2/5 border-2 rounded hover:border-violet-400
                "
                type="submit"
                value="Добавить категорию"
              />
            </form>
          </div>
        </div>
      }
    </>
  );
}
