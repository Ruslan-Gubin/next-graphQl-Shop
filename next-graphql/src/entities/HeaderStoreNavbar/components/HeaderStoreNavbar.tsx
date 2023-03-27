import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { HeaderStoreNavbarBasket } from "./HeaderStoreNavbarBasket";
import { selectUser } from "../../../features";
import { loginIcon } from "../lib/data/headerIcon";

import styles from "./HeaderStoreNavbar.module.scss";


const HeaderStoreNavbarF = ({handleRouter}: {handleRouter: (href: string) => void}) => {
  const { user } = useSelector(selectUser);

  const checkUserName = useMemo(() => user.name ? true : false, [user])
  const href = checkUserName ? '/lk/details' : "/security/login"

  return (
    <ul className={styles.root}>
      <li>
      <div onClick={() => handleRouter(href)} className={styles.linkItem} >
        <picture>
        <img width={27} height={27} src={loginIcon} alt="address icon" />
        </picture>
        {checkUserName ? <span> Профиль </span> : <span> Войти </span>}
      </div>
      </li>
      <HeaderStoreNavbarBasket handleRouter={handleRouter} />
    </ul>
  );
};

const HeaderStoreNavbar = memo(HeaderStoreNavbarF)

export { HeaderStoreNavbar };
