import { FC } from "react";
import styles from "./ShopHeaderLogo.module.scss";

interface IShopHeaderLogo {

}

const ShopHeaderLogo: FC<IShopHeaderLogo> = () => {
  return (
    <div>
      <div className={styles.root} data-testid='logo-testid'>
    <div className={styles.container}>
      <span className={styles.nameLogo}>onlineshop</span>
      
    </div>
      </div>
    </div>
  );
};

export { ShopHeaderLogo };
