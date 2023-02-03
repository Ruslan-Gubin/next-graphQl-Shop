import { FC } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ImageSearch } from "@/shared";
import { adminNavHeaderAction, selectAdminNavHeader } from "../../lib/store";

import styles from "./AdminNavHeader.module.scss";


const AdminNavHeader: FC = () => {
  const { searchValue } = useSelector(selectAdminNavHeader);
  const dispatch = useDispatch();

  return (
    <div className={styles.navHeader}>
      <div
        onClick={() => dispatch(adminNavHeaderAction.toggleBurgerStatus())}
        className={styles.burgerContainer}
      >
        <div className={styles.burger}></div>
      </div>
      <nav>
        <Link className={styles.navLink} href={"/admin"}>
          Home
        </Link>
        <Link className={styles.navLink} href={"/admin/contact"}>
          Contact
        </Link>
      </nav>
      <div className={styles.headerSearch}>
        <input
          placeholder="Search"
          type="text"
          value={searchValue}
          onChange={(e) =>
            dispatch(
              adminNavHeaderAction.getValueInput({ value: e.target.value })
            )
          }
        />
        <div className={styles.imageSearch}>
          <ImageSearch active={true} />
        </div>
      </div>
    </div>
  );
};

export { AdminNavHeader };
