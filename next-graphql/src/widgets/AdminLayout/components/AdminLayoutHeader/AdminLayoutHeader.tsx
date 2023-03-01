import { FC } from "react";
import { AdminNavHeader, AdminNotification } from "../../../../features";

import styles from "./AdminLayoutHeader.module.scss";



const AdminLayoutHeader: FC = () => {
  return (
    <header className={styles.root}>
      <AdminNavHeader />
      <AdminNotification />
    </header>
  );
};

export { AdminLayoutHeader };
