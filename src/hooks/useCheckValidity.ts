import { IValidateableTextInput } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useCheckValidity(...dataToCheck: IValidateableTextInput[]){
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    if (dataToCheck.every((d) => d.valid)) setIsValid(true);
    else setIsValid(false);
    return () => {};
  }, [dataToCheck]);
  return isValid;
}