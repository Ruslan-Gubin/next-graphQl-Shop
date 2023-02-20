import { FormEvent, useState } from "react";
import { LoginPageContext } from "../../libs/context/LoginPageContext";
import { dropOptions } from "../../libs/data/dropOptions";
import { validFormInput } from "../../libs/helpers/validFormInput";
import { LoginPageInput } from "../LoginPageInput";
import { LoginPageInputPhone } from "../LoginPageInputPhone";


import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [dropValue, setDropValue] = useState(dropOptions[0])
  const [userValue, setUserValue] = useState({
    name: '',
    phone: '',
    email: '',
    password: '', 
    image: '',
  })
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    password: false, 
    image: false,
  })

  

  const handlerFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validFormInput(userValue, setErrors)
  }

  

  const phonValueUpdate = (strTarget: string) => {
 const result: string [] = strTarget.split('').splice(1,strTarget.length)
    return result.join('')
  }

  return (
    <div>
      
        <LoginPageContext.Provider value={{userValue, setUserValue, dropValue, setDropValue}}>
    <section className={styles.root}>
      <form onSubmit={(e) => handlerFormSubmit(e)} action="" className={styles.form__container}>
        <h1 className={styles.form__title}>Войти или создать профиль</h1>

        <LoginPageInput 
        setValue={(value) => setUserValue(prev => ({...prev, name: value}))}
        value={userValue.name}
        required={true}
        erroState={errors.name}
        errorText="Введите имя от 3 до 15 символов"
        label="Имя" 
        />

        <LoginPageInput 
        setValue={(value) => setUserValue(prev => ({...prev, email: value}))}
        value={userValue.email}
        required={false}
        erroState={errors.email}
        errorText="Введите корректный E-Mail"
        label="E-Mail" />

        <LoginPageInput 
        setValue={(value) => setUserValue(prev => ({...prev, password: value}))}
        type="password"
        value={userValue.password}
        required={true}
        erroState={errors.password}
        errorText="От 5 до 15 символов или цифр"
        label="Пароль" />

        <LoginPageInputPhone 
        required={true}
        errorText="Неверное количество цифр"
        value={userValue.phone}
        erroState={errors.phone}
        setValue={(value) => setUserValue(prev => ({...prev, phone: value}))}
        label="Контактный телефон"
        />

        <button type='submit'>Push</button>

      <div className={styles.footer__container}>
        <div className={styles.footer__bird}></div>
        <p className={styles.footer__text}><span>Согласен с условиями</span> Правил пользования торговой площадкой и правилами возврата</p>
      </div>

      </form>
      </section>
      </LoginPageContext.Provider>
      </div>
  );
};

export { LoginPage };