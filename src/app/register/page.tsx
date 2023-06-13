'use client';
import FormInput from "@/components/UI/FormInput";
import { ChangeEvent, useState } from "react";

interface IRegisterDataItem {
  error: string;
  valid: boolean;
  value: string;
};

export default function RegistrationPage(){
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

  const [passFieldType, setPassFieldType] = useState<'text'| 'password'>('password');
  const [passVisibilityText, setPassVisibilityText] = useState<string>('Показать пароль');

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) {
      setNameData({...nameData, error: 'Поле обязательно к заполнению!', value: e.target.value});
      return;
    }
    setNameData({error: '', valid: true ,value: e.target.value});
  };
  const onSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) {
      setSurnameData({...surnameData, error: 'Поле обязательно к заполнению!', value: e.target.value});
      return;
    }
    setSurnameData({error: '', valid: true, value: e.target.value});
  };
  const onPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneRegExp = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
    if (!phoneRegExp.test(e.target.value)) {
      setPhoneData({...phoneData, error: 'Телефон имеет неверный формат', value: e.target.value});
      return;
    }
    setPhoneData({error: '', valid: true, value: e.target.value});
  };
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailRegExp = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    if (!emailRegExp.test(e.target.value)) {
      setEmailData({...phoneData, error: 'Email имеет неверный формат', value: e.target.value});
      return;
    }
    setEmailData({error: '', valid: true, value: e.target.value});
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordRegExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!passwordRegExp.test(e.target.value)) {
      setPasswordData({...passwordData, error: 'Пароль должен содержать больше 8 символов, включая буквы, цифры и спецсимволы', value: e.target.value});
      return;
    }
    setPasswordData({error: '', valid: true, value: e.target.value});
  };
  const onPasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== passwordData.value) {
      setPasswordConfirmationData({...passwordConfirmationData, error: 'Пароли не совпадают', value: e.target.value});
      return;
    }
    setPasswordConfirmationData({error: '', valid: true, value: e.target.value});
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (passFieldType === 'password'){
      setPassFieldType('text');
      setPassVisibilityText('Скрыть пароль');
    }
    else {
      setPassFieldType('password');
      setPassVisibilityText('Показать пароль');
    }
  };

  return (
    <div className="border-2 border-green-400 w-96 flex flex-col items-center">
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
      <button onClick={togglePasswordVisibility}>{passVisibilityText}</button>
    </div>
  );
}