import { FC, memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from "react-intersection-observer";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IProductType } from '../../../../apps/types';
import { findMaxOpinion, Heart, StarsList } from '../../../../shared';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { selectBasket } from '../../../../features';
import { checkFavorite } from '../../lib/helpers/checkFavorite';
import { OPTIONS_DEPARTMENT } from '../../../../apps/constants';

import styles from './ProductCategory.module.scss';

interface IProductCategory {
product: IProductType
onClickBuy: (value: IProductType) => void
addFavorites: () => void
removeFavorites: () => void
}

const ProductCategoryF: FC<IProductCategory> = ({ product, onClickBuy, addFavorites,removeFavorites }) => {
  const {basket, favorites} = useSelector(selectBasket)
  const [hoverCard, setHover] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)
  const [ref, isVisible] = useInView({ threshold: 0.5, triggerOnce: true });
  const cardRef = useRef<HTMLElement>(null)
  const router = useRouter()

  const hoverOn = () => setHover(true)
  const hoverOff = () => setHover(false)

  useEffect(() => {
    if (!cardRef.current) {
      return
    }
    const node = cardRef.current

    node.addEventListener('mouseenter', hoverOn)
    node.addEventListener('mouseleave', hoverOff)

    return () => {
      node.removeEventListener('mouseenter', hoverOn)
      node.removeEventListener('mouseleave', hoverOff)
    }
  },[])

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
          href={{
            pathname: `/catalog/${nameHref?.department_href}/${product.sub_department}/${product._id}`,
        }}
        prefetch={false}
        >
        <picture>
          <img
          ref={ref}
          className={styles.img}
          src={ isVisible ? product.photo.images[0].url : './loader.png'} 
          alt="Product imag" />
          </picture>
      </Link>
          <figcaption style={hoverCard ? { backgroundColor: 'white'}: {backgroundColor: ''}} className={styles.info__container}>
          {hoverCard ? 
           <div className={styles.viewing}>
            <p>?????????????? ????????????????</p>
           </div>
          : <span className={styles.discount}>{product.discount}%</span>
          }
            <div className={styles.price__container}>
              <p className={styles.price}>{formatterRub.format(product.price)}</p>
           <p className={styles.oldPrice}>{formatterRub.format(product.oldPrice)}</p>
            </div>
          <p className={hoverCard ? styles.product__name_active : styles.product__name}> <span className={styles.product__brand}>{product.brand.name}</span> / {product.name}</p>
          <StarsList count={findMaxOpinion(product.feedbacks)} />
      <p className={styles.delivery}>???????????????? <span className={styles.delivery__span}>????????????</span></p>
  
    {hoverCard && 
    <>
    {!buttonActive ?
    <button onClick={() => onClickBuy(product)} className={styles.btn}>?? ??????????????</button>
    :
    <button onClick={() => router.push(`/basket`)} className={styles.btn__active}>?? ??????????????</button>
  }
    </>
    }
          </figcaption>
        </figure>
      </header>
    </article>
  );
};

export const ProductCategory =  memo(ProductCategoryF) ;