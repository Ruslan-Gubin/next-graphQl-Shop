import { FC, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";


import * as features from "../../../../features";

import { ShopLayoutAside } from "../ShopLayoutAside";
import { ShopLayoutHeader } from "../ShopLayoutHeader";
import { selectLayoutShop } from "../../lib/store";
import { useMatchMedia } from "../../../../features/CatalogPage/libs/hooks/use-match-media";
import { ShopLayoutHeaderMobile } from "../ShopLayoutHeaderMobile";
import { LayoutSearchMobile } from "../LayoutSearchMobile";

// import { FooterShop } from "../../../FooterShop/components/FooterShop/FooterShop";
import styles from "./ShopLayout.module.scss";
import { FooterNavigation } from "../../../FooterShop/components/FooterNavigation";
import { FooterCopyrights } from "../../../FooterShop/components/FooterCopyrights";

interface IShopLayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
}

const ShopLayout: FC<IShopLayout> = ({ children, title, keywords }) => {
  const { asideLayoutStatus } = useSelector(selectLayoutShop);
  const [searchMobileModal, setSearchMobileModal] = useState<boolean>(false)
  const { isDesktop } = useMatchMedia()

 
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

         {searchMobileModal && !isDesktop &&
         <LayoutSearchMobile 
         setSearchMobileModal={setSearchMobileModal}
         />
         }

        <button className={styles.adminLink}>
          <nav>
            <Link href={"/admin"}>
              <span className={styles.text}>Admin</span>
            </Link>
          </nav>
        </button>

            <ShopLayoutHeader />
            <ShopLayoutHeaderMobile
            setSearchMobileModal={setSearchMobileModal}
            />
      

    <ShopLayoutAside />

        <main>
          <div className={styles.main__container}>
            {children}
          </div>
        </main>

        <footer className={styles.footer__wrapper}>
      <section className={styles.footer__container}>
      <FooterNavigation />
      <FooterCopyrights />
      </section>
    </footer>

         {/* <FooterShop /> */}
        <features.FooterButtonHelpers />
      </section>
       
        
    </>
  );
};

export { ShopLayout };
