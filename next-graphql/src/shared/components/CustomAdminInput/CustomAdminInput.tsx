import { FC } from 'react';

import styles from './CustomAdminInput.module.scss';

interface ICustomAdminInput {
  value: string | number;
  setValue?: (value: string | number) => void
  label: string
  type?: 'number' | 'string'
  name?: string
}

const CustomAdminInput: FC<ICustomAdminInput> = ({name, value, setValue, label,type='string'}) => {
 
  return (
    <div 
    className={styles.root}>
      <label className={styles.label} htmlFor="customInput">{label}</label>
      <input
      name={name}
      autoComplete="off"
      type={type}
        id="customInput"
        className={styles.input}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
      />
    </div>
  );
};

export {CustomAdminInput};