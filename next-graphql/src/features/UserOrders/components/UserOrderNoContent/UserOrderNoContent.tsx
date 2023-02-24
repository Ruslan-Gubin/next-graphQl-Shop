import Link from 'next/link';

import styles from './UserOrderNoContent.module.scss';

const UserOrderNoContent = () => {
  return (
    <section className={styles.root}>
     <h2>Здесь будут ваши доставки</h2>
     <p>Оформите заказ в корзине и возвращайтесь, чтобы узнать, где товары сейчас</p>
   <Link href={'/basket'}>
    <button className={styles.btn}>Перейти в корзину</button>
   </Link>
    </section>
  );
};

export { UserOrderNoContent };