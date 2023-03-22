import {  useSelector } from 'react-redux';
import Link from 'next/link';
import { BasketFooterCard, RemoveIcon } from '../../../../shared';
import { formattedPhone } from '../../../CatalogPage/libs/helper/formattedPhone';
import { selectUser } from '../../../LoginPage';
import { BasketFooterDelivery } from '../BasketFooterDelivery';

import styles from './BasketFooter.module.scss';


const BasketFooter = () => {
  const { user } = useSelector(selectUser)


  return (
    <section className={styles.root}>
      <BasketFooterDelivery />
     <div className={styles.last__cards_container}>
      <div className={styles.last__card}>
     <BasketFooterCard visionToggle={false} title='Способ оплаты'>
      <p className={styles.notification}>Оплата: курьеру</p>
      {/* <p className={styles.notification}><span>Войти или зарегистрироваться, </span>чтобы выбрать способ оплаты</p> */}
     </BasketFooterCard>
      </div>
      <div className={styles.last__card}>
     <BasketFooterCard visionToggle={false} title='Мои данные'>
        {user.name ?
        <div className={styles.user__data}>
          <p className={styles.user__name}><span>Имя: </span>{user.name}</p>
          <p className={styles.user__phone}><span>Телефон: </span>{formattedPhone(user.phone)}</p>
          <Link href={'/lk/details'}>
           <p className={styles.update__user}>Изменить</p>
          </Link>
        </div>
        :
      <p className={styles.notification}>
        <Link href={'/security/login'}>
        <span>Войти или зарегистрироваться, </span>
        </Link>
        чтобы оформить заказ</p>
      }
     </BasketFooterCard>
      </div>
     </div>
    </section>
  );
};

export { BasketFooter };