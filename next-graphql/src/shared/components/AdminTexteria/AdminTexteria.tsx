import { FC } from 'react';

import styles from './AdminTexteria.module.scss';

interface IAdminTexteria {
  label: string
  width: number
  setValue: (value: string) => void
  value: string | number
}

const AdminTexteria: FC<IAdminTexteria> = ({label, width, value, setValue}) => {
  return (
    <div style={{width: width}} className={styles.root}>
       <label className={styles.label} htmlFor="texteria">{label}</label>
      <textarea 
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.textarea}  
      name="texteria"
      cols={30} 
      rows={10}
      ></textarea>
    </div>
  );
};

export {AdminTexteria};