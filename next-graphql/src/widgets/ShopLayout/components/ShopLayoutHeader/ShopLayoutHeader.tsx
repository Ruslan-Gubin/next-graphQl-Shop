import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { HeaderStoreNavbar } from "../../../../entities/HeaderStoreNavbar";
import { BurgerButton } from "../../../../shared";
import { layoutShopAction } from "../../lib/store";
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";
import { ShopHeaderLogo } from "../ShopHeaderLogo";
import { useMatchMedia } from "../../../../features/CatalogPage/libs/hooks/use-match-media";
import { useRouter } from "next/router";

import styles from "./ShopLayoutHeader.module.scss";


const ShopLayoutHeaderF = () => {
  const { isMobile } = useMatchMedia();
  const dispatch = useDispatch();
  const router = useRouter()

  const handleBurgerClick = useCallback(() => {
    dispatch(layoutShopAction.asideLayoutToggle());
  }, [dispatch]);

  const handleRouter = useCallback((href: string) => {
    if (href === '/' && router.pathname === '/') return;
    router.push(href)
  }, [router.pathname]);
  
  if (isMobile) {
    return <></>;
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerMenu}>
        <div className={styles.headerBurger}>
          <BurgerButton onClick={handleBurgerClick} />
        </div>
        <ShopHeaderLogo handleClickHome={handleRouter} />
      </div>
      <LayoutHeaderSearch handleRouter={handleRouter} />
      <HeaderStoreNavbar handleRouter={handleRouter} />
    </header>
  );
};

const ShopLayoutHeader = memo(ShopLayoutHeaderF);

export { ShopLayoutHeader };
