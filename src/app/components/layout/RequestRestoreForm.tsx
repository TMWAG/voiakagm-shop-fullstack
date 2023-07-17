'use client';

import useCheckValidity from "@/hooks/useCheckValidity";
import { IValidateableTextInput } from "@/lib/types";

export default function RequestRestoreForm({
  email,
  onEmailChange,
  onSubmit,
}: {
  email: IValidateableTextInput;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}){
  const isValid = useCheckValidity(email);
  return (
    <div
      className="
        flex flex-col h-full
        items-center justify-center
      "
    >
      <label
        className="
          flex flex-col h-24
        "
      >
        Email
        <input
          className="
            border-2 rounded p-1 focus:border-violet-400
            outline-none
          "
          value={email.value}
          onChange={onEmailChange}
          placeholder="example@me.co"
          type="email"
        />
        <span className="text-red-400">{email.error}</span>
      </label>
      <button
        className="
          p-1 border-violet-500 border-2
          rounded-sm w-48 active:bg-violet-500
          active:text-white disabled:active:text-black
          disabled:border-zinc-600
          disabled:cursor-not-allowed disabled:bg-zinc-400
        "
        disabled={!isValid}
        onClick={onSubmit}
      >
        Запросить сброс пароля
      </button>
    </div>
  );
}