import { Dispatch, SetStateAction } from "react";

interface IUserValue {
  name: string;
  phone: string;
  email: string;
  password: string;
  image: string;
}

interface ILoginPageContext {
  userValue: IUserValue;
  setUserValue: Dispatch<SetStateAction<IUserValue>>
  dropValue: {value: string, label: string}
  setDropValue: Dispatch<SetStateAction<{ value: string; label: string;}>>
}

export type { ILoginPageContext, IUserValue };
