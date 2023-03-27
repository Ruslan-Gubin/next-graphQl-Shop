import { FC } from "react";
import { useSelector } from "react-redux";
import { adminImage, adminMenuAsideArr } from "../../lib/data/adminMenuAsideArr";
import { selectAdminNavHeader } from "../../../../features";
import { useAdminLayoutContext } from "../../lib/context/useAdminLayoutContext";

import styles from "./AdminLayoutAside.module.scss";


const AdminLayoutAside: FC = () => {
  const { handleRouterLink } = useAdminLayoutContext()
  const { burgerStatus } = useSelector(selectAdminNavHeader);
  const { pathname } = window.location;

  return (
    <>
      {!burgerStatus ? (
        <aside className={styles.root}>
          <header className={styles.header}>
            <div className={styles.headerItem}>
              <div className={styles.logo}>
                <picture>
                <img width={40} height={40} src={adminImage.logo} alt="logo image" />
                </picture>
              </div>
              <h2>OnlineShop</h2>
            </div>
            <div className={styles.headerItem}>
              <div className={styles.logo}>
                <picture>
                <img width={40} height={40} src={adminImage.photo} alt="admin photo" />
                </picture>
              </div>
              <h2>Ruslan Gubin</h2>
            </div>
          </header>

          <ul className={styles.navContainer}>
            {adminMenuAsideArr.map((link) => (
                <li
                key={link.label}
                onClick={() => handleRouterLink(link.patch)}
                className={ pathname === link.patch ? styles.active : styles.navItem }
                >
                  <picture>
                  <img
                    width={50}
                    height={50}
                    className={styles.navIcon}
                    src={link.icon}
                    alt="link icon"
                    />
                    </picture>
                  <span className={styles.nameLink}>{link.value}</span>
                </li>
            ))}
          </ul>
        </aside>
      ) : (
        <div className={styles.smallAside}>
          <ul className={styles.navContainer}>
            {adminMenuAsideArr.map((link) => (
                <li 
                key={link.label}
                onClick={() => handleRouterLink(link.patch)}
                className={styles.logo}>
                  <picture>
                  <img
                    className={styles.navIcon}
                    src={link.icon}
                    alt="link icon"
                  />
                  </picture>
                </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export { AdminLayoutAside };
