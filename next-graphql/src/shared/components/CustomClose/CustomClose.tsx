import { memo } from "react";
import styles from "./CustomClose.module.scss";

interface ICustomClose {
  onClick: () => void;
  active: boolean;
}

const CustomCloseF = ({ onClick, active }: ICustomClose) => {
  return (
    <div onClick={onClick} className={styles.root}>
      {active && <div className={styles.line}></div>}
    </div>
  );
};

export const CustomClose = memo(CustomCloseF);
