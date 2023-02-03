import { FC } from "react";
import Head from "next/head";
import { AdminLayoutHeader } from "../AdminLayoutHeader";

import styles from "./AdminLayout.module.scss";
import { AdminLayoutAside } from "../AdminLayoutAside";

interface IShopLayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
}

const AdminLayout: FC<IShopLayout> = ({ children, title, keywords }) => {
 
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
      <div  className={styles.root}>
        <AdminLayoutAside />
        <div  className={styles.content}>
          <AdminLayoutHeader />
          <main >{children}</main>
        </div>
      </div>
    </>
  );
};

export { AdminLayout };
