import { FC, memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useInView } from "react-intersection-observer";
import { selectBasket } from '../../../../features';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { checkFavorite } from '../../lib/helpers/checkFavorite';
import { IProductType } from '../../../../apps/types';
import { findMaxOpinion, Heart, StarsList } from '../../../../shared';

import styles from './ProductCategoryMobile.module.scss';
import { OPTIONS_DEPARTMENT } from '../../../../apps/constants';

interface IProductCategoryMobile {
product: IProductType
onClickBuy: (value: IProductType) => void
addFavorites: () => void
removeFavorites: () => void
}

const ProductCategoryMobileF: FC<IProductCategoryMobile> = ({ product, onClickBuy, addFavorites, removeFavorites }) => {
  const {basket, favorites} = useSelector(selectBasket)
  const [hoverCard] = useState(false)
  const [ref, isVisible] = useInView({ threshold: 0.5, triggerOnce: true });
  const [buttonActive, setButtonActive] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const router = useRouter()



  useEffect(() => {
    basket.forEach(basketProduct => {
      if (basketProduct.id === product._id) {
        setButtonActive(true)
      }
    })
  },[basket, product._id])

  const nameHref = OPTIONS_DEPARTMENT.find(item => item.label === product.department)

  return (
    <article ref={cardRef} className={styles.root}>
      <header>
      <div className={styles.heart__container}>
        <Heart active={checkFavorite(favorites, product)} handleAddFavorite={addFavorites} removeFavorites={removeFavorites}/>
        </div>
        <figure className={styles.image__container}>
        <Link 
        href={`/catalog/${nameHref?.department_href}/${product.sub_department}/${product._id}`}
        //   href={{
        //     pathname: `/catalog/${nameHref?.department_href}/${product.sub_department}/${product._id}`,
        //     // pathname: `/catalog/[name]/[label]/${product._id}`,
        //     // query: {name: nameHref?.department_href, label: product.sub_department}
        // }}
        prefetch={false}
        >
          <picture>
          <img ref={ref}
           className={styles.img} src={isVisible ? product.photo.images[0].url : ''} 
          alt="Product imag" />
          </picture>
      </Link>
          <figcaption style={hoverCard ? { backgroundColor: 'white'}: {backgroundColor: ''}} className={styles.info__container}>
            <span className={styles.discount}>{product.discount}%</span>
            <div className={styles.price__container}>
              <p className={styles.price}>{formatterRub.format(product.price)}</p>
           <p className={styles.oldPrice}>{formatterRub.format(product.oldPrice)}</p>
            </div>
          <p className={hoverCard ? styles.product__name_active : styles.product__name}> <span className={styles.product__brand}>{product.brand.name}</span> / {product.name}</p>
      <StarsList count={findMaxOpinion(product.feedbacks)} />
      <p className={styles.delivery}>Доставка <span className={styles.delivery__span}>завтра</span></p>
  
  
    <>
    {!buttonActive ?
    <button onClick={() => onClickBuy(product)} className={styles.btn}>В корзину</button>
    :
    <button onClick={() => router.push(`/basket`)} className={styles.btn__active}>В корзине</button>
  }
    </>

          </figcaption>
        </figure>
      </header>
    </article>
  );
};

export const ProductCategoryMobile =  memo(ProductCategoryMobileF) ;