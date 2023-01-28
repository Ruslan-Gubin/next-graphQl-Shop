import styles from "./CustomClose.module.scss";

interface ICustomClose {
  onClick: () => void;
  active: boolean;
}

const CustomClose = ({ onClick, active }: ICustomClose) => {
  return (
    <div onClick={onClick} className={styles.root}>
      {active && <div className={styles.line}></div>}
    </div>
  );
};

export { CustomClose };
