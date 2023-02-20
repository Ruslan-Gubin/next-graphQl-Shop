import { Dispatch, SetStateAction } from "react";

interface IuserValue {
  name: string;
  phone: string;
  email: string;
  password: string;
  image: string;
}

type ISetErrors = Dispatch<
  SetStateAction<{
    name: boolean;
    phone: boolean;
    email: boolean;
    password: boolean;
    image: boolean;
  }>
>;

const validFormInput = (userValue: IuserValue, setErrors: ISetErrors) => {
  if (userValue.name.length < 3 || userValue.name.length > 15) {
    setErrors((prev) => ({ ...prev, name: true }));
  } else {
    setErrors((prev) => ({ ...prev, name: false }));
  }

  if (
    !userValue.password.match(
      /^(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
    )
  ) {
    setErrors((prev) => ({ ...prev, password: true }));
  } else {
    setErrors((prev) => ({ ...prev, password: false }));
  }

  if (
    !userValue.phone.match(
      /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
    )
  ) {
    setErrors((prev) => ({ ...prev, phone: true }));
  } else {
    setErrors((prev) => ({ ...prev, phone: false }));
  }

  if (
    userValue.email.length &&
    !userValue.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i)
  ) {
    setErrors((prev) => ({ ...prev, email: true }));
  } else {
    setErrors((prev) => ({ ...prev, email: false }));
  }
};

export { validFormInput };
