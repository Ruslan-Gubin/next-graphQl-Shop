import { memo } from "react";
import Link from "next/link";
import Image from 'next/image';


// const addressIcon =
//   "https://res.cloudinary.com/ds289tkqj/image/upload/v1674831921/Hits/addressIcon_jgsuc2.png";
const loginIcon =
  "https://res.cloudinary.com/ds289tkqj/image/upload/v1674832099/Hits/user-60_lfvy7k.png";


import styles from "./HeaderStoreNavbar.module.scss";
import { HeaderStoreNavbarBasket } from "./HeaderStoreNavbarBasket";

interface IHeaderStoreNavbar {

   checkUserName: boolean
}

const HeaderStoreNavbarF = ({  checkUserName  }: IHeaderStoreNavbar) => {
 

  return (
    <ul className={styles.root}>
      <li>
      <Link className={styles.linkItem} href={checkUserName ? '/lk/details' : "/security/login"}>
        <Image width={27} height={27} src={loginIcon} alt="address icon" />
        {checkUserName ? <span> Профиль </span> : <span> Войти </span>}
      </Link>
      </li>
      <HeaderStoreNavbarBasket  />
    </ul>
  );
};

const HeaderStoreNavbar = memo(HeaderStoreNavbarF)

export { HeaderStoreNavbar };
