import { GET_USER_ORDERS } from '@/apps/apollo';
import { selectUser } from '@/features/LoginPage';
import { Loader, QueckMessage } from '@/shared/components';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { UserOrderNoContent } from '../UserOrderNoContent';
import { IOrder } from '@/apps/types';
import { UserOrderCard } from '../UserOrderCard';
import { REMOVE__ORDER } from '@/apps/apollo/orderRequest';
import { useState } from 'react';
import { queckMessage } from '@/shared';
import styles from './UserOrders.module.scss';

const UserOrders = () => {
  const { user } = useSelector(selectUser);
  const [removeOrder] = useMutation(REMOVE__ORDER)
  const {data: userOrders, loading: loadingOrders, refetch} = useQuery<IOrder | undefined>(GET_USER_ORDERS, {
    variables: {user_id: user._id ? user._id : ''}
  }) 
  const [quickModal, setQuickModal] = useState({state: false, message: ''})

    const handleRemoveOrder = async (id: string) => {
    await  removeOrder({
        variables: { id }
      }).then(() => {
        refetch()
        queckMessage(setQuickModal, 'Заказ удален')
      }).catch(error =>  {
        queckMessage(setQuickModal, error.message)
      })
    }

    if (loadingOrders) {
      return <Loader />
    }

  return (
    <section className={styles.root}>
      <QueckMessage active={quickModal.state} message={quickModal.message} />
      {userOrders && userOrders.sortOrdersUser.length > 0 ?
      <ul className={styles.order__container}>
        {userOrders.sortOrdersUser.map(order => (
          <li key={order._id}>
            <UserOrderCard
            removeOrder={handleRemoveOrder}
            order={order}
            />
        </li>
          ))}
      </ul>
    
    :  
    <UserOrderNoContent />
    }
    </section>
  );
};

export { UserOrders };