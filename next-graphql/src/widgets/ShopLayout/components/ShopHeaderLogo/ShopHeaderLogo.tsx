import { memo } from "react";
import { useRouter } from "next/dist/client/router";

import styles from "./ShopHeaderLogo.module.scss";


const ShopHeaderLogoF = () => {
  const router = useRouter()

  return (
      <div onClick={() => router.push('/')} className={styles.root} data-testid='logo-testid'>
    <div className={styles.container}>
      <span className={styles.nameLogo}>onlineshop</span>
    </div>
      </div>
  );
};

const ShopHeaderLogo = memo(ShopHeaderLogoF)

export { ShopHeaderLogo };
