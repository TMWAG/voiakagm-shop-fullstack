'use client';

import useCheckValidity from "@/hooks/useCheckValidity";
import { IValidateableTextInput } from "@/lib/types";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RestorePage(){
  const query = useSearchParams();
  
  const [newPassword, setNewPassword] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const [newPasswordConfirmation, setPasswordConfirmation] = useState<IValidateableTextInput>({
    error: '',
    valid: false,
    value: '',
  });
  const [passFieldType, setPassFieldType] = useState<'text' | 'password'>('password');
  const [passVisibilityText, setPassVisibilityText] = useState<string>('Показать пароль');

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!passwordRegExp.test(e.target.value)) {
      setNewPassword({ error: 'Пароль должен содержать больше 8 символов, включая буквы, цифры и спецсимволы', valid: false, value: e.target.value });
      return;
    }
    setNewPassword({ error: '', valid: true, value: e.target.value });
  };
  const onPasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== newPassword.value) {
      setPasswordConfirmation({ error: 'Пароли не совпадают', valid: false, value: e.target.value });
    } else {
      setPasswordConfirmation({ error: '', valid: true, value: e.target.value });
    }
  };

  const toggleVisibility = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
  
  const isValid = useCheckValidity(newPassword, newPasswordConfirmation);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        '/api/auth/reset',
        {
          method: 'POST',
          body: JSON.stringify({
            token: query.get('token'),
            newPassword: newPassword.value,
            newPasswordConfirmation: newPasswordConfirmation.value,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(await res.text());
      }
      redirect('/');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-2/3 mt-12">
      <span className="block text-2xl font-bold">
        Сброс пароля
      </span>
      <div className="w-96 flex flex-col">
        <label className="flex flex-col">
          Новый пароль
          <input
            type={passFieldType}
            value={newPassword.value}
            onChange={onPasswordChange}
            placeholder="СлОжНыЙ_ПаРоЛь_228"
            className="
              border-2 rounded p-1 focus:border-violet-400
              outline-none
            "
          />
          <span className="text-red-500">
            {newPassword.error}
          </span>
        </label>
        <label className="flex flex-col">
          Пароль ещё раз
          <input
            type={passFieldType}
            value={newPasswordConfirmation.value}
            onChange={onPasswordConfirmationChange}
            placeholder="СлОжНыЙ_ПаРоЛь_228"
            className="
              border-2 rounded p-1 focus:border-violet-400
              outline-none
            "
          />
          <span className="text-red-500">{newPasswordConfirmation.error}</span>
        </label>
        <button
          onClick={toggleVisibility}
          className={`
            ${passFieldType === 'text' && 'bg-violet-500 text-white'}
            p-1 border-violet-500 border-2 rounded-sm w-48 my-3 mx-auto`
          }
        >
          {passVisibilityText}
        </button>
        <button
          disabled={!isValid}
          onClick={onSubmit}
          className="
            p-1 rounded-sm w-48 my-3 mx-auto
            border-violet-500 border-2
            active:bg-violet-500 active:text-white 
            disabled:active:text-black disabled:border-zinc-600
            disabled:cursor-not-allowed disabled:bg-zinc-400
          "
        >
          Изменить пароль
        </button>
      </div>
    </div>
  );
}