import { memo } from "react";
import Link from "next/link";

import styles from "./ShopHeaderLogo.module.scss";


const ShopHeaderLogoF = () => {
  return (
     <Link href={"/"}>
      <div className={styles.root} data-testid='logo-testid'>
    <div className={styles.container}>
      <span className={styles.nameLogo}>onlineshop</span>
      
    </div>
      </div>
      </Link>
  );
};

const ShopHeaderLogo = memo(ShopHeaderLogoF)

export { ShopHeaderLogo };
