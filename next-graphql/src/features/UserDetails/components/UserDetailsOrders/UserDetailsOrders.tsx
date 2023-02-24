import { useRouter } from 'next/router';

import styles from './UserDetailsOrders.module.scss';

interface IUserDetailsOrders {
  length: number;
}

const UserDetailsOrders = ({length}: IUserDetailsOrders) => {
  const router = useRouter()


  return (
    <section onClick={() => router.push('/lk/myorders')} className={styles.card__favorites}>
    <h2 className={styles.card__remove_title}>Покупки</h2>

    <div className={styles.content__container}>
      {length !== 0 ?
      <>
    
    <p className={styles.footer__text}>Покупок совершено: <span>{length}</span></p>
      </>
    :
    <>
    <p className={styles.nocontent__text}>В покупках пока пусто.</p>
    <p className={styles.nocontent__text}>Покупайте товары и они окажутся здесь</p>
    </>
  }
    </div>
   </section>
  );
};

export { UserDetailsOrders };