import { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LoginPageContext } from "../../libs/context/LoginPageContext";
import { dropOptions } from "../../libs/data/dropOptions";
import { validFormInput } from "../../libs/helpers/validFormInput";
import { CREATE_USER, LOGIN_USER } from "../../module/authLoginRequest";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userAction } from "../../store";
import { RegistationForm } from "../RegistationForm";

import styles from './LoginPage.module.scss';
import { LoginForm } from "../LoginForm";
import { QueckMessage } from "../../../../shared";


const LoginPage = () => {
  const {user} = useSelector(selectUser)
  const [createdUser] = useMutation(CREATE_USER)
  const [loginUser] = useMutation(LOGIN_USER)
  const [login, setLogin] = useState(false)
  const [dropValue, setDropValue] = useState(dropOptions[0])
  const [errorsActive, setErrorsActive] = useState(false)
  const [userValue, setUserValue] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    password: false, 
  })
  const [fastMessageError, setFastMessageError] = useState({state: false, message: ''})
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    validFormInput(userValue, setErrors)
  },[userValue])

  useLayoutEffect(() => {
   if (user.name) {
    router.push('/lk/details')
   }
  },[router, user.name])


  

  const handlerFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorsActive(true)

   let errorValue = false;
    
    Object.values(errors).forEach(item => {
      if (item) {
        errorValue = true
      } 
    })

    if (errorValue) {
      return   
    } else {
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
            })
            .catch(error => {
            setFastMessageError(() => ({message: error.message, state: true}))
            setTimeout(() => {
            setFastMessageError(() => ({message: '', state: false}))
            }, 3000)
            })
        
    }
  }

  const handleLoginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorsActive(true)
    if (errors.phone || errors.password) {
      return
    }

    loginUser({
      variables: {
        phone: `${dropValue.label}${userValue.phone}`,
        password: userValue.password,
      }
    }).then(async (data) => {
      dispatch(userAction.createdUser({user: data.data.loginUser}))
      await router.push('/lk/details')
      setUserValue(() => ({name: '', email: '', password: '', phone: ''}))
    })
    .catch(error => {
      setFastMessageError(() => ({message: error.message, state: true}))
      setTimeout(() => {
        setFastMessageError(() => ({message: '', state: false}))
      }, 3000)
    });
    
  }


  return (
    <div>
      
        <LoginPageContext.Provider 
        value={{
          errorsActive,
          handlerFormSubmit,
          errors,
          setLogin,
          userValue,
          setUserValue,
          dropValue,
          setDropValue
          }}>
   <section className={styles.root}>
    <form onSubmit={(e) => login ? handleLoginUser(e) : handlerFormSubmit(e)} action="" className={styles.form__container}>
  {login ?
  <LoginForm />
  :
  <RegistationForm />
  }

      </form>
    </section>
    <QueckMessage active={fastMessageError.state} message={fastMessageError.message}/>
      </LoginPageContext.Provider>

      </div>
  );
};

export { LoginPage };