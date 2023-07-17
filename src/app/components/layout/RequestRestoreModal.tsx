'use client';

import Modal from "@/app/(pages)/admin/components/Modal";
import { useRef, useState } from "react";
import ForgotPasswordButton from "./ForgotPasswordButton";
import RequestRestoreForm from "./RequestRestoreForm";
import { IValidateableTextInput } from "@/lib/types";

export default function RequestRestoreModal(){
  const ref = useRef<HTMLDivElement | null>(null);

  const [hidden, setHidden] = useState<boolean>(true);

  const [email, setEmail] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  
  const onButtonClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setHidden(false);
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current === e.target) {
      setHidden(true);
    }
  };
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        '/api/auth/request_reset',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email.value,
          }),
        },
      );
      if (!res.ok) {
        throw new Error(await res.text());
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    if (!emailRegExp.test(e.target.value)) {
      setEmail({ error: 'Email имеет неверный формат', valid: false, value: e.target.value });
      return;
    }
    setEmail({ error: '', valid: true, value: e.target.value });
  };
  return (
    <Modal
      button={<ForgotPasswordButton onButtonClick={onButtonClick}/>}
      content={
        <RequestRestoreForm
          email={email}
          onEmailChange={onEmailChange}
          onSubmit={onSubmit}
        />
      }
      hidden={hidden}
      onClick={onOverlayClick}
      overlayRef={ref}
    />
  );
}