'use client';

import Modal from "@/app/(pages)/admin/components/Modal";
import { useRef, useState } from "react";
import AddCharacteristicButton from "./AddCharacteristicButton";
import AddCharacteristicForm from "./AddCharacteristicForm";
import { Prisma } from "@prisma/client";
import { IValidateableTextInput } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function AddCharacteristicButtonWithModal({
  parameters,
  productId,
}: {
  parameters: Prisma.ProductParameterGetPayload<{}>[],
  productId: number;
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

  const [parameterId, setParameterId] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '----',
  });
  const onParameterIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParameterId({
      error: '',
      valid: true,
      value: Number(e.target.value),
    });
  };

  const [value, setValue] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length < 1) {
      setValue({
        error: 'Значение необходимо указать',
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
    try {
      const res = await fetch(
        '/api/admin/characteristics',
        {
          method: 'POST',
          body: JSON.stringify({
            productId,
            parameterId: Number(parameterId.value),
            value: value.value,          
          }),
        }
      );
      if (!res.ok) {
        throw new Error(await res.text());
      }
      setHidden(true);
      setParameterId({
        error: '',
        valid: false,
        value: '----',
      });
      setValue({
        error: '',
        valid: false,
        value: '',
      });
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      button={<AddCharacteristicButton onClick={onButtonClick}/>}
      content={
        <AddCharacteristicForm
          parameterId={parameterId}
          value={value}
          onParameterIdChange={onParameterIdChange}
          onValueChange={onValueChange}
          parameters={parameters}
          onSubmit={onSubmit}
        />
      }
      hidden={hidden}
      onClick={onOverlayClick}
      overlayRef={overlay}
    />
  );
}