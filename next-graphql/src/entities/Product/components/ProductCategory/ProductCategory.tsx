import  { FC, memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useInView } from "react-intersection-observer";
import { IProductType } from '../../../../apps/types';
import { findMaxOpinion, Heart, QueckMessage, StarsList, useQuickMessage } from '../../../../shared';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { OPTIONS_DEPARTMENT } from '../../../../apps/constants';
import { getPropertyProduct } from '../../../../features/CatalogPage/libs/helper/getPropertyProduct';
import { basketAction, favoritesAction } from '../../../../features';

import styles from './ProductCategory.module.scss';


interface IProductCategory {
product: IProductType
activeFavorites: boolean
activeBasket: boolean
}

const ProductCategoryF: FC<IProductCategory> = ({ product, activeBasket, activeFavorites }) => {
  const { handleChangeState, status, text } = useQuickMessage()
  const [hoverCard, setHover] = useState(false)
  const [ref, isVisible] = useInView({ threshold: 0.5, triggerOnce: true });
  const cardRef = useRef<HTMLElement>(null)
  const dispatch = useDispatch()
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

  const handleClickBuy = (product: IProductType) => {
    dispatch(basketAction.addProduct({product: getPropertyProduct(product)}))
    handleChangeState('Товар добавлен в корзину')
  }

  const handleAddFavorite = (product: IProductType) => {
    dispatch(favoritesAction.addFavorites({ product: getPropertyProduct(product) }));
    handleChangeState('Товар добавлен в избранное')
  }

  const handleRemoveFavorite = (id: string) => {
    dispatch( favoritesAction.removeFavorites({ id: id }) );
    handleChangeState('Товар удален из избранного')
  }

  const nameHref = OPTIONS_DEPARTMENT.find(item => item.label === product.department)

  return (
    <article ref={cardRef} className={styles.root}>
      <QueckMessage active={status} message={text} />
      <header>
        <div className={styles.heart__container}>
        <Heart
        active={activeFavorites}
        handleAddFavorite={() => handleAddFavorite(product)} 
        removeFavorites={() => handleRemoveFavorite(product._id)}
        />
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
            <p>Быстрый просмотр</p>
           </div>
          : <span className={styles.discount}>{product.discount}%</span>
          }
            <div className={styles.price__container}>
              <p className={styles.price}>{formatterRub.format(product.price)}</p>
           <p className={styles.oldPrice}>{formatterRub.format(product.oldPrice)}</p>
            </div>
          <p className={hoverCard ? styles.product__name_active : styles.product__name}> <span className={styles.product__brand}>{product.brand.name}</span> / {product.name}</p>
          <StarsList count={findMaxOpinion(product.feedbacks)} />
      <p className={styles.delivery}>Доставка <span className={styles.delivery__span}>завтра</span></p>
  
    {hoverCard && 
    <>
    {!activeBasket ?
    <button onClick={() => handleClickBuy(product)} className={styles.btn}>В корзину</button>
    :
    <button onClick={() => router.push(`/basket`)} className={styles.btn__active}>В корзине</button>
  }
    </>
    }
          </figcaption>
        </figure>
      </header>
    </article>
  );
};

export const ProductCategory =  memo(ProductCategoryF);