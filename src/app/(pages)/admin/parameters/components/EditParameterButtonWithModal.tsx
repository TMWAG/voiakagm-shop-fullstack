'use client';

import Modal from "../../components/Modal";
import EditButton from "../../components/EditButton";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import EditParameterForm from "./EditParameterForm";

export default function EditParameterButtonWithModal({
  id,
  initialName,
}: {
  initialName: string;
  id: number;
}){
  const router = useRouter();
  
  const [hidden, setHidden] = useState<boolean>(true);
  const [newName, setNewName] = useState<string>(initialName);

  const overlay = useRef<HTMLDivElement | null>(null);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === overlay.current) setHidden(true);
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        '/api/admin/parameters',
        {
          method: 'PUT',
          body: JSON.stringify({
            id,
            name: newName,
          }),
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
      button={<EditButton onClick={onButtonClick}/>}
      content={
        <EditParameterForm
          onNameChange={onNameChange}
          onSubmit={onSubmit}
          parameterName={newName}
        />
      }
      hidden={hidden}
      onClick={onOverlayClick}
      overlayRef={overlay}
    />
  );
}