'use client';

import { useRouter } from "next/navigation";
import DeleteButton from "../../components/DeleteButton";
import Modal from "../../components/Modal";
import { useRef, useState } from "react";
import DeleteParameterForm from "./DeleteParameterForm";

export default function DeleteParameterButtonWithModal({
  id,
  parameterName,
}: {
  id: number;
  parameterName: string;
}){
  const router = useRouter();

  const [confirmation, setConfirmation] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(true);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const overlay = useRef<HTMLDivElement | null>(null);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === overlay.current) setHidden(true);
  };
  const onConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmation(e.target.value);
    if (e.target.value === parameterName) setSubmitDisabled(false);
    else setSubmitDisabled(true);
  };
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const params = new URLSearchParams();
    params.append('id', String(id));
    params.append('confirmation', confirmation);
    try {
      const res = await fetch(
        `/api/admin/parameters?${params.toString()}`,
        { method: 'DELETE' },
      );
      if (!res.ok) throw new Error(await res.text());
      setHidden(true);
      setSubmitDisabled(true);
      setConfirmation('');
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      button={<DeleteButton onClick={onButtonClick}/>}
      content={
        <DeleteParameterForm
          confirmation={confirmation}
          value={parameterName}
          onConfirmationChange={onConfirmationChange}
          onSubmit={onSubmit}
          submitDisabled={submitDisabled}
        />
      }
      hidden={hidden}
      onClick={onOverlayClick}
      overlayRef={overlay}
    />
  );
}