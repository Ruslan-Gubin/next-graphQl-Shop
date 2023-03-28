import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { LoaderShop, QueckMessage } from '../../../../shared/components';
import { AdminOrderNoContent } from '../AdminOrderNoContent';
import {  IsortOrdersUser } from '../../../../apps/types';
import { AdminOrderCard } from '../AdminOrderCard';
import { GET_ALL_ORDERS, GET_NEW_ORDERS_LENGTH, REMOVE_ORDER_AND_UPDATE_PRODUCT, UPDATE_STATUS_ORDER } from '../../../../apps/apollo/orderRequest';
import { queckMessage } from '../../../../shared';

import styles from './AdminOrder.module.scss';


const AdminOrder = () => {
  const [updateOrder] = useMutation(UPDATE_STATUS_ORDER)
  const [removeOrderAndUpdateProduct] = useMutation(REMOVE_ORDER_AND_UPDATE_PRODUCT)
  const {refetch: newOrdersRefetch} = useQuery(GET_NEW_ORDERS_LENGTH)
  const {data: allOrders, loading: loadingOrders, refetch} = useQuery<{getAllOrders: IsortOrdersUser[]} | undefined>(GET_ALL_ORDERS) 
  const [quickModal, setQuickModal] = useState({state: false, message: ''})

    const removeOrderAndProductCount = async (order: IsortOrdersUser) => {
      const id = order._id
      const productList: {id: string, count: number}[] = []

      for (const key of order.products) {
        productList.push({id: key.id, count: key.count})
      }
      if (productList.length === 0) {
        queckMessage(setQuickModal, 'Не удалось получить данные товара')
      }

    await  removeOrderAndUpdateProduct({
      variables: {
        id,
        products: productList
      }
    }).then((data) => {
           refetch()
           newOrdersRefetch()
           queckMessage(setQuickModal,` Заказ: ${data.data.removeOrderAndUpdateProduct._id}  удален`)
         }).catch(error =>  {
           queckMessage(setQuickModal, error.message)
         })
    }

    const handleUpdateOrder = async (id: string, status: string) => {
      if (!id || !status) {
        queckMessage(setQuickModal, 'Не найдены данные заказа')
      }
    await  updateOrder({
        variables: { 
          id,
          status
        }
      }).then(() => {
        refetch()
        newOrdersRefetch()
        queckMessage(setQuickModal, 'Статус заказа изменен')
      }).catch(error =>  {
        queckMessage(setQuickModal, error.message)
      })
    }

    if (loadingOrders) {
      return <LoaderShop />
    }

  return (
    <section className={styles.root}>
      <QueckMessage active={quickModal.state} message={quickModal.message} />
      {allOrders && allOrders.getAllOrders.length > 0 ?
      <ul className={styles.order__container}>
        {allOrders.getAllOrders.map(order => (
          <li key={order._id}>
            <AdminOrderCard
            handleUpdateStatus={handleUpdateOrder}
            removeOrderAndProductCount={removeOrderAndProductCount}
            order={order}
            />
        </li>
          ))}
      </ul>
    
    :  
    <AdminOrderNoContent />
    }
    </section>
  );
};

export { AdminOrder };