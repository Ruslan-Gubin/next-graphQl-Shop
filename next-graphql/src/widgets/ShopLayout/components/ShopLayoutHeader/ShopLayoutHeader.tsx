import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderStoreNavbar } from "../../../../entities/HeaderStoreNavbar";
import {  selectBasket, selectUser } from "../../../../features";
import { BurgerButton } from "../../../../shared";
import { layoutShopAction } from "../../lib/store";
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";
import { ShopHeaderLogo } from "../ShopHeaderLogo";

import styles from './ShopLayoutHeader.module.scss';
import { useMatchMedia } from "../../../../features/CatalogPage/libs/hooks/use-match-media";

const ShopLayoutHeaderF = () => {
  const { user } = useSelector(selectUser);
  const {isMobile} = useMatchMedia()
  const dispatch = useDispatch()

  const handleBurgerClick = useCallback(() => {
    dispatch(layoutShopAction.asideLayoutToggle())
  }, [dispatch])


  const checkUserName = useMemo(() => user.name ? true : false, [user])

  if (isMobile) {
    return <></>
  }

  return (
        <header className={styles.header}>
            <div className={styles.headerMenu}>
              <div className={styles.headerBurger}>
              <BurgerButton onClick={handleBurgerClick}/>
              </div>
                    <ShopHeaderLogo />
            </div>
              <LayoutHeaderSearch />
              <HeaderStoreNavbar  checkUserName={checkUserName} />
          </header>
  );
};

const  ShopLayoutHeader = memo(ShopLayoutHeaderF)

export { ShopLayoutHeader };