import { FC } from "react";
import { AdminNavHeader, AdminNotification } from "@/features";

import styles from "./AdminLayoutHeader.module.scss";

const AdminLayoutHeader: FC = () => {
  return (
    <div className={styles.root}>
      <AdminNavHeader />
      <AdminNotification />
    </div>
  );
};

export { AdminLayoutHeader };
