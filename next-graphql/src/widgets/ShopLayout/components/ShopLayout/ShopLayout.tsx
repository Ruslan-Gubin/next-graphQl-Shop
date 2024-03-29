import { FC, memo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import * as features from "../../../../features";
import { ShopLayoutAside } from "../ShopLayoutAside";
import { ShopLayoutHeader } from "../ShopLayoutHeader";
import { selectLayoutShop } from "../../lib/store";
import { useMatchMedia } from "../../../../features/CatalogPage/libs/hooks/use-match-media";
import { ShopLayoutHeaderMobile } from "../ShopLayoutHeaderMobile";
import { LayoutSearchMobile } from "../LayoutSearchMobile";
import { FooterNavigation } from "../FooterNavigation";
import { FooterCopyrights } from "../FooterCopyrights";

import styles from "./ShopLayout.module.scss";


interface IShopLayout {
  children: React.ReactNode;
  title: string;
  keywords: string;
}

const ShopLayoutF: FC<IShopLayout> = ({ children, title, keywords }) => {
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

{!asideLayoutStatus && 

        <section className={styles.footer__wrapper}>
      <div className={styles.footer__container}>
      <FooterNavigation />
      <FooterCopyrights />
      </div>
    </section>
}
        <features.FooterButtonHelpers />
      </section>
       
        
    </>
  );
};

const ShopLayout = memo(ShopLayoutF)

export { ShopLayout };
