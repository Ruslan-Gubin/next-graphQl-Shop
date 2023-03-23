import { memo, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_ORDERS_LENGTH } from '../../../../apps/apollo/orderRequest';
import { IUser } from '../../../../apps/types';

import styles from './UserDetailsOrders.module.scss';


const UserDetailsOrdersF = ({ user }: {user: IUser}) => {
  const {data: userOrders, loading: LoadingOrders} = useQuery(GET_ORDERS_LENGTH, {
    variables: {user_id: user._id ? user._id : ''}
  })
  const [ordersLength, setOrdersLength] = useState(null)

  useEffect(()=> {
    if (!LoadingOrders) {
      setOrdersLength(() => userOrders.getUserOrdersLength.length)
    }
  } ,[userOrders, LoadingOrders])

  const router = useRouter()


  return (
    <section onClick={() => router.push('/lk/myorders')} className={styles.card__favorites}>
    <h2 className={styles.card__remove_title}>Покупки</h2>
    <div className={styles.content__container}>
      {ordersLength && !LoadingOrders  ?
    <p className={styles.footer__text}>Покупок совершено: <span>{ordersLength}</span></p>
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

export const UserDetailsOrders = memo(UserDetailsOrdersF)