import { memo } from "react";


import styles from "./ShopHeaderLogo.module.scss";


const ShopHeaderLogoF = ({handleClickHome}: {handleClickHome: (href: string) => void}) => {

  return (
      <div onClick={() => handleClickHome('/')} className={styles.root} data-testid='logo-testid'>
    <div className={styles.container}>
      <span className={styles.nameLogo}>onlineshop</span>
    </div>
      </div>
  );
};

export const ShopHeaderLogo = memo(ShopHeaderLogoF)
