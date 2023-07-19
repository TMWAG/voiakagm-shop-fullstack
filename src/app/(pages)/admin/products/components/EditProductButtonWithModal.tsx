'use client';

import { type Prisma } from "@prisma/client";
import Modal from "../../components/Modal";
import EditProductButton from "./EditProductButton";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ProductForm from "./ProductForm";
import { IValidateableTextInput } from "@/lib/types";

export default function EditProductButtonWithModal({
  product,
  vendors,
}: {
  vendors: Prisma.VendorGetPayload<{}>[];
  product: Prisma.ProductGetPayload<{
    include: {
      pictures: true,
      category: {
        select: { name: true },
      },
      vendor: {
        select: { name: true },
      },
    },
  }>
}){
  const router = useRouter();

  const [hidden, setHidden] = useState<boolean>(true);
  const [used, setUsed] = useState<boolean>(product.used);

  const [amount, setAmount] = useState<IValidateableTextInput>({
    error: '',
    valid: true,
    value: product.amount,
  });
  const [description, setDescription] = useState<IValidateableTextInput>({
    error: '',
    valid: true,
    value: product.description,
  });
  const [discount, setDiscount] = useState<IValidateableTextInput>({
    error: '',
    valid: true,
    value: product.discount,
  });
  const [name, setName] = useState<IValidateableTextInput>({
    error: '',
    valid: true,
    value: product.name,
  });
  const [price, setPrice] = useState<IValidateableTextInput>({
    error: '',
    valid: true,
    value: product.price,
  });
  const [vendor, setVendor] = useState<IValidateableTextInput>({
    error: '',
    valid: true,
    value: product.vendorId,
  });

  const overlay = useRef<HTMLDivElement | null>(null);

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setHidden(false);
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === overlay.current) setHidden(true);
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
  const onUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsed(!used);
  };
  const onVendorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVendor({
      error: '',
      valid: true,
      value: Number(e.target.value),
    });
  };
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        '/api/admin/products',
        {
          method: 'PUT',
          body: JSON.stringify({
            id: product.id,
            name: name.value,
            vendorId: Number(vendor.value),
            categoryId: Number(product.categoryId),
            price: Number(price.value),
            discount: discount.value
              ? Number(discount.value)
              : undefined,
            description: description.value,
            amount: Number(amount.value),
            used,
          }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      const {data} = await res.json() as {
        status: 'success',
        data: {
          amount: number;
          categoryId: number;
          description: string;
          discount: number;
          id: number;
          name: string;
          price: number;
          sold: number;
          used: boolean;
          vendorId: number;
        }
      };
      setAmount({
        error: '',
        valid: true,
        value: data.amount,
      });
      setDescription({
        error: '',
        valid: true,
        value: data.description,
      });
      setDiscount({
        error: '',
        valid: true,
        value: data.discount,
      });
      setName({
        error: '',
        valid: true,
        value: data.name,
      });
      setPrice({
        error: '',
        valid: true,
        value: data.price,
      });
      setVendor({
        error: '',
        valid: true,
        value: data.vendorId,
      });
      setUsed(false);
      setHidden(true);
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      button={<EditProductButton onClick={onButtonClick}/>}
      content={
        <ProductForm
          amount={amount}
          description={description}
          discount={discount}
          name={name}
          onAmountChange={onAmountChange}
          onDescriptionChange={onDescriptionChange}
          onDiscountChange={onDiscountChange}
          onNameChange={onNameChange}
          onPriceChange={onPriceChange}
          onSubmit={onSubmit}
          onUsedChange={onUsedChange}
          onVendorChange={onVendorChange}
          price={price}
          used={used}
          vendor={vendor}
          vendors={vendors}
          actionName="Изменить"
        />
      }
      hidden={hidden}
      onClick={onOverlayClick}
      overlayRef={overlay}
    />
  );
}