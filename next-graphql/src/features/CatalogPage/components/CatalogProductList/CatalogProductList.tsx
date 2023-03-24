import { FC, memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCatalogPage } from '../../store';
import { IProductType } from '../../../../apps/types';
import { ProductCategory } from '../../../../entities';
import { ProductCategoryMobile } from '../../../../entities/Product/components';
import { basketAction, favoritesAction, selectBasket, selectFavorites } from '../../../../features';
import { getPropertyProduct } from '../../libs/helper/getPropertyProduct';
import { QueckMessage, useQuickMessage } from '../../../../shared';

import styles from './CatalogProductList.module.scss';

interface ICatalogProductList {
  products: IProductType[];
  isDesktop: boolean | undefined;
}

const CatalogProductListF: FC<ICatalogProductList> = ({products, isDesktop}) => {
  const { basket } = useSelector(selectBasket)
  const { favorites } = useSelector(selectFavorites) 
  const { page, perPage, sizeCard } = useSelector(selectCatalogPage) 
  const { handleChangeState, status, text } = useQuickMessage()
  const dispatch = useDispatch();

  const filterPage = useCallback((arr: IProductType[]) => {
    const result = []
    const skips = (page ) * perPage;
    for (let i = (page - 1) * perPage; i < skips; i++) {
      if (arr[i]) {
        result.push(arr[i])
      }
    }
    return result
  }, [page, perPage])


  const handleClickBuy = useCallback((product: IProductType) => {
    dispatch( basketAction.addProduct({ product: getPropertyProduct(product) }) );
      handleChangeState('Товар добавлен в корзину')
  }, [dispatch, ]);

const handleAddFavorite = useCallback((product: IProductType) => {
  dispatch( favoritesAction.addFavorites({ product: getPropertyProduct(product) }));
  handleChangeState('Товар добавлен в избранное')
},[dispatch, ]);

const handleRemoveFavorite = useCallback((id: string) => {
  dispatch(favoritesAction.removeFavorites({ id: id }));
    handleChangeState('Товар удален из избранного')
}, [dispatch, ]);


  const checkBasket = useMemo(() => (id: string) => {
    return basket.some(product => product.id === id)
  }, [basket])

  const checkFavorites = useMemo(() => (id: string) => {
  return  favorites.some(item => item.id === id)
  }, [favorites])
  
  return (
    <section className={styles.root}>
      <ul className={styles.product__list_container}>
 <QueckMessage active={status} message={text} />
        {products && filterPage(products).map(product => (
          <li className={sizeCard === 'small' ? styles.product__item_small : styles.product__item_big} key={product._id}>
          {isDesktop ?
          <ProductCategory
          handleClickBuy={handleClickBuy}
          handleAddFavorite={handleAddFavorite}
          handleRemoveFavorite={handleRemoveFavorite}
          activeBasket={checkBasket(product._id)}
          activeFavorites={checkFavorites(product._id)}
          product={product}
          />
          :
          <ProductCategoryMobile
          handleClickBuy={handleClickBuy}
          handleAddFavorite={handleAddFavorite}
          handleRemoveFavorite={handleRemoveFavorite}

          activeBasket={checkBasket(product._id)}
          activeFavorites={checkFavorites(product._id)}
          product={product}
          />
        }
          </li>
        ))}
      </ul>
    </section>
  );
};

const CatalogProductList = memo(CatalogProductListF)

export { CatalogProductList } 