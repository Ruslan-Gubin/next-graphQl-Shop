import { FC } from "react";

import styles from "./CreatedProductFooter.module.scss";

interface ICreatedProductFooter {
  active: boolean;
  onClick: () => void;
}

const CreatedProductFooter: FC<ICreatedProductFooter> = ({
  active,
  onClick,
}) => {
  return (
    <footer className={styles.root}>
      <button
        onClick={onClick}
        disabled={!active}
        className={active ? styles.active : styles.btn}
      >
        {active ? 'CREATED' : "IT WON'T WORK"}
      </button>
    </footer>
  );
};

export { CreatedProductFooter };
