import { ProductCardFavorites } from '../../../../entities';
import { basketAction, selectBasket } from '../../../../features/Basket';
import { useDispatch, useSelector } from 'react-redux';
import { UserFavoritesNoContent } from '../UserFavoritesNoContent';

import styles from './UserFavorites.module.scss';
import { favoritesAction, selectFavorites } from '../../store/favoritesSlice';
import { IBasketProduct } from '../../../Basket/libs/types/IBasketSlice';


const UserFavorites = () => {
  const { favorites } = useSelector(selectFavorites)
  const { basket } = useSelector(selectBasket)
  const dispath = useDispatch()

  const handleAddBasketRemoveFavorites = (product:IBasketProduct) =>  {
    dispath(favoritesAction.removeFavorites({id: product.id}))

    const checkBasketProduct = basket.some(item => item.id === product.id)

    if (!checkBasketProduct) {
      dispath(basketAction.addProduct({product}))
    }

  }

  return (
    <div className={styles.root}>
      {favorites.length > 0 ? 
      <ul className={styles.product__container}>
        {favorites.map(product => (
          <li className={styles.product__item} key={product.id}>
        <ProductCardFavorites 
        addBasket={() => handleAddBasketRemoveFavorites(product)}
        removeFavorites={() => dispath(favoritesAction.removeFavorites({id: product.id}))}
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