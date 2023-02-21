import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LoginPageContext } from "../../libs/context/LoginPageContext";
import { dropOptions } from "../../libs/data/dropOptions";
import { validFormInput } from "../../libs/helpers/validFormInput";
import { LoginPageInput } from "../LoginPageInput";
import { LoginPageInputPhone } from "../LoginPageInputPhone";
import { CREATE_USER } from "../../module/authLoginRequest";


import styles from './LoginPage.module.scss';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userAction } from "../../store";


const LoginPage = () => {
  const [createdUser] = useMutation(CREATE_USER)
  const [dropValue, setDropValue] = useState(dropOptions[0])
  const [userValue, setUserValue] = useState({
    name: 'Ruslan',
    phone: '9494197155',
    email: 'gubin_ruslan@rambler.ru',
    password: '1234qwer',
  })
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    password: false, 
  })
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    validFormInput(userValue, setErrors)
  },[userValue])


  const myPhone = '79494197155'
  const now = Date.now()

  const queickLoginInput = {
    name: 'Guest',
    phone: now,
    email: '',
    password: `guest${now}`
  }

  const handlerFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

   let errorValue = false;
    
    Object.values(errors).forEach(item => {
      if (item) {
        errorValue = true
      } 
    })

    if (errorValue) {
      return   
    } else {
      try {
        await  createdUser({
              variables: {
              name: userValue.name,
              phone: `${dropValue.label}${userValue.phone}`,
              email: userValue.email,
              password: userValue.password,
              }
            }).then(async (data)  => {
              dispatch(userAction.createdUser({user: {...data.data.createdUser, image: {url:'',public_id: ''}}}))
              await router.push('/lk/details')
              setUserValue(() => ({name: '', email: '', password: '', phone: ''}))
              
              console.log(data.data.createdUser)
            })
            .catch(error => console.error(error))
        
      } catch (error) {
        console.error(error)
      }
    }
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
        errorText="От 5 до 15 символов и цифр"
        label="Пароль" />

        <LoginPageInputPhone 
        required={true}
        errorText="Неверное количество цифр"
        value={userValue.phone}
        erroState={errors.phone}
        setValue={(value) => setUserValue(prev => ({...prev, phone: value}))}
        label="Контактный телефон"
        />

        <button className={styles.submit__btn} type='submit'>Подтвердить</button>

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