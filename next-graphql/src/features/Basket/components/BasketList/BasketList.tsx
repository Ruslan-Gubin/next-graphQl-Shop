import { ProductCardBasket } from '../../../../entities';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { AccordionBird } from '../../../../shared';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useBasketContext } from '../../libs/context/BasketContext';
import { basketAction } from '../../store/basketSlice';

import styles from './BasketList.module.scss';

const BasketList = () => {
  const [listActive, setListActive] = useState(true)
  const {basket, totalCount} = useBasketContext()
  const dispatch = useDispatch()


  return (
    <section className={styles.root}>
     <header className={styles.header}>
      <section className={styles.title__container}>
    <h2 className={styles.header__title}>Корзина <small>{basket.length}</small> </h2>
    <p style={!listActive ? {opacity: '1'} : {opacity: '0'}} className={styles.header__count}>{basket.length} товаров  <span>{formatterRub.format(totalCount)}</span>  </p>   
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
        decrement={(value) => dispatch(basketAction.decrement({id: value}))}
        increment={(value) => dispatch(basketAction.increment({id: value}))}
        removeProduct={(value) => dispatch(basketAction.removeProduct({id: value}))}
        addFavorite={() => dispatch(basketAction.addFavoritAndRemoveBasket({product}))}
         />
      </li>
        ))}
     </ul>
    }
    </section>
  );
};

export { BasketList };