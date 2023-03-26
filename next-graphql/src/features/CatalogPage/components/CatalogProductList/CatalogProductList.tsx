import { FC, memo, useCallback,  useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProductType } from '../../../../apps/types';
import { ProductCategory } from '../../../../entities';
import { ProductCategoryMobile } from '../../../../entities/Product/components';
import { basketAction, favoritesAction, selectBasket, selectCatalogPage, selectFavorites } from '../../../../features';
import { getPropertyProduct } from '../../libs/helper/getPropertyProduct';
import { LoaderShop} from '../../../../shared';
import { selectSizeCatalogCard } from '../../../../widgets';
import { filterBrandAndPrice } from '../../libs/helper/filterBrandAndPrice';

import styles from './CatalogProductList.module.scss';


interface ICatalogProductList {
  isDesktop: boolean | undefined;
  products: IProductType[]
}

const CatalogProductListF: FC<ICatalogProductList> = ({ isDesktop, products }) => {
  const { basket } = useSelector(selectBasket)
  const { favorites } = useSelector(selectFavorites) 
  const { sizeCard } = useSelector(selectSizeCatalogCard)
  const { selected } = useSelector(selectCatalogPage);
  const dispatch = useDispatch();

  const handleClickBuy = useCallback((product: IProductType) => {
    dispatch( basketAction.addProduct({ product: getPropertyProduct(product) }) );
  }, [dispatch, ]);

const handleAddFavorite = useCallback((product: IProductType) => {
  dispatch( favoritesAction.addFavorites({ product: getPropertyProduct(product) }));
},[dispatch,  ]);

const handleRemoveFavorite = useCallback((id: string) => {
  dispatch(favoritesAction.removeFavorites({ id: id }));
}, [dispatch,  ]);


  const checkBasket = useMemo(() => (id: string) => {
    return basket.some(product => product.id === id)
  }, [basket])

  const checkFavorites = useMemo(() => (id: string) => {
  return  favorites.some(item => item.id === id)
  }, [favorites])

  if (!products ) {
    return <LoaderShop />
  }
  
  return (
    <section className={styles.root}>
      <ul className={styles.product__list_container}>
        {products && filterBrandAndPrice(products, selected).map(product => (
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
