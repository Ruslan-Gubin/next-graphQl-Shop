import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { HeaderStoreNavbar } from "@/entities/HeaderStoreNavbar";
import {  selectBasket } from "@/features";
import { BurgerButton } from "@/shared";
import { layoutShopAction } from "../../lib/store";

import styles from './ShopLayoutHeader.module.scss';
import { LayoutHeaderSearch } from "../LayoutHeaderSearch";
import { ShopHeaderLogo } from "../ShopHeaderLogo";

const ShopLayoutHeader = () => {
  const {basket} = useSelector(selectBasket)
  const dispatch = useDispatch()

  const handleBurgerClick = () => {
    dispatch(layoutShopAction.asideLayoutToggle())
  }

  return (
        <header className={styles.header}>
            <div className={styles.headerMenu}>
              <div className={styles.headerBurger}>
              <BurgerButton onClick={handleBurgerClick}/>
              </div>
              <div className={styles.headerLogo}>
                <nav>
                  <Link href={"/"}>
                    <ShopHeaderLogo />
                  </Link>
                </nav>
              </div>
            </div>
              <LayoutHeaderSearch />
            <nav className={styles.headerNavbar}> 
              <HeaderStoreNavbar shopingCount={basket.length} />
            </nav>
          </header>
  );
};

export { ShopLayoutHeader };