import { useLoginPageContext } from "../../libs/context/LoginPageContext";
import { LoginPageInput } from "../LoginPageInput";
import { LoginPageInputPhone } from "../LoginPageInputPhone";

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const {setUserValue,userValue, errors ,setLogin, errorsActive} = useLoginPageContext()

  return (
    <>
    <h1 className={styles.form__title}>Введите телефон и пароль </h1>
    <h2 className={styles.form__sub_title}> или <span onClick={() => setLogin(false)}>создать профиль.</span></h2>
     
    <LoginPageInputPhone 
    required={true}
    errorText={errorsActive ? "Неверно" : ''} 
    value={userValue.phone}
    erroState={errors.phone}
    setValue={(value) => setUserValue(prev => ({...prev, phone: value}))}
    label="Контактный телефон"
    />

    <LoginPageInput
    setValue={(value) => setUserValue(prev => ({...prev, password: value}))}
    type="password"
    value={userValue.password}
    required={true}
    erroState={errors.password}
    errorText={errorsActive ? "От 5 до 15 символов и цифр" : ''}
    label="Пароль" />

    <button className={styles.submit__btn} type='submit'>Подтвердить</button>

  </>
  );
};

export { LoginForm };