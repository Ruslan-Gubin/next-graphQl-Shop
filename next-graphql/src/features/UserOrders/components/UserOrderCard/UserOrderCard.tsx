import { IsortOrdersUser } from "@/apps/types";
import { formatterRub, formatterRuTime } from "@/features/CatalogPage/libs/helper";
import { AccordionBird } from "@/shared";
import { FC, useState } from "react";

import styles from './UserOrderCard.module.scss';

interface IUserOrderCard {
  order: IsortOrdersUser
  removeOrder: (value: string) => void
}

const statusOptions: Record<string,{text: string,color: string}> = {
  new: {text:'Еще не просмотрен', color: '#919191'},
  processed: {text:'Обрабатывается', color: '#7c1eba'},
  completed: {text: 'Завершен', color: 'green'}
}

const UserOrderCard: FC<IUserOrderCard> = ({order, removeOrder}) => {
  const [accordion, setAccordion] = useState<boolean>(false)

  const totalPrice = order.products.reduce((acc, item) => acc + (item.count * item.price) ,0)

  const statusProduct = statusOptions[`${order.status}`]

  return (
    <section className={styles.root}>
      <header className={styles.header}>
      <h2 className={styles.date}>Дата: {formatterRuTime.format(Number(order.createdAt))}</h2>
      <h2>Сумма: {formatterRub.format(totalPrice)}</h2>
      <h2 style={{color: `${statusProduct.color}`}} className={styles.product__status}>{statusProduct.text}</h2>
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
            <li className={styles.product__total_price}>Всего</li>
          </ul>
        {order.products.map(product => (
          <li key={product.id} className={styles.product__item}>
            <figure className={styles.product__img}>
            <img src={product.img} alt="product img" />
            </figure>
            <p className={styles.product_name}>{product.name}</p>
          <p className={styles.product__brand}>{product.brandName}</p>
          <p className={styles.product__color}>{product.color ? product.color : 'не указан'}</p>
          <p className={styles.product__count}>{product.count}</p>
          <p className={styles.product__price}>{product.price}</p>
          <p className={styles.product__total_price}>{product.price * product.count}</p> 
          </li>
        ))}
        {order.status === 'new' &&
        <button onClick={() => removeOrder(order._id)} className={styles.remove}>Удалить заказ</button>
        }
      </ul>
    }
      
    </section>
  );
};

export { UserOrderCard };