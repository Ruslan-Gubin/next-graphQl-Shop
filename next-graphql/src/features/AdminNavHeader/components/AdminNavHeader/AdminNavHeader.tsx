import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageSearch } from "../../../../shared";
import { adminNavHeaderAction, selectAdminNavHeader } from "../../lib/store";
import { useAdminLayoutContext } from "../../../../widgets/AdminLayout/lib/context/useAdminLayoutContext";

import styles from "./AdminNavHeader.module.scss";


const AdminNavHeader: FC = () => {
  const { handleRouterLink } = useAdminLayoutContext()
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
        <span className={styles.navLink} onClick={() => handleRouterLink("/admin")}>
          Home
        </span>
        <span className={styles.navLink} onClick={() => handleRouterLink("/admin/contact")}>
          Contact
        </span>
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
