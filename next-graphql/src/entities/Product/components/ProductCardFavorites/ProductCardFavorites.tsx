import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IBasketProduct } from '../../../../features/Basket/libs/types/IBasketSlice';
import { formatterRub } from '../../../../features/CatalogPage/libs/helper';
import { CloseProductButton } from '../../../../shared';


import styles from './ProductCardFavorites.module.scss';

interface IProductCardFavorites {
  product: IBasketProduct
  removeFavorites: () => void
  addBasket: () => void
}

const ProductCardFavorites: FC<IProductCardFavorites> = ({product, removeFavorites, addBasket}) => {

const discount = Math.ceil(((product.price - product.oldPrice) / product.oldPrice) * 100);


  return (
    <article className={styles.root}>
      <div className={styles.close__btn}><CloseProductButton onClick={removeFavorites} /></div>
        <Link href={`/catalog/${product.id}`}>
          <figure className={styles.product__img}>
        <Image width={240} height={340} src={product.img} alt="Product imag" />
          </figure>
   
      <div className={styles.discount__container}>
        <small className={styles.discount__content}>{discount}%</small>
      </div>
      <dl className={styles.price__block}>
    <strong  className={styles.price__price}>{formatterRub.format(product.price)}</strong>
    <dd  className={styles.price__old_price}>{formatterRub.format(product.oldPrice)}</dd>
      </dl>
      <p className={styles.description}>{product.name}</p>
        </Link>

      <button onClick={addBasket} className={styles.footer__btn}>В корзину</button>
     
    </article>
  );
};

export { ProductCardFavorites };