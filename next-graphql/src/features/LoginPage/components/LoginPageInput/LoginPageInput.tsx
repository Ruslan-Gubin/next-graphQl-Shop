import styles from './LoginPageInput.module.scss';

interface ILoginPageInput {
value: string
setValue: (e:string) => void
errorText: string
label: string
required: boolean
type?: string
erroState: boolean
}

const LoginPageInput = ({erroState ,setValue, value, errorText, label, required, type='string'}: ILoginPageInput) => {

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
        <input autoComplete="off" className={styles.input} type={type} value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
  );
};

export { LoginPageInput };