import Link from 'next/link';

import styles from './AdminOrderNoContent.module.scss';

const AdminOrderNoContent = () => {
  return (
    <section className={styles.root}> 
     <h2>Здесь будут ваши заказы</h2>
     <p>После того как пользователь оформит заказ он появляется на этой странице</p>
     <p>Пока заказов нет</p>
   <Link href={'/basket'}>
   </Link>
    </section>
  );
};

export { AdminOrderNoContent };