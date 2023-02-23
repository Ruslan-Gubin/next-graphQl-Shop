import { Dispatch, FormEvent, SetStateAction } from "react";

interface IUserValue {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface ILoginPageContext {
  userValue: IUserValue;
  setUserValue: Dispatch<SetStateAction<IUserValue>>
  dropValue: {value: string, label: string}
  setDropValue: Dispatch<SetStateAction<{ value: string; label: string;}>>
  errors: {name: boolean,phone: boolean,email: boolean,password: boolean,}
  setLogin: Dispatch<SetStateAction<boolean>>
  handlerFormSubmit: (e: FormEvent<HTMLFormElement>) => void
  errorsActive: boolean
}

export type { ILoginPageContext, IUserValue };
