import React, { FC } from "react";

import styles from "./AdminModal.module.scss";

interface IAdminModal {
  title: string;
  isShow: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  referens: any;
}

const AdminModal: FC<IAdminModal> = ({
  title,
  handleCancel,
  handleOk,
  isShow,
  referens,
}) => {
  return (
    <div
    style={{ opacity: isShow ? 1 : 0 }}
    className={styles.root}
    >
      <div 
      ref={referens}
      className={styles.container}>
      <header>
        <h2 className={styles.title}>{title}</h2>
      </header>

      <footer className={styles.footer}>
        <button onClick={handleOk} className={styles.btn__ok}>
          OK
        </button>
        <button onClick={handleCancel} className={styles.btn__cancel}>
          Cancel
        </button>
      </footer>
      </div>
    </div>
  );
};

export { AdminModal };
