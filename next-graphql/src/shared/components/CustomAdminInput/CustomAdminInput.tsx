import { FC } from 'react';

import styles from './CustomAdminInput.module.scss';

interface ICustomAdminInput {
  value: string | number;
  setValue: (value: string | number) => void
  label: string
  type?: 'number' | 'string'
}

const CustomAdminInput: FC<ICustomAdminInput> = ({ value, setValue, label,type='string'}) => {
 
  return (
    <div 
    className={styles.root}>
      <label className={styles.label} htmlFor="customInput">{label}</label>
      <input
      autoComplete="off"
      type={type}
        id="customInput"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export {CustomAdminInput};