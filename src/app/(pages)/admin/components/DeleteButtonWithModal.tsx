'use client';

import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";
import Modal from "./Modal";
import { useRef, useState } from "react";
import DeleteEntityForm from "./DeleteEntityForm";

export default function DeleteButtonWithModal({
  entityId,
  path,
  entityName,
}: {
  entityId: number;
  path: 'categories' | 'vendors';
  entityName: string;
}) {
  const router = useRouter();

  const [hidden, setHidden] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [confirmation, setConfirmation] = useState<string>('');

  const overlay = useRef<HTMLDivElement | null>(null);

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === overlay.current) {
      setHidden(true);
      setConfirmation('');
    };
  };
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmation(e.target.value);
    if (e.target.value === entityName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const params = new URLSearchParams();
    params.append('id', String(entityId));
    params.append('confirmation', confirmation);
    try {
      const res = await fetch (
        `/api/admin/${path}?${params.toString()}`,
        { method: 'DELETE' },
      );
      if (!res.ok) throw new Error(await res.text());
      setHidden(true);
      setDisabled(true);
      setConfirmation('');
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <Modal
      overlayRef={overlay}
      onClick={onOverlayClick}
      hidden={hidden}
      button={<DeleteButton onClick={onButtonClick}/>}
      content={
        <DeleteEntityForm
          confirmation={confirmation}
          entityName={entityName}
          onConfirmationChange={onConfirmationChange}
          onSubmit={onSubmit}
          submitDisabled={disabled}
        />
      }
    />
  );
}