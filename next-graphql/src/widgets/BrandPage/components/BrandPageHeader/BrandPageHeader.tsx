import Link from "next/link";

import styles from "./BrandPageHeader.module.scss";

interface IBrandPageHeader {
  title: string;
  count: number;
}

const BrandPageHeader = ({ title, count }: IBrandPageHeader) => {
  return (
    <header className={styles.root}>
      <Link href={"/"}>
        <h2 className={styles.link__home}>Главная</h2>
      </Link>
      <div className={styles.title__container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.count}>
          {count} {count === 1 ? "товар" : "товара"}
        </p>
      </div>
    </header>
  );
};

export { BrandPageHeader };
