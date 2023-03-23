import { FC, memo, useCallback } from 'react';
import {  useSelector } from 'react-redux';
import { selectCatalogPage } from '../../store';
import { IProductType } from '../../../../apps/types';
import { ProductCategory } from '../../../../entities';
import { ProductCategoryMobile } from '../../../../entities/Product/components';
import {  selectBasket, selectFavorites } from '../../../../features';
import { checkFavorite } from '../../../../entities/Product/lib/helpers/checkFavorite';

import styles from './CatalogProductList.module.scss';

interface ICatalogProductList {
  products: IProductType[];
  isDesktop: boolean | undefined;
}

const CatalogProductListF: FC<ICatalogProductList> = ({products, isDesktop}) => {
  const {basket} = useSelector(selectBasket)
  const { favorites } = useSelector(selectFavorites) 
  const {page, perPage, sizeCard} = useSelector(selectCatalogPage) 


  const filterPage = (arr: IProductType[]) => {
    const result = []
    const skips = (page ) * perPage;
    for (let i = (page - 1) * perPage; i < skips; i++) {
      if (arr[i]) {
        result.push(arr[i])
      }
    }
    return result
  }

  const checkFavorites = useCallback((product: IProductType) => {
  return  checkFavorite(favorites, product)
  }, [favorites])

  const checkBasket = useCallback((id: string) => {
    return basket.some(product => product.id === id)
  }, [basket])

  return (
    <section className={styles.root}>

      <ul className={styles.product__list_container}>
        {products && filterPage(products).map(product => (
          <li className={sizeCard === 'small' ? styles.product__item_small : styles.product__item_big} key={product._id}>
          {isDesktop ?
          <ProductCategory
          activeBasket={checkBasket(product._id)}
          activeFavorites={checkFavorites(product)}
          product={product}
          />
          : 
          <ProductCategoryMobile
          activeBasket={checkBasket(product._id)}
          activeFavorites={checkFavorites(product)}
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