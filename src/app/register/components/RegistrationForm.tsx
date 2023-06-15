'use client';

import FormInput from "@/components/UI/FormInput";
import { IRegisterDataItem } from "@/lib/types";
import { useState, ChangeEvent, useEffect } from "react";



export default function RegistrationForm() {
  const [nameData, setNameData] = useState<IRegisterDataItem>({
    error: '',
    valid: false,
    value: '',
  });
  const [surnameData, setSurnameData] = useState<IRegisterDataItem>({
    error: '',
    valid: false,
    value: '',
  });
  const [phoneData, setPhoneData] = useState<IRegisterDataItem>({
    error: '',
    valid: false,
    value: '',
  });
  const [emailData, setEmailData] = useState<IRegisterDataItem>({
    error: '',
    valid: false,
    value: '',
  });
  const [passwordData, setPasswordData] = useState<IRegisterDataItem>({
    error: '',
    valid: false,
    value: '',
  });
  const [passwordConfirmationData, setPasswordConfirmationData] = useState<IRegisterDataItem>({
    error: '',
    valid: false,
    value: '',
  });

  const [disabled, setDisabled] = useState<boolean>(true);

  const [passFieldType, setPassFieldType] = useState<'text' | 'password'>('password');
  const [passVisibilityText, setPassVisibilityText] = useState<string>('Показать пароль');

  const [registrationResult, setRegistrationResult] = useState<true | string[]>([]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) {
      setNameData({ error: 'Поле обязательно к заполнению!', valid: false, value: e.target.value });
      return;
    }
    setNameData({ error: '', valid: true, value: e.target.value });
  };
  const onSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) {
      setSurnameData({ error: 'Поле обязательно к заполнению!', valid: false, value: e.target.value });
      return;
    }
    setSurnameData({ error: '', valid: true, value: e.target.value });
  };
  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneRegExp = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
    if (!phoneRegExp.test(e.target.value)) {
      setPhoneData({ error: 'Телефон имеет неверный формат', valid: false, value: e.target.value });
      return;
    }
    setPhoneData({ error: '', valid: true, value: e.target.value });
  };
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
  const onPasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== passwordData.value) {
      setPasswordConfirmationData({ error: 'Пароли не совпадают', valid: false, value: e.target.value });
      return;
    }
    setPasswordConfirmationData({ error: '', valid: true, value: e.target.value });
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

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_API_URL!.concat('auth/registration'), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameData.value,
        surname: surnameData.value,
        phone: phoneData.value,
        email: emailData.value,
        password: passwordData.value,
      }),
    }).then((res) => {
      return res.json();
    }).then(data => setRegistrationResult(data));
  };


  useEffect(() => {
    const dataToCheck = [nameData, surnameData, phoneData, emailData, passwordData, passwordConfirmationData];
    if (dataToCheck.every((d) => d.valid)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    return () => { };
  }, [nameData, surnameData, phoneData, emailData, passwordData, passwordConfirmationData]);

  return (
    <div className="w-96 flex flex-col items-center">
      <FormInput
        error={nameData.error}
        id="nameInput"
        name="Имя"
        onChange={onNameChange}
        placeholder="Иван"
        type="text"
        value={nameData.value}
      />
      <FormInput
        error={surnameData.error}
        id="surnameInput"
        name="Фамилия"
        onChange={onSurnameChange}
        placeholder="Нечаев"
        type="text"
        value={surnameData.value}
      />
      <FormInput
        error={emailData.error}
        id="emailInput"
        name="Email"
        onChange={onEmailChange}
        placeholder="example@mail.me"
        type="email"
        value={emailData.value}
      />
      <FormInput
        error={phoneData.error}
        id="phoneInput"
        name="Телефон"
        onChange={onPhoneChange}
        placeholder="+79993331122"
        type="tel"
        value={phoneData.value}
      />
      <FormInput
        error={passwordData.error}
        id="passwordInput"
        name="Пароль"
        onChange={onPasswordChange}
        placeholder="СлОжНыЙ_ПаРоЛь№228"
        type={passFieldType}
        value={passwordData.value}
      />
      <FormInput
        error={passwordConfirmationData.error}
        id="passwordConfirmationInput"
        name="Повторите пароль"
        onChange={onPasswordConfirmationChange}
        placeholder="СлОжНыЙ_ПаРоЛь№228"
        type={passFieldType}
        value={passwordConfirmationData.value}
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
        disabled={disabled}
      >
        Зарегистрироваться
      </button>
      {typeof registrationResult === 'boolean' &&
        <div>Успешная регистрация, письмо для активации аккаунта уже выслано</div>
      }
      {(Array.isArray(registrationResult) && registrationResult.length !== 0) &&
        registrationResult.map((r) => {
          const [where, reason] = r.split('-');
          return (
            <div key={where}>{where} -- {reason}</div>
          );
        })
      }
    </div>
  );
};