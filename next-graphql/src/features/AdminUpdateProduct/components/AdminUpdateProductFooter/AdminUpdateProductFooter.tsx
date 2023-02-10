

import { FC } from 'react';
import styles from './AdminUpdateProductFooter.module.scss';

interface IAdminUpdateProductFooter {
  handleUpdate: () => void
  btnActive: boolean
}

const AdminUpdateProductFooter:FC<IAdminUpdateProductFooter> = ({handleUpdate, btnActive}) => {

  return (
    <footer className={styles.root}>
      <button
      disabled={!btnActive}
      className={btnActive ? styles.btn__update_active : styles.btn__update}
      onClick={() => handleUpdate()}
      >
        <div className={styles.btn__update_content}>Update</div>
      </button>
    </footer>
  );
};

export { AdminUpdateProductFooter };