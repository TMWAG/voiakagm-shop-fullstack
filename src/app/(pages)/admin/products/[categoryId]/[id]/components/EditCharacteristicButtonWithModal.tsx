'use client';

import Modal from "@/app/(pages)/admin/components/Modal";
import { useRef, useState } from "react";
import EditCharacteristicButton from "./EditCharacteristicButton";
import EditCharacteristicForm from "./EditCharacteristicForm";
import { IValidateableTextInput } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function EditCharacteristicButtonWithModal({
  id,
  initialValue,
  parameterName,
}: {
  id: number;
  initialValue: string;
  parameterName: string;
}) {
  const router = useRouter();

  const [hidden, setHidden] = useState<boolean>(true);
  const overlay = useRef<HTMLDivElement | null>(null);
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === overlay.current) {
      setHidden(true);
    }
  };

  const [value, setValue] = useState<IValidateableTextInput>({
    error: '',
    valid: true,
    value: initialValue,
  });
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) {
      setValue({
        error: 'Значение должно быть указано',
        valid: false,
        value: e.target.value,
      });
    } else {
      setValue({
        error: '',
        valid: true,
        value: e.target.value,
      });
    }
  };
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        '/api/admin/characteristics',
        {
          method: 'PUT',
          body: JSON.stringify({
            id,
            value: value.value,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(await res.text());
      }
      setHidden(true);
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      button={<EditCharacteristicButton onClick={onButtonClick}/>}
      content={
        <EditCharacteristicForm
          onSubmit={onSubmit}
          onValueChange={onValueChange}
          value={value}
          parameterName={parameterName}
        />
      }
      hidden={hidden}
      onClick={onOverlayClick}
      overlayRef={overlay}
    />
  );
}