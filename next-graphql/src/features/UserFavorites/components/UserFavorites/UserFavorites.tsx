import { ProductCardFavorites } from '../../../../entities';
import { basketAction, selectBasket } from '../../../../features/Basket';
import { useDispatch, useSelector } from 'react-redux';
import { UserFavoritesNoContent } from '../UserFavoritesNoContent';

import styles from './UserFavorites.module.scss';


const UserFavorites = () => {
  const { favorites } = useSelector(selectBasket)
  const dispath = useDispatch()

  return (
    <div className={styles.root}>
      {favorites.length > 0 ? 
      <ul className={styles.product__container}>
        {favorites.map(product => (
          <li className={styles.product__item} key={product.id}>
        <ProductCardFavorites 
        addBasket={() => dispath(basketAction.addBasketAndRemoveFavorites({product}))}
        removeFavorites={() => dispath(basketAction.removeFavorites({id: product.id}))}
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