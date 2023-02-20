import { IProductType } from '@/apps/types';
import { ProductCategory } from '@/entities';
import { ProductCategoryMobile } from '@/entities/Product/components';
import { basketAction } from '@/features';
import { QueckMessage } from '@/shared';
import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  selectCatalogPage } from '../../store';

import styles from './CatalogProductList.module.scss';

interface ICatalogProductList {
  products: IProductType[]
  isDesktop: boolean | undefined
}

const CatalogProductList: FC<ICatalogProductList> = ({products, isDesktop}) => {
  const {page, perPage} = useSelector(selectCatalogPage)
  const { sizeCard } = useSelector(selectCatalogPage)
  const [modalMessage, setModalMessage] = useState(false)
  const dispatch = useDispatch()

  const handleClickBuy = useCallback((product: IProductType) => {
    dispatch(basketAction.addProduct({product: {
      img: product.photo.images[0].url,
      name: product.name,
      count: 1,
      color: product.colors_names,
      price: product.price,
      oldPrice: product.oldPrice,
      id: product._id,
      brandName: product.brand.name, 
    }}))
    setModalMessage(true)
     setTimeout(() => {
      setModalMessage(false)
    }, 3000)
  },[products])

 
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



  return (
    <section className={styles.root}>
      <QueckMessage active={modalMessage}/>
      <ul className={styles.product__list_container}>
        {products && filterPage(products).map(product => (
          <li className={sizeCard === 'small' ? styles.product__item_small : styles.product__item_big} key={product._id}>
            {isDesktop ?
          <ProductCategory
          onClickBuy={() => handleClickBuy(product)} 
          product={product}
          />
          : 
          <ProductCategoryMobile
          onClickBuy={() => handleClickBuy(product)} 
          product={product}
          />
        }
          </li>
        ))}
      </ul>
    </section>
  );
};

export { CatalogProductList };