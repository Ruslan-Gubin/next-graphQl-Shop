import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { HeaderStoreNavbar } from "../../../../entities/HeaderStoreNavbar";
import { BurgerButton } from "../../../../shared";
import { layoutShopAction } from "../../lib/store";
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";
import { ShopHeaderLogo } from "../ShopHeaderLogo";
import { useMatchMedia } from "../../../../features/CatalogPage/libs/hooks/use-match-media";

import styles from "./ShopLayoutHeader.module.scss";


const ShopLayoutHeaderF = () => {
  const { isMobile } = useMatchMedia();
  const dispatch = useDispatch();

  const handleBurgerClick = useCallback(() => {
    dispatch(layoutShopAction.asideLayoutToggle());
  }, [dispatch]);

  if (isMobile) {
    return <></>;
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerMenu}>
        <div className={styles.headerBurger}>
          <BurgerButton onClick={handleBurgerClick} />
        </div>
        <ShopHeaderLogo />
      </div>
      <LayoutHeaderSearch />
      <HeaderStoreNavbar />
    </header>
  );
};

const ShopLayoutHeader = memo(ShopLayoutHeaderF);

export { ShopLayoutHeader };
