'use client';
import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

export default function AuthPopup(){
  const [regFormHidden, setRegFormHidden] = useState<boolean>(false);
  const [logFormHidden, setLogFormHidden] = useState<boolean>(true);
  const onRegisterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setRegFormHidden(false);
    setLogFormHidden(true);
  };
  const onLoginClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault();
    setRegFormHidden(true);
    setLogFormHidden(false);
  };
  return (
    <div>
      <nav className="border-b-[1px]">
        <button
          className={`${logFormHidden&& 'text-white bg-violet-500'} text-lg w-1/2 rounded-tl`}
          onClick={onRegisterClick}
        >
          Регистрация
        </button>
        <button
          className={`${regFormHidden&& 'text-white bg-violet-500'} text-lg w-1/2 rounded-tr`}
          onClick={onLoginClick}
        >
          Вход
        </button>
      </nav>
      <div className="p-4 min-h-[40rem] flex items-center">
        <RegistrationForm hidden={regFormHidden}/>
        <LoginForm hidden={logFormHidden}/>
      </div>
    </div>
  );
}