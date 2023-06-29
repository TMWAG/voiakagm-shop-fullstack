'use client';

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function EditButton({
  initialValue,
  id,
}: {
  initialValue: string;
  id: number;
}) {
  const [hidden, setHidden] = useState<boolean>(true);
  const [newVendorName, setNewVendorName] = useState<string>(initialValue);
  const [vendorPicture, setVendorPicture] = useState<undefined | File>(undefined);
  const editOverlay = useRef<HTMLDivElement | null>(null);
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === editOverlay.current) setHidden(true);
  };
  const onVendorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVendorName(e.target.value);
  };
  const onPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendorPicture(e.target.files?.[0]);
  };
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.set('id', String(id));
    data.set('newName', newVendorName);
    if (vendorPicture !== undefined) {
      data.set('newPicture', vendorPicture);
    }
    try {
      const res = await fetch(
        '/api/admin/vendors',
        {
          method: 'PUT',
          body: data,
        }
      );
      if (!res.ok) throw new Error(await res.text());
      console.log(await res.json());
      setHidden(true);
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <>
      <button
        onClick={onClick}
        className="
          bg-zinc-300 grow p-2 w-1/2 hover:bg-yellow-400
          ease-in-out delay-0 duration-100
        "
      >
        Изменить
      </button>
      {!hidden &&
        <div
          ref={editOverlay}
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
            <form
              onSubmit={onSubmit}
              className="
                flex flex-col items-center justify-center
                w-full h-full
              "
            >
              <div className="flex flex-col w-2/5 my-2">
                <label htmlFor="vendorName">
                  Название производителя
                </label>
                <input
                  type="text"
                  name="newVendorName"
                  id="vendorName"
                  className="
                    border-2 rounded p-1 focus:border-violet-400
                    outline-none
                  "
                  value={newVendorName}
                  onChange={onVendorNameChange}
                />
              </div>
              <div className="flex flex-col w-2/5 my-2">
                <label htmlFor="vendorPicture">Логотип производителя</label>
                <input
                  className="
                    block text-sm text-center w-full
                    file:bg-zinc-200 file:border-0
                    file:rounded file:py-2 file:px-4
                    file:hover:bg-zinc-300 file:w-32
                  "
                  type="file"
                  name="newPicture"
                  id="vendorPicture"
                  onChange={onPictureChange}
                />
              </div>
              <input
                className="
                  w-2/5 border-2 rounded hover:border-violet-400
                "
                type="submit"
                value="Изменить производителя"
              />
            </form>
          </div>
        </div>
      }
    </>
  );
}