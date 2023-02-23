import Link from 'next/link';

import styles from './UserFavoritesNoContent.module.scss';

const UserFavoritesNoContent = () => {
  return (
    <section className={styles.root}>
     <h2>В избранном пока пусто</h2>
     <p>Сохраняйте товары, которые понравились, чтобы долго не искать</p>
   <Link href={'/'}>
    <button className={styles.btn}>Перейти на главную</button>
   </Link>
    </section>
  );
};

export { UserFavoritesNoContent };