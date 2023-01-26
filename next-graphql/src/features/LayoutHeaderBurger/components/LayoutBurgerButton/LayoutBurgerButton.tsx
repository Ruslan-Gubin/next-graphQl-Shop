import React, { FC } from "react";

import styles from "./LayoutBurgerButton.module.scss";

interface ILayoutBurgerButton {
  onClick: () => void;
}

const LayoutBurgerButton: FC<ILayoutBurgerButton> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.root}>
      <div className={styles.container}>
      <div className={styles.centerLine}></div>
      </div>
    </button>
  );
};

export { LayoutBurgerButton };
