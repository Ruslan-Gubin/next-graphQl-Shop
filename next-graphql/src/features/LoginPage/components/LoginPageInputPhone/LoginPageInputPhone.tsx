import { AccordionBird } from '@/shared';
import { useState } from 'react';
import { useLoginPageContext } from '../../libs/context/LoginPageContext';
import { dropOptions } from '../../libs/data/dropOptions';
import styles from './LoginPageInputPhone.module.scss';

interface ILoginPageInputPhone {
value: string
setValue: (e: string) => void
errorText: string
label: string
required: boolean
erroState: boolean
}


const LoginPageInputPhone = ({setValue, value, errorText, label, required, erroState}: ILoginPageInputPhone) => {
  const {dropValue, setDropValue} = useLoginPageContext()
  const [dropActive, setDropActive] = useState(false)


  const checkValidPhone = (str: string) => {
    setValue(str)
  }

  return (
    <label className={styles.input__container}>
        <div className={styles.input__text_hits}>
      <p className={styles.label__text}>{label} 
    {required && <span>*</span>}  
      </p>  
      {erroState && 
      <span className={styles.input__error}>{errorText}</span>
      }
        </div>
        <div className={styles.input__container}>
        <div onClick={() => setDropActive(!dropActive)} className={styles.drop__btn}>
          <p>{dropValue.value}</p>
          {dropActive && 
          <ul className={styles.drop__list}>
          {dropOptions.map(item => (
            <li key={item.label}
            onClick={() => setDropValue(() => ({value: item.value, label: item.label}))}
            className={dropValue.value === item.value ? `${styles.drop__item} ${styles.active}` : styles.drop__item}
            >{item.value}</li>
            ))}
          </ul>
          }
          <div className={styles.drop__bird}>
        <AccordionBird active={dropActive} handleActive={() => {}} />
          </div>
        </div>

        <input autoComplete="off"
         className={styles.input} type='number'
         value={value}
          onChange={(e) => checkValidPhone(e.target.value)} />
        </div>
      </label>
  );
};

export { LoginPageInputPhone };