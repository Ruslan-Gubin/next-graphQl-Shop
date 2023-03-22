import {  useEffect,  useState } from 'react';
import {  useSelector } from 'react-redux';

import { ProductCardBasket } from '../../../../entities';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { AccordionBird } from '../../../../shared';
import { useBasketContext } from '../../libs/context/BasketContext';
import {  selectBasket } from '../../store/basketSlice';

import styles from './BasketList.module.scss';


const BasketList = () => {
  const [listActive, setListActive] = useState(true)
  const {basket} = useSelector(selectBasket)
  const { setNoContentActive } = useBasketContext()


  useEffect(() => {
    if (basket.length === 0) {
      setNoContentActive(true)
    }
  }, [basket, setNoContentActive])

  const totalCount =  basket.reduce((acc, item) => acc + item.price * item.count ,0)

  return (
    <section className={styles.root}>
     <header className={styles.header}>
      <section className={styles.title__container}>
    <h2 className={styles.header__title}>Корзина <small>{basket.length}</small> </h2>
    <p style={!listActive ? {opacity: '1'} : {opacity: '0'}}
     className={styles.header__count}>{basket.length} товаров 
     <span>{formatterRub.format(totalCount)}
     </span>  </p>   
      </section>
      {basket.length > 1 &&
    <AccordionBird active={listActive} handleActive={setListActive} />
      }
     </header>
     {listActive && 
     <ul className={styles.product__list_wrapper}>
     {basket.map(product => (
       <li key={product.id} className={styles.product__list_item}>
        <ProductCardBasket 
        product={product}
         />
      </li>
        ))}
     </ul>
    }
    </section>
  );
};

export { BasketList };