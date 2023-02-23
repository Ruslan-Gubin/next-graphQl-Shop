import { FC } from 'react';

import styles from './UserDetailsButtons.module.scss';

interface IUserDetailsButtons {
  handleCancel: () => void
  handleActive: () => void
}

const UserDetailsButtons: FC<IUserDetailsButtons> = ({handleCancel, handleActive}) => {
  return (
    <section className={styles.card__button}>
      <button className={styles.buttons__cancel} onClick={() => handleCancel()}>Отменить</button>
      <button className={styles.buttons__submit}  onClick={() => handleActive()}>Подтвердить</button> 
       </section>
  );
};

export { UserDetailsButtons };