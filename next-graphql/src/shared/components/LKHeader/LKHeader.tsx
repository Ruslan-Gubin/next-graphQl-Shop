import { useRouter } from 'next/router';

import styles from './LKHeader.module.scss';


const LKHeader = () => {
  const router = useRouter()
  
  const handleLink = (patch: string) => {
   router.push(`${patch}`)
  }

  return (
    <section className={styles.root}>
      <ul className={styles.link__container}>
        <li onClick={() => handleLink('/lk/details')} className={router.route === '/lk/details' ? `${styles.link__container_item} ${styles.active}` : styles.link__container_item}>Главная</li>  
        <li onClick={() => handleLink('/lk/favorites')} className={router.route === '/lk/favorites' ? `${styles.link__container_item} ${styles.active}`  : styles.link__container_item}>Избранное</li>
        <li onClick={() => handleLink('/lk/myorders')} className={router.route === '/lk/myorders' ? `${styles.link__container_item} ${styles.active}`  : styles.link__container_item}>Покупки</li>
      </ul>
    </section>
  );
};

export { LKHeader };