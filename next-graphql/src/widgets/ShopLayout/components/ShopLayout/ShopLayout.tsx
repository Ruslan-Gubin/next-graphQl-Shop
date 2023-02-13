import { FC } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { FooterShop } from "@/widgets/FooterShop";
import * as features from "@/features";
import { HeaderStoreNavbar } from "@/entities/HeaderStoreNavbar";
import { ShopHeaderLogo } from "../ShopHeaderLogo";
import { ShopLayoutAside } from "../ShopLayoutAside";

import styles from "./ShopLayout.module.scss";

interface IShopLayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
}

const ShopLayout: FC<IShopLayout> = ({ children, title, keywords }) => {
  const { asideLayoutStatus } = useSelector(features.selectLayoutBurger);

  return (
    <>
      <Head>
        <title>{title ? title : "Home page"}</title>
        <meta name="description" content="It is first project next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          charSet="utf-8"
        />
        <meta name="keywords" content={keywords} />
      </Head>
      <div
        style={asideLayoutStatus ? { height: "100vh" } : { height: "100%" }}
        className={styles.root}
      >
        <div className={styles.adminLink}>
          <nav>
            <Link href={"/admin"}>
              <span className={styles.text}>Admin</span>
            </Link>
          </nav>
        </div>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.headerMenu}>
              <div className={styles.headerBurger}>
                <features.LayoutHeaderBurger />
              </div>
              <div className={styles.headerLogo}>
                <nav>
                  <Link href={"/"}>
                    <ShopHeaderLogo />
                  </Link>
                </nav>
              </div>
            </div>
            <div className={styles.search}>
              <features.LayoutHeaderSearch />
            </div>
            <nav className={styles.headerNavbar}> 
              <HeaderStoreNavbar shopingCount={0} />
            </nav>
          </header>
        </div>
        <ShopLayoutAside />
        <main>
          <div className={styles.main__container}>
            {children}
          </div>
        </main>
        <footer>
          <div className={styles.container}>
            <FooterShop />
          </div>
        </footer>
        <features.FooterButtonHelpers />
      </div>
    </>
  );
};

export { ShopLayout };
