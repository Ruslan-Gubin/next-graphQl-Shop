import { FC, memo } from "react";

import styles from "./BurgerButton.module.scss";

interface IBurgerButton {
  onClick: () => void;
}

const BurgerButtonF: FC<IBurgerButton> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.root}>
      <div className={styles.container}>
      <div className={styles.centerLine}></div>
      </div>
    </button>
  );
};

const BurgerButton = memo(BurgerButtonF)

export { BurgerButton };
