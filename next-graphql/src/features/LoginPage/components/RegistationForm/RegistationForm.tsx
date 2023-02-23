

import { useState } from 'react';
import { useLoginPageContext } from '../../libs/context/LoginPageContext';
import { IUserValue } from '../../libs/types/ILoginPageContext';
import { LoginPageInput } from '../LoginPageInput';
import { LoginPageInputPhone } from '../LoginPageInputPhone';
import styles from './RegistationForm.module.scss';

const RegistationForm = () => {
 const {setUserValue,userValue, errors ,setLogin, errorsActive} = useLoginPageContext()
 const [mockActive, setMockActive] = useState(false)

 const myPhone = '79494197155'
  const now = Date.now()

  const queickLoginInput:IUserValue = {
    name: 'New user',
    phone: String(now),
    email: 'gubin_ruslan@rambler.ru',
    password: `guest${now}`
  }
  const cancelMock:IUserValue = {
    name: '',
    phone: '',
    email: '',
    password: ''
  }
  const handleMockValue = () => {
    setMockActive(!mockActive)
    if (mockActive) {
      setUserValue(cancelMock)
    } else {
      setUserValue(queickLoginInput)
    }
  }

  return (
    <>
      <h1 className={styles.form__title}><span onClick={() => setLogin(true)}>Войти</span> или создать профиль <i onClick={() => handleMockValue()}>mock</i></h1>

      <LoginPageInput 
      setValue={(value) => setUserValue(prev => ({...prev, name: value}))}
      value={userValue.name}
      required={true}
      erroState={errors.name}
      errorText={errorsActive ? "Введите имя от 3 до 15 символов" : ''}
      label="Имя" 
      />

      <LoginPageInput 
      setValue={(value) => setUserValue(prev => ({...prev, email: value}))}
      value={userValue.email}
      required={false}
      erroState={errors.email}
      errorText={errorsActive ? "Введите корректный E-Mail": ''}
      label="E-Mail" />

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

    <div className={styles.footer__container}>
      <div className={styles.footer__bird}></div>
      <p className={styles.footer__text}><span>Согласен с условиями</span> Правил пользования торговой площадкой и правилами возврата</p>
    </div>
    </>
    );
  };
  
  export { RegistationForm };