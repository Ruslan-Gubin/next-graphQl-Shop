import { IProductType } from '@/apps/types';
import { formatterRub } from '@/features/CatalogPage/libs/helper';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { StarsList } from '@/shared';
import { useInView } from "react-intersection-observer";
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './ProductCategoryMobile.module.scss';
import { useSelector } from 'react-redux';
import { selectBasket } from '@/features';


interface IProductCategoryMobile {
product: IProductType
onClickBuy: (value: IProductType) => void
}

const ProductCategoryMobileF: FC<IProductCategoryMobile> = ({product, onClickBuy}) => {
  const {basket} = useSelector(selectBasket)
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
  },[basket])
  
  return (
    <article ref={cardRef} className={styles.root}>
      <header>
        <figure className={styles.image__container}>
          <Link href={`/catalog/${product._id}`}>
          <img ref={ref}
           className={styles.img} src={isVisible ? product.photo.images[0].url : ''} 
            alt="Product imag" />
      </Link>
          <figcaption style={hoverCard ? { backgroundColor: 'white'}: {backgroundColor: ''}} className={styles.info__container}>
            <span className={styles.discount}>{product.discount}%</span>
            <div className={styles.price__container}>
              <p className={styles.price}>{formatterRub.format(product.price)}</p>
           <p className={styles.oldPrice}>{formatterRub.format(product.oldPrice)}</p>
            </div>
          <p className={hoverCard ? styles.product__name_active : styles.product__name}> <span className={styles.product__brand}>{product.brand.name}</span> / {product.name}</p>
      <StarsList count={5} />
      <p className={styles.delivery}>Доставка <span className={styles.delivery__span}>завтра</span></p>
  
  
    <>
    {!buttonActive ?
    <button onClick={() => onClickBuy(product)} className={styles.btn}>В корзину</button>
    :
    <button onClick={() => router.push(`/catalog/basket`)} className={styles.btn__active}>В корзине</button>
  }
    </>

          </figcaption>
        </figure>
      </header>
    </article>
  );
};

export const ProductCategoryMobile =  memo(ProductCategoryMobileF) ;