import { FC, memo } from "react";

import styles from "./AdminOptionButton.module.scss";

interface IAdminOptionButton {
  text: string;
  onClick: () => void;
}

const AdminOptionButtonF: FC<IAdminOptionButton> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.root}>
      <div className={styles.container}>
        <span>{text}</span>
      </div>
    </button>
  );
};

export const AdminOptionButton = memo(AdminOptionButtonF);
