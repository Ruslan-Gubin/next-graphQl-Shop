import Link from 'next/link';
import styles from './LKHeader.module.scss';

const LKHeader = () => {
  const { pathname } = window.location


  return (
    <section className={styles.root}>
      <ul className={styles.link__container}>
        <Link href={'/lk/details'}>
        <li className={pathname === '/lk/details' ? `${styles.link__container_item} ${styles.active}` : styles.link__container_item}>Главная</li>
        </Link>
        <Link href={'/lk/favorites'}>
        <li className={pathname === '/lk/favorites' ? `${styles.link__container_item} ${styles.active}`  : styles.link__container_item}>Избранное</li>
        </Link>
        <Link href={'/lk/myorders'}>
        <li className={pathname === '/lk/myorders' ? `${styles.link__container_item} ${styles.active}`  : styles.link__container_item}>Покупки</li>
        </Link>
      </ul>
    </section>
  );
};

export { LKHeader };