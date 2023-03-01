import { FC, useState } from "react";
import Image from 'next/image';
import { IsortOrdersUser } from "../../../../apps/types";
import { IBasketProduct } from "../../../../features/Basket/libs/types/IBasketSlice";
import { formatterRub, formatterRuTime } from "../../../../features/CatalogPage/libs/helper";
import { formattedPhone } from "../../../../features/CatalogPage/libs/helper/formattedPhone";
import { AccordionBird } from "../../../../shared";
import { UserIconActive } from "../../../../shared/components";

import styles from './AdminOrderCard.module.scss';


interface IUserOrderCard {
  order: IsortOrdersUser 
  removeOrderAndProductCount: (value: IsortOrdersUser) => void
  handleUpdateStatus: (id:string, status: string) => void
}

const statusOptions: Record<string,{text: string,color: string}> = {
  new: {text:'Еще не просмотрен', color: '#919191'},
  processed: {text:'Обрабатывается', color: '#7c1eba'},
  completed: {text: 'Завершен', color: 'green'}
}

const AdminOrderCard: FC<IUserOrderCard> = ({handleUpdateStatus, order, removeOrderAndProductCount}) => {
  const [accordion, setAccordion] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<boolean>(false)

  const totalPrice = order.products.reduce((acc, item) => acc + (item.count * item.price) ,0)

  const statusProduct = statusOptions[`${order.status}`]

  const formatPhone = order.user.phone ? formattedPhone(order.user.phone) : ''

  return (
    <section className={styles.root}>
      <header className={styles.header}>
      <h2 className={styles.date}>Дата: {formatterRuTime.format(Number(order.createdAt))}</h2>
      <h2>Сумма: {formatterRub.format(totalPrice)}</h2>
      <h2 style={{color: `${statusProduct.color}`}} className={styles.product__status}>{statusProduct.text}</h2>
      <UserIconActive width={35} active={userInfo} handleActive={setUserInfo}/>     
      <AccordionBird active={accordion} handleActive={() => setAccordion(!accordion)} /> 
      </header>
    {accordion && 
      <ul className={styles.product__container}>
          <ul className={styles.product__header}>
            <li className={styles.product__img}>Фото</li>
            <li className={styles.product_name}>Наименование</li>
            <li className={styles.product__brand}>Бренд</li>
            <li className={styles.product__color}>Цвет</li>
            <li className={styles.product__count}>Количество</li>
            <li className={styles.product__price}>Цена</li>
            <li className={styles.product__processing}>Обработка</li>
          </ul>
        {order.products.map(product => (
          <li key={product.id} className={styles.product__item}>
            <figure className={styles.product__img}>
            <Image width={40} height={40} src={product.img} alt="product img" />
            </figure>
            <p className={styles.product_name}>{product.name}</p>
          <p className={styles.product__brand}>{product.brandName}</p>
          <p className={styles.product__color}>{product.color ? product.color : 'не указан'}</p>
          <p className={styles.product__count}>{product.count}</p>
          <p className={styles.product__price}>{product.price}</p>
          <div className={styles.product__processing_checkBox}>
            <input type="checkbox" onClick={() => console.log('check',product.id)}  />
            </div> 
          </li>
        ))}
        {order.status === 'new' &&
        <button onClick={() => handleUpdateStatus(order._id, 'processed')} className={styles.processed}>Обрабатывается</button>
      }
        {order.status === 'processed' &&
      <button onClick={() => handleUpdateStatus(order._id, 'completed')} className={styles.completed}>Завершен</button>
        } 
        {order.status === 'completed' &&
      <button onClick={() => removeOrderAndProductCount(order)} className={styles.remove}>Завершить заказ и обновить склад</button>
        }  
      </ul>
    }
    {userInfo && 
    <ul className={styles.user__info_container}>
      <li className={styles.user__info}>
        <p>{order.user.name}</p>
        <p>{formatPhone}</p>
      {order.user.email &&  <p>{order.user.email}</p>}
      </li>

      <li className={styles.user__address}>
        <p>Ул.{order.street}</p>
        <p>Дом:{order.flat}</p>
        {order.privateHome && <p>Частный дом</p>}
        {order.entrance && <p>Подьезд: {order.entrance}</p>}
        {order.intercom && <p>Домофон: {order.intercom}</p>}
        {order.floor && <p>Этаж: {order.floor}</p>}
      </li>

    </ul>
    }
      
    </section>
  );
};

export { AdminOrderCard };