import Link from 'next/link';

import styles from './BasketNoContent.module.scss';

const BasketNoContent = () => {
  return (
    <section className={styles.empty__basket}>
    <div className={styles.empty__basket_container}>

    <h1 className={styles.title}>В корзине пока пусто</h1>
    <p className={styles.text}>Загляните на главную, чтобы выбрать товары или найдите нужное в поиске</p>
    <Link href={'/'}>
    <button className={styles.btn}>Перейти на главную</button>
    </Link>
    </div>

  </section>
  );
};

export { BasketNoContent };