import React, { type HTMLInputTypeAttribute, type ChangeEventHandler } from "react";

export interface IFormInputProps {
  error: string;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value: string;
}

export default function FormInput(props:IFormInputProps){
  return(
    <div className="flex flex-col mb-4 items-center w-96">
      <label 
        htmlFor={props.id}
        className="px-1 w-full"
      >
        {props.name}
      </label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required
        className="w-full border-2 focus:outline-none focus:border-violet-400 p-1 rounded-md placeholder:text-violet-400 caret-violet-400"
      />
      <label
        htmlFor="nameInput"
        className="px-1 text-sm text-red-500 h-fit"
      >
        {props.error}
      </label>
    </div>
  );
};
