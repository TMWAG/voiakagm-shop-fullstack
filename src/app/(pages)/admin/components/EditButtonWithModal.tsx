'use client';

import { useRef, useState } from "react";
import Modal from "./Modal";
import EditEntityForm from "./EditEntityForm";
import EditButton from "./EditButton";
import { useRouter } from "next/navigation";

export default function EditButtonWithModal({
  entityId,
  initialValue,
  path,
}: {
  entityId: number;
  initialValue: string;
  path: 'categories' | 'vendors';
}){
  const router = useRouter();

  const [hidden, setHidden] = useState<boolean>(true);
  const [nameValue, setNameValue] = useState<string>(initialValue);
  const [newPicture, setNewPicture] = useState<undefined | File>(undefined);

  const overlay = useRef<HTMLDivElement | null>(null);
  
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(overlay.current);
    if (e.target === overlay.current) setHidden(true);
  };
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPicture(e.target.files?.[0]);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.set('id', String(entityId));
    data.set('newName', nameValue);
    if (newPicture !== undefined) {
      data.set('newPicture', newPicture);
    }
    try {
      const res = await fetch(
        `/api/admin/${path}`,
        {
          method: 'PUT',
          body: data,
        },
      );
      if (!res.ok) throw new Error(await res.text());
      setHidden(true);
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Modal
      onClick={onOverlayClick} 
      overlayRef={overlay}
      hidden={hidden}
      button={<EditButton onClick={onButtonClick}/>}
      content={
        <EditEntityForm
          nameValue={nameValue}
          onTextChange={onTextChange}
          onFileChange={onFileChange}
          onSubmit={onSubmit}
        />
      }
    />
  );
}