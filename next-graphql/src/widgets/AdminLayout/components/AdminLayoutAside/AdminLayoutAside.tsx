import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { adminMenuAsideArr } from "../../lib/data/adminMenuAsideArr";
import { adminNavAction, selectAdminNavHeader } from "../../lib/store";
import styles from "./AdminLayoutAside.module.scss";

const AdminLayoutAside = () => {
  const { activeLink } = useSelector(selectAdminNavHeader);
  const dispatch = useDispatch();

  const handleClickLink = (label: string) => {
    dispatch(adminNavAction.setActivLink({ label }));
  };

  return (
    <aside className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerItem}>
          <div className={styles.logo}>
            <img
              src="https://res.cloudinary.com/ds289tkqj/image/upload/v1675092047/Hits/logo-48_n9frys.png"
              alt="logo image"
            />
          </div>
          <h2>OnlineShop</h2>
        </div>
        <div className={styles.headerItem}>
          <div className={styles.logo}>
            <img
              src="https://res.cloudinary.com/ds289tkqj/image/upload/v1672925061/Users/z08r5muy2ohcmqn8lfff.jpg"
              alt="admin photo"
            />
          </div>
          <h2>Ruslan Gubin</h2>
        </div>
      </header>

      <ul className={styles.navContainer}>
        {adminMenuAsideArr.map(link => (
          <Link href={link.patch} key={link.label}>
            <li 
            onClick={() => handleClickLink(link.label)}
            className={activeLink === link.label ? styles.active  : styles.navItem}
            >
              <img className={styles.navIcon} src={link.icon} alt="link icon" />
              <span className={styles.nameLink}>{link.value}</span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export { AdminLayoutAside };
