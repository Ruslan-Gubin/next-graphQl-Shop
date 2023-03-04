import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import {  selectCatalogPage } from '../../store';
import { IProductType } from '../../../../apps/types';
import { ProductCategory } from '../../../../entities';
import { ProductCategoryMobile } from '../../../../entities/Product/components';
import { basketAction } from '../../../../features';
import { QueckMessage } from '../../../../shared';
import styles from './CatalogProductList.module.scss';

interface ICatalogProductList {
  products: IProductType[];
  isDesktop: boolean | undefined;
}

const CatalogProductList: FC<ICatalogProductList> = ({products, isDesktop}) => {
  const {page, perPage} = useSelector(selectCatalogPage)
  const { sizeCard } = useSelector(selectCatalogPage)
  const [quickMessage, setQueckMessage] = useState({status: false, text: ''})
  const dispatch = useDispatch()
  const router = useRouter()
  

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
    setQueckMessage(() => ({status: true, text: 'Товар добавлен в корзину'}))
    setTimeout(() => {
      setQueckMessage(() => ({status: false, text: ''}))
    }, 3000);
  },[ dispatch])

  const handleAddFavorites = (product: IProductType) => {
    const productOptions = {
      img: product.photo.images[0].url,
      name: product.name,
      count: 1,
      color: product.colors_names,
      price: product.price,
      oldPrice: product.oldPrice,
      id: product._id,
      brandName: product.brand.name,
    }

    dispatch(
      basketAction.addFavorites({
        product: productOptions,
      })
    );
    setQueckMessage(() => ({status: true, text: 'Товар добавлен в избранное'}))
    setTimeout(() => {
      setQueckMessage(() => ({status: false, text: ''}))
    }, 3000);
  };

  const handleRemoveFavorites = (id: string) => {
    dispatch(
      basketAction.removeFavorites({ id: id })
    );
    setQueckMessage(() => ({status: true, text: 'Товар удален из избранного'}))
    setTimeout(() => {
      setQueckMessage(() => ({status: false, text: ''}))
    }, 3000);
  };

 
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

const handleRouterProduct = useCallback((href: {name: string, label: string, id: string}) => {
  console.log(href)
  // router.push({
  //   pathname: `/catalog/[name]/[label]/[id]`,
  //   query: {name: departmentHref, label: sub_department, id}
  // })
}, [ router])

  return (
    <section className={styles.root}>
      <QueckMessage active={quickMessage.status} message={quickMessage.text}/>
      <ul className={styles.product__list_container}>
        {products && filterPage(products).map(product => (
          <li className={sizeCard === 'small' ? styles.product__item_small : styles.product__item_big} key={product._id}>
            {isDesktop ?
          <ProductCategory
          addFavorites={() => handleAddFavorites(product)}
          removeFavorites={() => handleRemoveFavorites(product._id)}
          onClickBuy={() => handleClickBuy(product)} 
          product={product}
          handleRouterProduct={handleRouterProduct}
          />
          : 
          <ProductCategoryMobile
          addFavorites={() => handleAddFavorites(product)}
          removeFavorites={() => handleRemoveFavorites(product._id)}
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