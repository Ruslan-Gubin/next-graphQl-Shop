import { FC, useState } from "react";
import Link from "next/link";


import styles from "./AdminNavHeader.module.scss";
import { ImageSearch } from "@/shared";

const AdminNavHeader: FC = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={styles.navHeader}>

    <div className={styles.burger}></div>
    <nav>
      <Link className={styles.navLink} href={'/admin'}>Home</Link>
      <Link className={styles.navLink} href={'/admin/contact'}>Contact</Link>
    </nav>
    <div className={styles.headerSearch}>
      <input placeholder="Search" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
<div className={styles.imageSearch}>
<ImageSearch active={true}/>
</div>
    </div>
    </div>
  );
};

export { AdminNavHeader };
