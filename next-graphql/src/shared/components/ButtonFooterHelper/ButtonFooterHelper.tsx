import { FC } from "react";

import styles from "./ButtonFooterHelper.module.scss";

interface IButtonFooterHelper {
  icon: string;
  onClick: () => void;
  active?: boolean;
}

const ButtonFooterHelper: FC<IButtonFooterHelper> = ({
  icon,
  onClick,
  active = true,
}) => {
  return (
    <div  onClick={onClick}  className={active ? styles.active : styles.disabled}>
      <img src={icon} alt="icon helpers" />
    </div>
  );
};

export { ButtonFooterHelper };
