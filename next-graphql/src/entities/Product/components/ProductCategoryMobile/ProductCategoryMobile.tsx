import { FC, memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
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
handleRouterProduct: (href: {name: string, label: string, id: string}) => void
}

const ProductCategoryMobileF: FC<IProductCategoryMobile> = ({handleRouterProduct, product, onClickBuy, addFavorites, removeFavorites }) => {
  const {basket, favorites} = useSelector(selectBasket)
  const [hoverCard, setHover] = useState(false)
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
  console.log(nameHref?.department_href)
  return (
    <article ref={cardRef} className={styles.root}>
      <header>
      <div className={styles.heart__container}>
        <Heart active={checkFavorite(favorites, product)} handleAddFavorite={addFavorites} removeFavorites={removeFavorites}/>
        </div>
        <figure className={styles.image__container}>
        {/* <Link 
          href={{
            pathname: '/catalog/[name]/[label]/[id]',
            query: {name: nameHref?.department_href, label: product.sub_department, id: product._id}
        }}> */}

          <Image
          onClick={() => handleRouterProduct({name: nameHref.department_href, label: product.sub_department, id: product._id})}
          width={500}
          height={500}
          ref={ref}
          className={styles.img}
          src={isVisible ? product.photo.images[0].url : 'https://res.cloudinary.com/ds289tkqj/image/upload/v1675357978/Hits/icons8-add-image-80_fxoexh.png'} 
            alt="Product imag" />
          {/* <img ref={ref}
           className={styles.img} src={isVisible ? product.photo.images[0].url : ''} 
            alt="Product imag" /> */}
      {/* </Link> */}
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