'use client';

import { useRouter } from "next/navigation";
import Modal from "../../components/Modal";
import { useRef, useState } from "react";
import DeleteProductButton from "./DeleteProductButton";
import DeleteProductForm from "./DeleteProductForm";
import { IValidateableTextInput } from "@/lib/types";

export default function DeleteProductButtonWithModal({
  productName,
  productId,
}: {
  productName: string;
  productId: number;
}){
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

  const [confirmation, setConfirmation] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const onConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== productName){
      setConfirmation({
        error: 'Подтверждение не совпадает',
        valid: false,
        value: e.target.value,
      });
      return;
    }
    setConfirmation({
      error: '',
      valid: true,
      value: e.target.value,
    });
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/admin/products?id=${productId}`, 
        {
          method: 'DELETE',
        }
      );
      if (!res.ok){
        throw new Error(await res.text());
      }
      router.push('/admin/products/');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      button={<DeleteProductButton onClick={onButtonClick}/>}
      content={
        <DeleteProductForm
          productName={productName}
          confirmation={confirmation}
          onConfirmationChange={onConfirmationChange}
          onSubmit={onSubmit}
        />
      }
      hidden={hidden}
      onClick={onOverlayClick}
      overlayRef={overlay}
    />
  );
}