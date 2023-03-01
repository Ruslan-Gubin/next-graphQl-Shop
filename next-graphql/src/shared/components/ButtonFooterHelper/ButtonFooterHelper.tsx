import { FC } from "react";
import Image from 'next/image';

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
      <Image width={30} height={30} src={icon} alt="icon helpers" />
      {/* <img src={icon} alt="icon helpers" /> */}
    </div>
  );
};

export { ButtonFooterHelper };
