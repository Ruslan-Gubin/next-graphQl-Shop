import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCardBasket } from '../../../../entities';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { AccordionBird } from '../../../../shared';
import { useBasketContext } from '../../libs/context/BasketContext';
import { basketAction } from '../../store/basketSlice';
import { IBasketProduct } from '../../libs/types/IBasketSlice';
import { favoritesAction, selectFavorites } from '../../../UserFavorites';

import styles from './BasketList.module.scss';


const BasketList = () => {
  const [listActive, setListActive] = useState(true)
  const {basket} = useBasketContext()
  const { favorites } = useSelector(selectFavorites)
  const dispatch = useDispatch()

  const handleAddFavoritesRemoveBasket = useCallback((product: IBasketProduct) => {
    dispatch(basketAction.removeProduct({id: product.id}))

    const checkFavorites = favorites.some(item => item.id === product.id)
    
    if (!checkFavorites) {
      dispatch(favoritesAction.addFavorites({product}))
    }
  }, [basket, favorites])

  const totalCount =  basket.reduce((acc, item) => acc + item.price * item.count ,0)


  const handleIncrementProductn = useCallback((id: string) => {
    dispatch(basketAction.increment({id}))
  }, [])

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
        decrement={(value) => dispatch(basketAction.decrement({id: value}))}
        increment={(value) => handleIncrementProductn(value)}
        removeProduct={(value) => dispatch(basketAction.removeProduct({id: value}))}
        addFavorite={() => handleAddFavoritesRemoveBasket(product)}
         />
      </li>
        ))}
     </ul>
    }
    </section>
  );
};

export { BasketList };