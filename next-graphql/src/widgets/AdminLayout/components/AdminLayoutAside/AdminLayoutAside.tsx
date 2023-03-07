import { FC } from "react";
import Link from "next/link";
import Image from 'next/image';
import { useSelector } from "react-redux";
import {
  adminImage,
  adminMenuAsideArr,
} from "../../lib/data/adminMenuAsideArr";
import { selectAdminNavHeader } from "../../../../features";
import styles from "./AdminLayoutAside.module.scss";

const AdminLayoutAside: FC = () => {
  const { burgerStatus } = useSelector(selectAdminNavHeader);
  const { pathname } = window.location;

  return (
    <>
      {!burgerStatus ? (
        <aside className={styles.root}>
          <header className={styles.header}>
            <div className={styles.headerItem}>
              <div className={styles.logo}>
                <Image width={40} height={40} src={adminImage.logo} alt="logo image" />
              </div>
              <h2>OnlineShop</h2>
            </div>
            <div className={styles.headerItem}>
              <div className={styles.logo}>
                <Image width={40} height={40} src={adminImage.photo} alt="admin photo" />
              </div>
              <h2>Ruslan Gubin</h2>
            </div>
          </header>

          <ul className={styles.navContainer}>
            {adminMenuAsideArr.map((link) => (
              <Link href={link.patch} key={link.label}>
                <li
                  className={
                    pathname === link.patch ? styles.active : styles.navItem
                  }
                >
                  <Image
                    width={50}
                    height={50}
                    className={styles.navIcon}
                    src={link.icon}
                    alt="link icon"
                  />
                  <span className={styles.nameLink}>{link.value}</span>
                </li>
              </Link>
            ))}
          </ul>
        </aside>
      ) : (
        <div className={styles.smallAside}>
          <ul className={styles.navContainer}>
            {adminMenuAsideArr.map((link) => (
              <Link href={link.patch} key={link.label}>
                <li className={styles.logo}>
                  <Image
                  height={50}
                    width={50}
                    className={styles.navIcon}
                    src={link.icon}
                    alt="link icon"
                  />
                  {/* <img
                    className={styles.navIcon}
                    src={link.icon}
                    alt="link icon"
                  /> */}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export { AdminLayoutAside };
