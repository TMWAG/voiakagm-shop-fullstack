'use client';

import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Modal from "../../components/Modal";
import AddProductButton from "./AddProductButton";
import AddProductForm from "./AddProductForm";
import { IValidateableTextInput } from "@/lib/types";

export default function AddProductButtonWithModal({
  vendors,
  categoryId,
}: {
  vendors: Prisma.VendorGetPayload<{}>[];
  categoryId: number;
}){
  const router = useRouter();

  const [name, setName] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const [price, setPrice] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const [discount, setDiscount] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const [description, setDescription] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const [amount, setAmount] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const [vendor, setVendor] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '----',
  });
  const [used, setUsed] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(true);

  const overlay = useRef<HTMLDivElement | null>(null);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === overlay.current) setHidden(true);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) {
      setName({
        error: 'Название должно быть указано',
        valid: false,
        value: e.target.value,
      });
    } else {
      setName({
        error: '',
        valid: true,
        value: e.target.value,
      });
    }
  };
  const onVendorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVendor({
      error: '',
      valid: true,
      value: Number(e.target.value),
    });
  };
  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(e.target.value))){
      setPrice({
        error: 'Должна состоять только из цифр',
        valid: false,
        value: e.target.value,
      });
    } else {
      setPrice({
        error: '',
        valid: true,
        value: e.target.value,
      });
    }
  };
  const onDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(e.target.value))) {
      setDiscount({
        error: 'Должна состоять только из цифр',
        valid: false,
        value: e.target.value,
      });
      return;
    }
    if (Number(e.target.value) > 99) {
      setDiscount({
        error: 'Скидка не может быть больше 100%',
        valid: false,
        value: e.target.value,
      });
      return;
    }
    setDiscount({
      error: '',
      valid: true,
      value: e.target.value,
    });
  };
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 1) {
      setDescription({
        error: 'Описание должно быть указано',
        valid: false,
        value: e.target.value,
      });
      return;
    }
    setDescription({
      error: '',
      valid: true,
      value: e.target.value,
    });
  
  };
  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(e.target.value))) {
      setAmount({
        error: 'Может содержать только цифры',
        valid: false,
        value: e.target.value,
      });
      return;
    }
    setAmount({
      error: '',
      valid: true,
      value: e.target.value,
    });
  };
  const onUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsed(!used);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        '/api/admin/products',
        {
          method: 'POST',
          body: JSON.stringify({
            name: name.value,
            vendorId: Number(vendor),
            categoryId: Number(categoryId),
            price: Number(price.value),
            discount: discount.value
              ? discount.value
              : undefined,
            description: description.value,
            amount: Number(amount.value),
            used,
          }),
        }
      );
      console.log (res);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  return (
    <Modal
      button={<AddProductButton onClick={onButtonClick}/>}
      content={
        <AddProductForm
          name={name}
          onNameChange={onNameChange}
          onVendorChange={onVendorChange}
          vendor={vendor}
          vendors={vendors}
          onPriceChange={onPriceChange}
          price={price}
          discount={discount}
          onDiscountChange={onDiscountChange}
          description={description}
          onDescriptionChange={onDescriptionChange}
          amount={amount}
          onAmountChange={onAmountChange}
          used={used}
          onUsedChange={onUsedChange}
          onSubmit={onSubmit}
        />
      }
      hidden={hidden}
      onClick={onOverlayClick}
      overlayRef={overlay}
    />
  );
}