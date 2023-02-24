import { FC } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { FooterShop } from "@/widgets/FooterShop";
import * as features from "@/features";
import { ShopLayoutAside } from "../ShopLayoutAside";
import { ShopLayoutHeader } from "../ShopLayoutHeader";

import styles from "./ShopLayout.module.scss";
import { selectLayoutShop } from "../../lib/store";
import { useMatchMedia } from "@/features/CatalogPage/libs/hooks/use-match-media";
import { ShopLayoutHeaderMobile } from "../ShopLayoutHeaderMobile";

interface IShopLayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
}

const ShopLayout: FC<IShopLayout> = ({ children, title, keywords }) => {
  const { asideLayoutStatus } = useSelector(selectLayoutShop);
  const {isMobile, isDesktop,isTablet} = useMatchMedia()
 

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
      <section
        style={asideLayoutStatus ? { height: "100vh" } : { height: "100%" }}
        className={styles.root}
      >
        <button className={styles.adminLink}>
          <nav>
            <Link href={"/admin"}>
              <span className={styles.text}>Admin</span>
            </Link>
          </nav>
        </button>

           {isDesktop ?
        <ShopLayoutHeader />
        : 
        <ShopLayoutHeaderMobile />
           }
   
        <ShopLayoutAside />

        <main>
          <div className={styles.main__container}>
            {children}
          </div>
        </main>
         <FooterShop />
        <features.FooterButtonHelpers />
      </section>
    </>
  );
};

export { ShopLayout };
