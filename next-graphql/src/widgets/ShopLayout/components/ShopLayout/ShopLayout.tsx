import { LayoutHeaderBurger } from "@/features/LayoutHeaderBurger";
import {  CustomLink } from "@/shared/components";
import Head from "next/head";
import Link from "next/link";
import React, { FC } from "react";
import { ShopHeaderLogo } from "../ShopHeaderLogo";
import styles from './ShopLayout.module.scss';

interface IShopLayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
}

const ShopLayout: FC<IShopLayout> = ({ children, title, keywords }) => {

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
      <header>
        <nav data-testid="mainLayout-test-nav">
        <CustomLink href="/" name="Home" />
          <CustomLink href="/catalog/elektronika" name="Electronika" />
          <CustomLink href="/catalog/elektronika/igrovye-konsoli" name="Igrovy Konsoli" />
          <CustomLink href="/catalog/elektronika/aksessuary-dlya-smartfonov" name="aksessuary" />
          <CustomLink href="/hits" name="Hits" />
        </nav>
      <div className={styles.logoBlock}>
       <LayoutHeaderBurger />
       <nav>
       <Link href={'/'}><ShopHeaderLogo /></Link>
       </nav>
      </div>

      <div className={styles.search}>

      </div>

      <div className={styles.navLink}>
      <CustomLink href="/services/dostavka" name="Адреса" />
      <CustomLink href="/security/login" name="Войти" />
      <CustomLink href="/basket" name="Корзина" />
      </div>


      </header>
    <div className={styles.root}>
    <main>{children}</main>
    </div>
    <footer>Footer</footer>
    </>
  )
};

export { ShopLayout };
