import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUser } from "@/features";

const addressIcon =
  "https://res.cloudinary.com/ds289tkqj/image/upload/v1674831921/Hits/addressIcon_jgsuc2.png";
const loginIcon =
  "https://res.cloudinary.com/ds289tkqj/image/upload/v1674832099/Hits/user-60_lfvy7k.png";
const orderIcon =
  "https://res.cloudinary.com/ds289tkqj/image/upload/v1674832569/Hits/orderIcon-64_meh26h.png";

import styles from "./HeaderStoreNavbar.module.scss";

const HeaderStoreNavbar = ({ shopingCount = 0 }: { shopingCount: number }) => {
  const { user } = useSelector(selectUser);

  return (
    <div className={styles.root}>
      <Link className={styles.linkItem} href={"/services/dostavka"}>
        <img src={addressIcon} alt="address icon" />
        <span>Адреса</span>
      </Link>
      <Link className={styles.linkItem} href={user.name ? '/lk/details' : "/security/login"}>
        <img src={loginIcon} alt="address icon" />
        {user.name ? <span> Профиль </span> : <span> Войти </span>}
      </Link>
      <Link className={styles.linkItem} href={"/basket"}>
        <div className={styles.orderCouter}>
          <span>{shopingCount}</span>
        </div>
        <img src={orderIcon} alt="address icon" />
        <span>Корзина </span>
      </Link>
    </div>
  );
};

export { HeaderStoreNavbar };
