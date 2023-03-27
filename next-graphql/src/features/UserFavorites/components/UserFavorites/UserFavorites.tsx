import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCardFavorites } from '../../../../entities';
import { basketAction } from '../../../../features/Basket';
import { UserFavoritesNoContent } from '../UserFavoritesNoContent';
import { favoritesAction, selectFavorites } from '../../store/favoritesSlice';
import { IBasketProduct } from '../../../Basket/libs/types/IBasketSlice';

import styles from './UserFavorites.module.scss';


const UserFavorites = () => {
  const { favorites } = useSelector(selectFavorites)
  const dispath = useDispatch()
  const router = useRouter()

  const handleAddBasketRemoveFavorites = useCallback((product: IBasketProduct) =>  {
    dispath(favoritesAction.removeFavorites({id: product.id}))
    dispath(basketAction.addProduct({product}))
  }, [dispath])

  const handleRemoveFavorites = useCallback((id: string) => {
    dispath(favoritesAction.removeFavorites({id}))
  }, [dispath])

  const handleRouterLink = useCallback((href: string) => {
    router.push(href)
  }, [router])

  return (
    <div className={styles.root}>
      {favorites.length > 0 ? 
      <ul className={styles.product__container}>
        {favorites.map(product => (
          <li className={styles.product__item} key={product.id}>
        <ProductCardFavorites 
        handleRouterLink={handleRouterLink}
        addBasket={handleAddBasketRemoveFavorites}
        removeFavorites={handleRemoveFavorites}
        product={product}
        />
        </li>
          ))}
      </ul>
      :
      <UserFavoritesNoContent />
    }
    </div>
  );
};

export { UserFavorites };