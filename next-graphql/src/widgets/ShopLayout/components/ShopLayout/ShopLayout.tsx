import React from "react";
import { HeaderStoreNavbar } from "@/entities/HeaderStoreNavbar";
import { LayoutHeaderBurger } from "@/features/LayoutHeaderBurger";
import { LayoutHeaderSearch } from "@/features/LayoutHeaderSearch";
import Head from "next/head";
import Link from "next/link";
import { ShopHeaderLogo } from "../ShopHeaderLogo";
import styles from "./ShopLayout.module.scss";
import { FooterShop } from "@/widgets/FooterShop";
import { FooterButtonHelpers } from "@/features/FooterButtonHelpers";

interface IShopLayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
}

const ShopLayout: React.FC<IShopLayout> = ({ children, title, keywords }) => {
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
      <div className={styles.root}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.headerMenu}>
              <div className={styles.headerBurger}>
                <LayoutHeaderBurger />
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
              <LayoutHeaderSearch />
            </div>
            <nav className={styles.headerNavbar}>
              <HeaderStoreNavbar shopingCount={0} />
            </nav>
          </header>
        </div>
        <main>
          <div className={styles.container}>{children}</div>
        </main>
        <footer>
          <div className={styles.container}>
         <FooterShop />
          </div>
        </footer>
          <FooterButtonHelpers />
      </div>
    </>
  );
};

export { ShopLayout };
