import { FC } from "react";
import { AdminProductManagmentHeader } from "../AdminProductManagmentHeader";
import { AdminProductManagmentMain } from "../AdminProductManagmentMain";

import styles from "./AdminProductManagment.module.scss";


const AdminProductManagment: FC = () => {
  return (
    <div className={styles.root}>
      <AdminProductManagmentHeader />
      <AdminProductManagmentMain />
    </div>
  );
};

export { AdminProductManagment };
