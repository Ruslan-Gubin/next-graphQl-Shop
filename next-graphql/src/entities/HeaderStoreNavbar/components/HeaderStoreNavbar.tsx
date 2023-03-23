import { memo, useMemo } from "react";
import { useRouter } from "next/dist/client/router";
import Image from 'next/image';
import { useSelector } from "react-redux";

import { HeaderStoreNavbarBasket } from "./HeaderStoreNavbarBasket";
import { selectUser } from "../../../features";
import { loginIcon } from "../lib/data/headerIcon";

import styles from "./HeaderStoreNavbar.module.scss";


const HeaderStoreNavbarF = () => {
  const { user } = useSelector(selectUser);
  const router = useRouter()

  const checkUserName = useMemo(() => user.name ? true : false, [user])
  const href = checkUserName ? '/lk/details' : "/security/login"

  return (
    <ul className={styles.root}>
      <li>
      <div onClick={() => router.push(href)} className={styles.linkItem} >
        <Image width={27} height={27} src={loginIcon} alt="address icon" />
        {checkUserName ? <span> Профиль </span> : <span> Войти </span>}
      </div>
      </li>
      <HeaderStoreNavbarBasket  />
    </ul>
  );
};

const HeaderStoreNavbar = memo(HeaderStoreNavbarF)

export { HeaderStoreNavbar };
