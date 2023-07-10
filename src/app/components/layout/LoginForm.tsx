'use client';

import FormInput from "@/components/UI/FormInput";
import useCheckValidity from "@/hooks/useCheckValidity";
import { IValidateableTextInput } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function LoginForm({ hidden }: { hidden?: boolean }) {
  const router = useRouter();
  const [emailData, setEmailData] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const [passwordData, setPasswordData] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const [passFieldType, setPassFieldType] = useState<'text' | 'password'>('password');
  const [passVisibilityText, setPassVisibilityText] = useState<string>('Показать пароль');
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailRegExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    if (!emailRegExp.test(e.target.value)) {
      setEmailData({ error: 'Email имеет неверный формат', valid: false, value: e.target.value });
      return;
    }
    setEmailData({ error: '', valid: true, value: e.target.value });
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordRegExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!passwordRegExp.test(e.target.value)) {
      setPasswordData({ error: 'Пароль должен содержать больше 8 символов, включая буквы, цифры и спецсимволы', valid: false, value: e.target.value });
      return;
    }
    setPasswordData({ error: '', valid: true, value: e.target.value });
  };
  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (passFieldType === 'password') {
      setPassFieldType('text');
      setPassVisibilityText('Скрыть пароль');
    }
    else {
      setPassFieldType('password');
      setPassVisibilityText('Показать пароль');
    }
  };
  const isValid = useCheckValidity(emailData, passwordData);
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fetch('api/auth/login', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailData.value,
        password: passwordData.value,
      }),
    })
    .then(() => router.refresh());
  };
  return (
    <div className={`${hidden && 'hidden'} w-96 flex flex-col items-center`}>
      <FormInput
        error={emailData.error}
        id="loginEmailInput"
        name="Email"
        onChange={onEmailChange}
        placeholder="example.mail.com"
        type="email"
        value={emailData.value}
      />
      <FormInput
        error={passwordData.error}
        id="loginPasswordInput"
        name="Пароль"
        onChange={onPasswordChange}
        placeholder="Ваш пароль"
        type={passFieldType}
        value={passwordData.value}
      />
      <button
        onClick={togglePasswordVisibility}
        className={`${passFieldType === 'text' && 'bg-violet-500 text-white'} p-1 border-violet-500 border-2 rounded-sm w-48 mb-3`}
      >
        {passVisibilityText}
      </button>
      <button
        onClick={onSubmit}
        className="p-1 border-violet-500 border-2 rounded-sm w-48 active:bg-violet-500 active:text-white disabled:active:text-black disabled:border-zinc-600 disabled:cursor-not-allowed disabled:bg-zinc-400"
        disabled={!isValid}
      >
        Войти
      </button>
    </div>
  );
}